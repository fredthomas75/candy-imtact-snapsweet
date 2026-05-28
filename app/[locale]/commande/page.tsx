"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useCart, deliveryFor } from "@/lib/cart";
import { productBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { Pod } from "@/components/pod";
import { useDict } from "@/lib/i18n/dictionary-provider";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";

type FormState = {
  email: string;
  prenom: string;
  nom: string;
  adresse: string;
  ville: string;
  province: string;
  codePostal: string;
  pays: string;
};

const initialForm: FormState = {
  email: "",
  prenom: "",
  nom: "",
  adresse: "",
  ville: "",
  province: "QC",
  codePostal: "",
  pays: "Canada",
};

export default function CommandePage() {
  const { locale, dict } = useDict();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);

  const lines = useCart((s) => s.lines);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted && lines.length === 0) {
      router.replace(`/${locale}/panier`);
    }
  }, [mounted, lines.length, router, locale]);

  if (!mounted || lines.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-5 sm:px-8 py-20">
        <div className="h-8 w-40 bg-ink/5 rounded animate-pulse" />
      </div>
    );
  }

  const shipping = deliveryFor(subtotal);
  const total = subtotal + shipping;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lines: lines.map((l) => ({ slug: l.slug, quantity: l.quantity })),
            customer: form,
            locale,
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || dict.checkout.error);
        }

        const data = await res.json();

        if (data.simulated) {
          const params = new URLSearchParams({
            simulated: "1",
            email: form.email,
            total: String(data.total),
          });
          clear();
          router.push(`/${locale}/commande/success?${params.toString()}`);
          return;
        }

        if (data.url) {
          window.location.href = data.url;
          return;
        }

        throw new Error("Invalid Stripe response");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
      <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight mb-3">
        {dict.checkout.title}
      </h1>
      <p className="text-ink/60 mb-10">{dict.checkout.sub}</p>

      <form onSubmit={submit} className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="font-display text-2xl font-semibold mb-5">
              {dict.checkout.sectionContact}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={dict.checkout.fields.email} type="email" required value={form.email} onChange={(v) => update("email", v)} full />
              <Field label={dict.checkout.fields.firstName} required value={form.prenom} onChange={(v) => update("prenom", v)} />
              <Field label={dict.checkout.fields.lastName} required value={form.nom} onChange={(v) => update("nom", v)} />
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-5">
              {dict.checkout.sectionShipping}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={dict.checkout.fields.address} required value={form.adresse} onChange={(v) => update("adresse", v)} full />
              <Field label={dict.checkout.fields.city} required value={form.ville} onChange={(v) => update("ville", v)} />
              <Field label={dict.checkout.fields.province} required value={form.province} onChange={(v) => update("province", v)} />
              <Field label={dict.checkout.fields.postal} required value={form.codePostal} onChange={(v) => update("codePostal", v)} />
              <Field label={dict.checkout.fields.country} required value={form.pays} onChange={(v) => update("pays", v)} />
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-5">
              {dict.checkout.sectionPayment}
            </h2>
            <div className="rounded-2xl border border-ink/10 bg-white p-6 text-sm text-ink/70 leading-relaxed">
              <p className="flex items-center gap-2 font-medium text-ink mb-3">
                <ShieldCheck className="h-4 w-4 text-lime" />
                {dict.checkout.paymentHero}
              </p>
              <p>{dict.checkout.paymentDesc}</p>
            </div>
          </section>

          {error && (
            <div className="rounded-2xl bg-pink/10 border border-pink/30 text-pink p-4 text-sm">
              {error}
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 self-start">
          <div className="rounded-3xl bg-ink text-cream p-6 noise">
            <h2 className="font-display text-xl font-semibold mb-5">
              {dict.checkout.orderSummary}
            </h2>

            <ul className="space-y-3 mb-5 max-h-64 overflow-y-auto pr-2">
              {lines.map((line) => {
                const product = productBySlug(line.slug);
                if (!product) return null;
                return (
                  <li key={line.slug} className="flex items-center gap-3 text-sm">
                    <Pod
                      emoji={product.emoji}
                      gradient={`radial-gradient(circle at 30% 30%, ${product.accentColor}, ${product.accentColor}40)`}
                      size="xs"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name[locale]}</p>
                      <p className="text-cream/60 text-xs">x{line.quantity}</p>
                    </div>
                    <span className="tabular-nums text-cream/80">
                      {formatPrice(product.price * line.quantity, locale)}
                    </span>
                  </li>
                );
              })}
            </ul>

            <dl className="space-y-2 text-sm pt-4 border-t border-cream/10">
              <div className="flex justify-between">
                <dt className="text-cream/70">{dict.cart.subtotal}</dt>
                <dd className="tabular-nums">{formatPrice(subtotal, locale)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-cream/70">{dict.cart.delivery}</dt>
                <dd className="tabular-nums">
                  {shipping === 0 ? (
                    <span className="text-lime">{dict.cart.free}</span>
                  ) : (
                    formatPrice(shipping, locale)
                  )}
                </dd>
              </div>
            </dl>

            <div className="border-t border-cream/15 mt-4 pt-4 flex justify-between items-baseline">
              <span className="font-display text-lg">{dict.cart.total}</span>
              <span className="font-display text-3xl font-semibold tabular-nums">
                {formatPrice(total, locale)}
              </span>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-cream text-ink px-6 py-3.5 text-base font-semibold hover:bg-pink hover:text-cream transition-colors disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> {dict.checkout.redirecting}
                </>
              ) : (
                <>
                  {dict.checkout.payCta} {formatPrice(total, locale)} <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <Link
              href={`/${locale}/panier`}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 text-sm text-cream/70 hover:text-pink-light transition-colors"
            >
              {dict.checkout.modifyCart}
            </Link>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  type = "text",
  required,
  value,
  onChange,
  full,
}: {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  full?: boolean;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="block text-xs uppercase tracking-wider text-ink/50 font-semibold mb-1.5">
        {label}
        {required && <span className="text-pink ml-1">*</span>}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm focus:outline-none focus:border-pink focus:ring-2 focus:ring-pink/20"
      />
    </label>
  );
}
