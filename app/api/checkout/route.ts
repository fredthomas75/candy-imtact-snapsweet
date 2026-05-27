import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { stripe, isStripeEnabled, getSiteUrl } from "@/lib/stripe";
import { productBySlug } from "@/lib/products";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, CURRENCY } from "@/lib/shipping";

type IncomingLine = { slug: string; quantity: number };

type Body = {
  lines: IncomingLine[];
  customer?: { email?: string };
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  if (!Array.isArray(body.lines) || body.lines.length === 0) {
    return NextResponse.json({ error: "Panier vide" }, { status: 400 });
  }

  // Resolve prices server-side. Never trust the client.
  const resolved = body.lines
    .map((line) => {
      const product = productBySlug(line.slug);
      if (!product) return null;
      const quantity = Math.min(50, Math.max(1, Math.floor(line.quantity)));
      return { product, quantity };
    })
    .filter((x): x is { product: NonNullable<ReturnType<typeof productBySlug>>; quantity: number } => x !== null);

  if (resolved.length === 0) {
    return NextResponse.json({ error: "Aucun produit valide" }, { status: 400 });
  }

  const subtotal = resolved.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  // No Stripe key — return simulated response.
  if (!isStripeEnabled || !stripe) {
    return NextResponse.json({
      simulated: true,
      subtotal,
      deliveryFee,
      total,
    });
  }

  const siteUrl = getSiteUrl(req);

  // Build line items with server-resolved prices.
  const lineItems: Array<{
    quantity: number;
    price_data: {
      currency: string;
      unit_amount: number;
      product_data: { name: string; description: string };
    };
  }> = resolved.map(({ product, quantity }) => ({
    quantity,
    price_data: {
      currency: CURRENCY.toLowerCase(),
      unit_amount: Math.round(product.price * 100),
      product_data: {
        name: `${product.emoji} ${product.name}`,
        description: `${product.unit} — ${product.calories}`,
      },
    },
  }));

  if (deliveryFee > 0) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: CURRENCY.toLowerCase(),
        unit_amount: Math.round(deliveryFee * 100),
        product_data: {
          name: "🚚 Livraison",
          description: `Forfait livraison (gratuite dès ${FREE_DELIVERY_THRESHOLD} $)`,
        },
      },
    });
  }

  const idempotencyKey = crypto
    .createHash("sha256")
    .update(
      JSON.stringify({
        lines: resolved.map((r) => ({ slug: r.product.slug, q: r.quantity })),
        deliveryFee,
        email: body.customer?.email ?? "",
      })
    )
    .digest("hex")
    .slice(0, 32);

  try {
    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        line_items: lineItems,
        locale: "fr-CA",
        currency: CURRENCY.toLowerCase(),
        customer_email: body.customer?.email,
        // payment_method_types omitted — Stripe auto-selects from the dashboard config
        // (cards, Apple Pay, Google Pay, etc.)
        shipping_address_collection: { allowed_countries: ["CA", "US"] },
        success_url: `${siteUrl}/commande/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/panier`,
        metadata: {
          subtotal: subtotal.toFixed(2),
          deliveryFee: deliveryFee.toFixed(2),
          total: total.toFixed(2),
          items: resolved
            .map(({ product, quantity }) => `${product.slug}x${quantity}`)
            .join(","),
        },
      },
      { idempotencyKey }
    );

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur Stripe";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
