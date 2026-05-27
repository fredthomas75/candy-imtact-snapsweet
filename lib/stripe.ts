import Stripe from "stripe";

const secret = process.env.STRIPE_SECRET_KEY;

// Pin to the latest stable Stripe API version bundled with stripe-node v22.
// The SDK exports the current version as ApiVersion; using a string literal
// keeps things explicit and survives minor SDK bumps.
export const stripe: Stripe | null = secret
  ? new Stripe(secret, { apiVersion: "2026-04-22.dahlia" })
  : null;

export const isStripeEnabled = stripe !== null;

export function getSiteUrl(req?: Request): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (req) {
    try {
      const url = new URL(req.url);
      return `${url.protocol}//${url.host}`;
    } catch {
      // fall through
    }
  }
  return "http://localhost:3000";
}
