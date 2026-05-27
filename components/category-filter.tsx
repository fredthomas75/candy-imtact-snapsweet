"use client";

import { useState, useMemo } from "react";
import ProductCard from "./product-card";
import { categoryLabels, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type Filter = Product["category"] | "tous" | "vegan";

export default function CategoryFilter({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>("tous");

  const filtered = useMemo(() => {
    if (filter === "tous") return products;
    if (filter === "vegan") return products.filter((p) => p.isVegan);
    return products.filter((p) => p.category === filter);
  }, [products, filter]);

  const filters: { id: Filter; label: string }[] = [
    { id: "tous", label: `Tous (${products.length})` },
    ...Object.entries(categoryLabels).map(([id, label]) => ({
      id: id as Filter,
      label,
    })),
    { id: "vegan", label: "🌱 Vegan" },
  ];

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-all border",
              filter === f.id
                ? "bg-ink text-cream border-ink"
                : "bg-white text-ink/70 border-ink/10 hover:border-pink hover:text-pink"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-ink/60 py-20">
          Aucun pod ne correspond. Essaie un autre filtre.
        </p>
      )}
    </>
  );
}
