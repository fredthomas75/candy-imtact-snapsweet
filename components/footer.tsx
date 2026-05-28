import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="mt-24 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span
              aria-hidden
              className="grid place-items-center h-10 w-10 rounded-full text-2xl"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, #fde047 0%, #ec4899 50%, #7c3aed 100%)",
              }}
            >
              🍬
            </span>
            <span className="font-display text-2xl">SnapSweet</span>
          </div>
          <p className="text-cream/70 text-sm leading-relaxed">
            {dict.footer.tagline}
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg mb-4">{dict.footer.shop.title}</h3>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><Link href={`/${locale}/menu`} className="hover:text-pink-light">{dict.footer.shop.all}</Link></li>
            <li><Link href={`/${locale}/menu?cat=chocolat`} className="hover:text-pink-light">{dict.footer.shop.chocolate}</Link></li>
            <li><Link href={`/${locale}/menu?cat=gummies`} className="hover:text-pink-light">{dict.footer.shop.gummies}</Link></li>
            <li><Link href={`/${locale}/menu?cat=edition-limitee`} className="hover:text-pink-light">{dict.footer.shop.limited}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg mb-4">{dict.footer.house.title}</h3>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><Link href={`/${locale}/notre-histoire`} className="hover:text-pink-light">{dict.footer.house.story}</Link></li>
            <li><Link href={`/${locale}/livraison`} className="hover:text-pink-light">{dict.footer.house.shipping}</Link></li>
            <li><a href="mailto:bonjour@snapsweet.ca" className="hover:text-pink-light">{dict.footer.house.contact}</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg mb-4">{dict.footer.studio.title}</h3>
          <p className="text-sm text-cream/70 leading-relaxed">
            {dict.footer.studio.lines.map((line, i) => (
              <span key={i}>
                {line}
                {i < dict.footer.studio.lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/50">
          <p>{dict.footer.legal}</p>
          <p>{dict.footer.signature}</p>
        </div>
      </div>
    </footer>
  );
}
