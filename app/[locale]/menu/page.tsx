import { notFound } from "next/navigation";
import CategoryFilter from "@/components/category-filter";
import { products } from "@/lib/products";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: `${dict.menu.title} — SnapSweet`,
    description: dict.menu.desc,
  };
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
      <div className="max-w-3xl mb-12">
        <p className="text-xs uppercase tracking-wider text-pink font-semibold mb-3">
          {dict.menu.eyebrow}
        </p>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight mb-5">
          {dict.menu.title}
        </h1>
        <p className="text-lg text-ink/65 leading-relaxed">{dict.menu.desc}</p>
      </div>

      <CategoryFilter products={products} />
    </div>
  );
}
