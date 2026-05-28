import Link from "next/link";
import { notFound } from "next/navigation";
import { Pod } from "@/components/pod";
import AddToCart from "@/components/add-to-cart";
import ProductCard from "@/components/product-card";
import {
  products,
  productBySlug,
  relatedProducts,
} from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, locales } from "@/lib/i18n/config";
import { ArrowLeft, Sparkles, Truck, MapPin, AlertCircle } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    products.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const product = productBySlug(slug);
  if (!product) return { title: "Pod" };
  return {
    title: `${product.name[locale]} — SnapSweet`,
    description: product.description[locale],
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const product = productBySlug(slug);
  if (!product) notFound();

  const related = relatedProducts(slug, 3);

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
      <Link
        href={`/${locale}/menu`}
        className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-pink transition-colors mb-10"
      >
        <ArrowLeft className="h-4 w-4" /> {dict.common.backToShop}
      </Link>

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
        <div className="lg:col-span-6">
          <div
            className="relative aspect-square rounded-[2.5rem] overflow-hidden grid place-items-center noise"
            style={{
              background: `linear-gradient(135deg, ${product.accentColor}20, ${product.accentColor}08)`,
            }}
          >
            <div
              aria-hidden
              className="absolute h-3/4 w-3/4 animate-morph blur-2xl opacity-40"
              style={{ background: product.gradient }}
            />
            <div className="relative animate-float">
              <Pod emoji={product.emoji} gradient={product.gradient} size="xl" />
            </div>
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              {product.isNew && (
                <span className="rounded-full bg-yellow text-ink text-[10px] font-bold uppercase tracking-wider px-3 py-1.5">
                  {dict.common.new}
                </span>
              )}
              {product.isVegan && (
                <span className="rounded-full bg-lime/80 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5">
                  {dict.common.vegan}
                </span>
              )}
            </div>
            <span className="absolute bottom-6 right-6 font-display text-xl font-semibold bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow-md">
              {product.calories}
            </span>
          </div>
        </div>

        <div className="lg:col-span-6">
          <p
            className="text-xs uppercase tracking-wider font-semibold mb-3"
            style={{ color: product.accentColor }}
          >
            {dict.category[product.category]} · {product.tagline[locale]}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight leading-[0.95] mb-6">
            {product.name[locale]}
          </h1>
          <p className="text-lg text-ink/70 leading-relaxed mb-8">
            {product.longDescription[locale]}
          </p>

          <div className="flex items-baseline gap-3 mb-8">
            <span
              className="font-display text-4xl font-semibold"
              style={{ color: product.accentColor }}
            >
              {formatPrice(product.price, locale)}
            </span>
            <span className="text-ink/50 text-sm">/ {product.unit[locale]}</span>
          </div>

          <AddToCart product={product} />

          <dl className="mt-12 grid grid-cols-2 gap-5">
            <div className="rounded-2xl bg-white border border-ink/5 p-5">
              <dt className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink/50 font-semibold mb-2">
                <MapPin className="h-3.5 w-3.5" /> {dict.product.provenance}
              </dt>
              <dd className="text-sm font-medium leading-snug">{product.origin[locale]}</dd>
            </div>
            <div className="rounded-2xl bg-white border border-ink/5 p-5">
              <dt className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink/50 font-semibold mb-2">
                <Sparkles className="h-3.5 w-3.5" /> {dict.product.format}
              </dt>
              <dd className="text-sm font-medium leading-snug">{product.unit[locale]}</dd>
            </div>
            <div className="rounded-2xl bg-white border border-ink/5 p-5">
              <dt className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink/50 font-semibold mb-2">
                <Truck className="h-3.5 w-3.5" /> {dict.product.delivery}
              </dt>
              <dd className="text-sm font-medium leading-snug">{dict.product.deliveryText}</dd>
            </div>
            <div className="rounded-2xl bg-white border border-ink/5 p-5">
              <dt className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink/50 font-semibold mb-2">
                <AlertCircle className="h-3.5 w-3.5" /> {dict.product.allergens}
              </dt>
              <dd className="text-sm font-medium leading-snug">
                {product.allergens.length > 0
                  ? product.allergens.map((a) => dict.allergen[a]).join(", ")
                  : dict.product.noAllergens}
              </dd>
            </div>
          </dl>

          <div className="mt-10">
            <p className="text-xs uppercase tracking-wider text-ink/50 font-semibold mb-3">
              {dict.product.onItWith}
            </p>
            <ul className="flex flex-wrap gap-2">
              {product.pairs[locale].map((p) => (
                <li
                  key={p}
                  className="rounded-full bg-white border border-ink/10 px-4 py-2 text-sm text-ink/75"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-8">
            {dict.common.youllAlsoLove}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} dict={dict} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
