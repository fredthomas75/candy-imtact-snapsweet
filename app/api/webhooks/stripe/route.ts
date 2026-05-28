import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";

// Stripe envoie une signature HMAC dans l'en-tête `stripe-signature`. On vérifie
// avec STRIPE_WEBHOOK_SECRET. Sans secret OU sans Stripe SDK, on rejette 503.
//
// Pour tester en local :
//   stripe login
//   stripe listen --forward-to localhost:3000/api/webhooks/stripe
// Le CLI affiche un whsec_... — colle-le dans .env.local.

export const runtime = "nodejs";

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe non configuré (clé ou webhook secret manquant)" },
      { status: 503 }
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Signature manquante" },
      { status: 400 }
    );
  }

  // constructEventAsync exige le payload brut (string), pas un objet JSON.
  const payload = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      payload,
      signature,
      webhookSecret
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Signature invalide";
    console.error("[stripe-webhook] signature error:", message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  // Idempotence : Stripe retransmet en cas de timeout. Une vraie prod
  // stockerait event.id dans une table; ici on log juste.
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("[stripe-webhook] ✅ checkout.session.completed", {
        id: session.id,
        email: session.customer_details?.email,
        amount: (session.amount_total ?? 0) / 100,
        currency: session.currency,
        items: session.metadata?.items,
      });
      // TODO: enregistrer la commande, envoyer email confirmation, déclencher fulfillment.
      break;
    }

    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("[stripe-webhook] ✅ async payment succeeded", session.id);
      break;
    }

    case "checkout.session.async_payment_failed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.warn("[stripe-webhook] ❌ async payment failed", session.id);
      // TODO: notifier le client + libérer le stock.
      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("[stripe-webhook] ⏰ session expired", session.id);
      break;
    }

    case "payment_intent.payment_failed": {
      const pi = event.data.object as Stripe.PaymentIntent;
      console.warn("[stripe-webhook] ❌ payment_intent.payment_failed", {
        id: pi.id,
        message: pi.last_payment_error?.message,
      });
      break;
    }

    default:
      console.log("[stripe-webhook] · ignoré:", event.type);
  }

  return NextResponse.json({ received: true });
}
