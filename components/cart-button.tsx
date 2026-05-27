"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

export default function CartButton() {
  const [mounted, setMounted] = useState(false);
  const count = useCart((s) => s.count());

  useEffect(() => setMounted(true), []);

  return (
    <Link
      href="/panier"
      aria-label="Voir le panier"
      className="relative inline-flex items-center gap-2 rounded-full bg-ink text-cream px-4 py-2 text-sm font-medium hover:bg-pink transition-colors"
    >
      <ShoppingBag className="h-4 w-4" />
      <span className="hidden sm:inline">Panier</span>
      {mounted && count > 0 && (
        <span className="inline-grid place-items-center min-w-5 h-5 px-1.5 rounded-full bg-yellow text-ink text-xs font-bold">
          {count}
        </span>
      )}
    </Link>
  );
}
