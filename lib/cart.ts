"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { productBySlug, type Product } from "./products";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, CURRENCY } from "./shipping";

export { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, CURRENCY };

// Stored cart line: only the slug + quantity.
// Display data (name, price, emoji, color) is resolved from products at render time
// so translations and pricing stay in sync without rehydrating storage.
export type CartLine = {
  slug: string;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
  add: (product: Product, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (product, qty = 1) =>
        set((state) => {
          const existing = state.lines.find((l) => l.slug === product.slug);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.slug === product.slug
                  ? { ...l, quantity: Math.min(50, l.quantity + qty) }
                  : l
              ),
            };
          }
          return {
            lines: [
              ...state.lines,
              {
                slug: product.slug,
                quantity: Math.min(50, Math.max(1, qty)),
              },
            ],
          };
        }),
      remove: (slug) =>
        set((state) => ({ lines: state.lines.filter((l) => l.slug !== slug) })),
      setQty: (slug, qty) =>
        set((state) => {
          if (qty <= 0) {
            return { lines: state.lines.filter((l) => l.slug !== slug) };
          }
          return {
            lines: state.lines.map((l) =>
              l.slug === slug
                ? { ...l, quantity: Math.min(50, Math.floor(qty)) }
                : l
            ),
          };
        }),
      clear: () => set({ lines: [] }),
      count: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal: () =>
        get().lines.reduce((sum, l) => {
          const product = productBySlug(l.slug);
          return sum + (product?.price ?? 0) * l.quantity;
        }, 0),
    }),
    { name: "snapsweet-cart", version: 2 }
  )
);

export function deliveryFor(subtotal: number) {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
}
