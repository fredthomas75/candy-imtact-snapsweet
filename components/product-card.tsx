import Link from "next/link";
import { Pod } from "./pod";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produit/${product.slug}`}
      className="group relative flex flex-col rounded-3xl bg-white p-6 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-1 border border-ink/5 overflow-hidden"
    >
      {(product.isNew || product.isVegan) && (
        <div className="absolute top-4 right-4 flex flex-col gap-1.5 items-end z-10">
          {product.isNew && (
            <span className="rounded-full bg-yellow text-ink text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
              Nouveau
            </span>
          )}
          {product.isVegan && (
            <span className="rounded-full bg-lime/20 text-lime-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
              Vegan
            </span>
          )}
        </div>
      )}

      <div className="grid place-items-center py-4 mb-2">
        <div className="transition-transform group-hover:scale-110 group-hover:rotate-6 duration-500">
          <Pod
            emoji={product.emoji}
            gradient={product.gradient}
            size="lg"
          />
        </div>
      </div>

      <p className="text-xs uppercase tracking-wider text-ink/50 font-medium mb-1">
        {product.tagline}
      </p>
      <h3 className="font-display text-2xl font-semibold tracking-tight mb-2">
        {product.name}
      </h3>
      <p className="text-sm text-ink/65 line-clamp-2 mb-4 flex-1">
        {product.description}
      </p>

      <div className="flex items-baseline justify-between pt-4 border-t border-ink/5">
        <div>
          <p className="font-display text-xl font-semibold" style={{ color: product.accentColor }}>
            {formatPrice(product.price)}
          </p>
          <p className="text-[11px] text-ink/40 mt-0.5">{product.unit}</p>
        </div>
        <span className="text-xs font-medium text-ink/40 group-hover:text-pink transition-colors">
          {product.calories}
        </span>
      </div>
    </Link>
  );
}
