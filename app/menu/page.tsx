import CategoryFilter from "@/components/category-filter";
import { products } from "@/lib/products";

export const metadata = {
  title: "Boutique — SnapSweet",
  description: "Tous les pods SnapSweet : chocolat, gummies, caramel, fruité, éditions limitées.",
};

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
      <div className="max-w-3xl mb-12">
        <p className="text-xs uppercase tracking-wider text-pink font-semibold mb-3">
          Notre boutique
        </p>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight mb-5">
          Choisis ton pod.
        </h1>
        <p className="text-lg text-ink/65 leading-relaxed">
          Chaque pod est scellé individuellement. 40 à 60 calories par portion. Livraison Québec en 24 à 48 heures, partout au Canada en 3 à 5 jours.
        </p>
      </div>

      <CategoryFilter products={products} />
    </div>
  );
}
