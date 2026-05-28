"use client";

import { useState } from "react";
import { Minus, Plus, Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";
import { useDict } from "@/lib/i18n/dictionary-provider";
import { formatPrice } from "@/lib/utils";

export default function AddToCart({ product }: { product: Product }) {
  const { locale, dict } = useDict();
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch">
      <div className="inline-flex items-center rounded-full border border-ink/10 bg-white">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="h-12 w-12 grid place-items-center text-ink/60 hover:text-ink"
          aria-label={dict.cart.decreaseAria}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-10 text-center font-semibold tabular-nums">{qty}</span>
        <button
          type="button"
          onClick={() => setQty((q) => Math.min(50, q + 1))}
          className="h-12 w-12 grid place-items-center text-ink/60 hover:text-ink"
          aria-label={dict.cart.increaseAria}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-base font-semibold text-cream shadow-lg shadow-pink/25 transition-all hover:shadow-xl hover:shadow-pink/40 hover:-translate-y-0.5"
        style={{
          background: added
            ? "linear-gradient(90deg, #84cc16, #10b981)"
            : product.gradient,
        }}
      >
        {added ? (
          <>
            <Check className="h-5 w-5" />
            {locale === "fr" ? "Ajouté au panier" : "Added to cart"}
          </>
        ) : (
          <>
            <ShoppingBag className="h-5 w-5" />
            {locale === "fr" ? "Ajouter" : "Add"} — {formatPrice(product.price * qty, locale)}
          </>
        )}
      </button>
    </div>
  );
}
