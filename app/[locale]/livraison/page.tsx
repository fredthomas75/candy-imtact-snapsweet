import Link from "next/link";
import { notFound } from "next/navigation";
import { Truck, MapPin, Clock, Shield, Mail, Phone } from "lucide-react";
import { FREE_DELIVERY_THRESHOLD, DELIVERY_FEE } from "@/lib/shipping";
import { formatPrice } from "@/lib/utils";
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
  return { title: `${dict.shipping.title} — SnapSweet`, description: dict.shipping.desc };
}

export default async function LivraisonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const icons = [
    <Clock key="c" className="h-6 w-6" />,
    <Truck key="t" className="h-6 w-6" />,
    <Shield key="s" className="h-6 w-6" />,
    <MapPin key="m" className="h-6 w-6" />,
  ];
  const colors = ["#ec4899", "#fb923c", "#a855f7", "#06b6d4"];

  const zonesWithPrice = dict.shipping.zones.map((z, i) => ({
    ...z,
    price:
      "price" in z && z.price
        ? z.price
        : i === 4
        ? formatPrice(DELIVERY_FEE + 4, locale)
        : i === 5
        ? formatPrice(DELIVERY_FEE + 8, locale)
        : formatPrice(DELIVERY_FEE, locale),
  }));

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
      <div className="max-w-3xl mb-14">
        <p className="text-xs uppercase tracking-wider text-pink font-semibold mb-3">
          {dict.shipping.eyebrow}
        </p>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight mb-5">
          {dict.shipping.title}
        </h1>
        <p className="text-lg text-ink/65 leading-relaxed">{dict.shipping.desc}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-20">
        {dict.shipping.features.map((f, i) => {
          const title =
            i === 1
              ? `${f.title} ${formatPrice(FREE_DELIVERY_THRESHOLD, locale)}`
              : f.title;
          const text =
            i === 1
              ? `${formatPrice(DELIVERY_FEE, locale)} ${f.text}`
              : f.text;
          return (
            <div
              key={i}
              className="rounded-3xl bg-white p-7 border border-ink/5 hover:shadow-xl transition-shadow"
            >
              <div
                className="h-12 w-12 grid place-items-center rounded-2xl text-white mb-4"
                style={{ background: colors[i] }}
              >
                {icons[i]}
              </div>
              <h2 className="font-display text-2xl font-semibold mb-2">{title}</h2>
              <p className="text-ink/65 leading-relaxed">{text}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl bg-white border border-ink/5 overflow-hidden mb-20">
        <div className="px-7 py-6 border-b border-ink/5 bg-cream-soft">
          <h2 className="font-display text-2xl font-semibold">
            {dict.shipping.zonesTitle}
          </h2>
        </div>
        <div className="divide-y divide-ink/5">
          {zonesWithPrice.map((z) => (
            <div
              key={z.name}
              className="px-7 py-5 grid grid-cols-3 gap-4 items-center"
            >
              <p className="font-medium">{z.name}</p>
              <p className="text-ink/65 text-sm">{z.time}</p>
              <p className="text-right font-semibold tabular-nums">{z.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-ink text-cream p-10 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight mb-3">
          {dict.shipping.contactTitle}
        </h2>
        <p className="text-cream/70 mb-8">{dict.shipping.contactDesc}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:bonjour@snapsweet.ca"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-cream text-ink px-6 py-3 text-sm font-semibold hover:bg-pink hover:text-cream transition-colors"
          >
            <Mail className="h-4 w-4" /> bonjour@snapsweet.ca
          </a>
          <a
            href="tel:+15145550199"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/20 px-6 py-3 text-sm font-semibold hover:bg-cream hover:text-ink transition-colors"
          >
            <Phone className="h-4 w-4" /> 514 555-0199
          </a>
        </div>
        <Link
          href={`/${locale}/menu`}
          className="inline-block mt-8 text-sm text-cream/70 hover:text-pink-light transition-colors"
        >
          {dict.shipping.backToShop}
        </Link>
      </div>
    </div>
  );
}
