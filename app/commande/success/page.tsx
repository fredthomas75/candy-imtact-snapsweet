import Link from "next/link";
import { Pod } from "@/components/pod";
import ClearCartOnMount from "@/components/clear-cart-on-mount";
import { stripe, isStripeEnabled } from "@/lib/stripe";
import { formatPrice } from "@/lib/utils";
import { Check, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    session_id?: string;
    simulated?: string;
    email?: string;
    total?: string;
  }>;
}) {
  const params = await searchParams;

  let email = params.email ?? "";
  let total = params.total ? Number(params.total) : 0;
  let refnum = "SS-PREVIEW-2026";

  if (params.session_id && isStripeEnabled && stripe) {
    try {
      const session = await stripe.checkout.sessions.retrieve(params.session_id);
      email = session.customer_details?.email ?? session.customer_email ?? email;
      total = (session.amount_total ?? 0) / 100;
      refnum = `SS-${session.id.slice(-8).toUpperCase()}`;
    } catch {
      // fall back to URL params
    }
  } else if (params.simulated) {
    refnum = `SS-SIM-${Math.random().toString(36).slice(-6).toUpperCase()}`;
  }

  return (
    <>
      <ClearCartOnMount />
      <div className="mx-auto max-w-2xl px-5 sm:px-8 py-20 text-center">
        <div className="mx-auto mb-8 w-fit relative">
          <Pod
            emoji="🎉"
            gradient="radial-gradient(circle at 30% 30%, #fde047 0%, #ec4899 50%, #06b6d4 100%)"
            size="xl"
            floating
          />
          <span className="absolute -bottom-2 -right-2 grid place-items-center h-12 w-12 rounded-full bg-lime text-white shadow-lg">
            <Check className="h-6 w-6" strokeWidth={3} />
          </span>
        </div>

        <p className="text-xs uppercase tracking-wider text-lime font-semibold mb-3">
          Commande confirmée
        </p>
        <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight mb-5">
          Merci, ta commande est en route!
        </h1>
        <p className="text-lg text-ink/65 mb-10 leading-relaxed">
          On prépare tes pods avec soin. Tu recevras un courriel de confirmation à{" "}
          <strong className="text-ink">{email || "ton adresse"}</strong> avec le suivi de livraison.
        </p>

        <div className="rounded-3xl bg-white border border-ink/5 p-8 mb-10 text-left max-w-md mx-auto">
          <dl className="space-y-4">
            <div className="flex justify-between items-baseline">
              <dt className="text-xs uppercase tracking-wider text-ink/50 font-semibold">
                Référence
              </dt>
              <dd className="font-display text-xl font-semibold tabular-nums">
                {refnum}
              </dd>
            </div>
            {total > 0 && (
              <div className="flex justify-between items-baseline">
                <dt className="text-xs uppercase tracking-wider text-ink/50 font-semibold">
                  Total
                </dt>
                <dd className="font-display text-xl font-semibold tabular-nums">
                  {formatPrice(total)}
                </dd>
              </div>
            )}
            <div className="flex justify-between items-baseline">
              <dt className="text-xs uppercase tracking-wider text-ink/50 font-semibold">
                Délai
              </dt>
              <dd className="font-medium">24-48h ouvrables</dd>
            </div>
          </dl>
        </div>

        <Link
          href="/menu"
          className="inline-flex items-center gap-2 rounded-full bg-ink text-cream px-7 py-3.5 text-base font-semibold hover:bg-pink transition-colors"
        >
          Continuer mes emplettes <ArrowRight className="h-4 w-4" />
        </Link>

        {params.simulated && (
          <p className="mt-10 text-xs text-ink/40 italic max-w-md mx-auto">
            ℹ️ Commande simulée — aucune carte facturée. Configure{" "}
            <code className="text-ink/60">STRIPE_SECRET_KEY</code> pour activer le paiement réel.
          </p>
        )}
      </div>
    </>
  );
}
