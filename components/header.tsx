import Link from "next/link";
import CartButton from "./cart-button";
import LocaleSwitcher from "./locale-switcher";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-ink/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2 group">
          <span
            aria-hidden
            className="grid place-items-center h-9 w-9 rounded-full text-xl shadow-md transition-transform group-hover:scale-110 group-hover:rotate-12"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, #fde047 0%, #ec4899 50%, #7c3aed 100%)",
            }}
          >
            🍬
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight">
            SnapSweet
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href={`/${locale}/menu`} className="hover:text-pink transition-colors">
            {dict.nav.shop}
          </Link>
          <Link href={`/${locale}/notre-histoire`} className="hover:text-pink transition-colors">
            {dict.nav.story}
          </Link>
          <Link href={`/${locale}/livraison`} className="hover:text-pink transition-colors">
            {dict.nav.shipping}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} />
          <Link
            href={`/${locale}/menu`}
            className="md:hidden text-sm font-medium hover:text-pink"
          >
            {dict.nav.shop}
          </Link>
          <CartButton locale={locale} label={dict.nav.cart} />
        </div>
      </div>
    </header>
  );
}
