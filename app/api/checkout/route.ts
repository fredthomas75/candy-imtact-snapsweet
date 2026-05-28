import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { stripe, isStripeEnabled, getSiteUrl } from "@/lib/stripe";
import { productBySlug } from "@/lib/products";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, CURRENCY } from "@/lib/shipping";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

type IncomingLine = { slug: string; quantity: number };

type Body = {
  lines: IncomingLine[];
  customer?: { email?: string };
  locale?: string;
};

// Stripe-supported locale strings — kept as literals to avoid coupling to SDK
// internal namespaces, which change shape between Stripe SDK versions.
const stripeLocaleMap = {
  fr: "fr-CA",
  en: "en",
} as const satisfies Record<Locale, string>;

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!Array.isArray(body.lines) || body.lines.length === 0) {
    return NextResponse.json({ error: "Empty cart" }, { status: 400 });
  }

  const locale: Locale =
    body.locale && isLocale(body.locale) ? body.locale : defaultLocale;

  // Resolve prices server-side. Never trust the client.
  const resolved = body.lines
    .map((line) => {
      const product = productBySlug(line.slug);
      if (!product) return null;
      const quantity = Math.min(50, Math.max(1, Math.floor(line.quantity)));
      return { product, quantity };
    })
    .filter(
      (x): x is { product: NonNullable<ReturnType<typeof productBySlug>>; quantity: number } =>
        x !== null
    );

  if (resolved.length === 0) {
    return NextResponse.json({ error: "No valid product" }, { status: 400 });
  }

  const subtotal = resolved.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  if (!isStripeEnabled || !stripe) {
    return NextResponse.json({
      simulated: true,
      subtotal,
      deliveryFee,
      total,
    });
  }

  const siteUrl = getSiteUrl(req);

  type LineItem = {
    quantity: number;
    price_data: {
      currency: string;
      unit_amount: number;
      product_data: { name: string; description: string };
    };
  };
  const lineItems: LineItem[] = resolved.map(
    ({ product, quantity }) => ({
      quantity,
      price_data: {
        currency: CURRENCY.toLowerCase(),
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: `${product.emoji} ${product.name[locale]}`,
          description: `${product.unit[locale]} — ${product.calories}`,
        },
      },
    })
  );

  if (deliveryFee > 0) {
    const deliveryName = locale === "fr" ? "🚚 Livraison" : "🚚 Shipping";
    const deliveryDesc =
      locale === "fr"
        ? `Forfait livraison (gratuite dès ${FREE_DELIVERY_THRESHOLD} $)`
        : `Flat shipping (free over $${FREE_DELIVERY_THRESHOLD})`;
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: CURRENCY.toLowerCase(),
        unit_amount: Math.round(deliveryFee * 100),
        product_data: { name: deliveryName, description: deliveryDesc },
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
        locale,
      })
    )
    .digest("hex")
    .slice(0, 32);

  try {
    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        line_items: lineItems,
        locale: stripeLocaleMap[locale],
        currency: CURRENCY.toLowerCase(),
        customer_email: body.customer?.email,
        shipping_address_collection: { allowed_countries: ["CA", "US"] },
        success_url: `${siteUrl}/${locale}/commande/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/${locale}/panier`,
        metadata: {
          subtotal: subtotal.toFixed(2),
          deliveryFee: deliveryFee.toFixed(2),
          total: total.toFixed(2),
          locale,
          items: resolved
            .map(({ product, quantity }) => `${product.slug}x${quantity}`)
            .join(","),
        },
      },
      { idempotencyKey }
    );

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
