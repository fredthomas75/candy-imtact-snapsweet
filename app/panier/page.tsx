"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  useCart,
  deliveryFor,
  FREE_DELIVERY_THRESHOLD,
} from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { Pod } from "@/components/pod";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart((s) => s.subtotal());

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-5xl px-5 sm:px-8 py-20">
        <div className="h-8 w-40 bg-ink/5 rounded animate-pulse" />
      </div>
    );
  }

  const shipping = deliveryFor(subtotal);
  const total = subtotal + shipping;
  const toFreeShipping = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 sm:px-8 py-24 text-center">
        <div className="mx-auto mb-8 w-fit">
          <Pod
            emoji="🛍️"
            gradient="radial-gradient(circle at 30% 30%, #fde047 0%, #ec4899 50%, #7c3aed 100%)"
            size="xl"
            floating
          />
        </div>
        <h1 className="font-display text-5xl font-semibold tracking-tight mb-4">
          Ton panier est vide.
        </h1>
        <p className="text-lg text-ink/65 mb-10">
          Pas un seul pod, c'est presque illégal. On répare ça?
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 rounded-full bg-ink text-cream px-7 py-3.5 text-base font-semibold hover:bg-pink transition-colors"
        >
          <ShoppingBag className="h-4 w-4" /> Explorer la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
      <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight mb-3">
        Ton panier
      </h1>
      <p className="text-ink/60 mb-10">
        {lines.length} {lines.length > 1 ? "saveurs" : "saveur"} · livraison Québec 24-48h
      </p>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Lines */}
        <div className="lg:col-span-2 space-y-4">
          {lines.map((line) => (
            <div
              key={line.slug}
              className="flex gap-4 sm:gap-6 rounded-3xl bg-white border border-ink/5 p-5"
            >
              <Pod
                emoji={line.emoji}
                gradient={`radial-gradient(circle at 30% 30%, ${line.accentColor}, ${line.accentColor}40)`}
                size="md"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Link
                      href={`/produit/${line.slug}`}
                      className="font-display text-xl font-semibold leading-tight hover:text-pink transition-colors block truncate"
                    >
                      {line.name}
                    </Link>
                    <p className="text-xs text-ink/50 mt-1">{line.unit}</p>
                  </div>
                  <button
                    onClick={() => remove(line.slug)}
                    aria-label="Retirer du panier"
                    className="text-ink/40 hover:text-pink transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
                  <div className="inline-flex items-center rounded-full border border-ink/10">
                    <button
                      onClick={() => setQty(line.slug, line.quantity - 1)}
                      className="h-9 w-9 grid place-items-center text-ink/60 hover:text-ink"
                      aria-label="Diminuer"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold tabular-nums">
                      {line.quantity}
                    </span>
                    <button
                      onClick={() => setQty(line.slug, line.quantity + 1)}
                      className="h-9 w-9 grid place-items-center text-ink/60 hover:text-ink"
                      aria-label="Augmenter"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p
                    className="font-display text-xl font-semibold tabular-nums"
                    style={{ color: line.accentColor }}
                  >
                    {formatPrice(line.price * line.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="rounded-3xl bg-ink text-cream p-7 noise">
            <h2 className="font-display text-2xl font-semibold mb-6">Récapitulatif</h2>

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-cream/70">Sous-total</dt>
                <dd className="font-semibold tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-cream/70">Livraison</dt>
                <dd className="font-semibold tabular-nums">
                  {shipping === 0 ? (
                    <span className="text-lime">Gratuite</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </dd>
              </div>
              {toFreeShipping > 0 && (
                <p className="text-xs text-pink-light pt-2 border-t border-cream/10">
                  Encore {formatPrice(toFreeShipping)} pour la livraison gratuite.
                </p>
              )}
            </dl>

            <div className="border-t border-cream/15 mt-5 pt-5 flex justify-between items-baseline">
              <span className="font-display text-lg">Total</span>
              <span className="font-display text-3xl font-semibold tabular-nums">
                {formatPrice(total)}
              </span>
            </div>

            <Link
              href="/commande"
              className="mt-7 w-full inline-flex items-center justify-center gap-2 rounded-full bg-cream text-ink px-6 py-3.5 text-base font-semibold hover:bg-pink hover:text-cream transition-colors"
            >
              Passer à la caisse <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/menu"
              className="mt-3 w-full inline-flex items-center justify-center gap-2 text-sm text-cream/70 hover:text-pink-light transition-colors"
            >
              Continuer mes emplettes
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
