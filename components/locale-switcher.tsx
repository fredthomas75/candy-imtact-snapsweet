"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  // Strip current locale segment.
  const segments = pathname.split("/").filter(Boolean);
  const rest = locales.includes(segments[0] as Locale)
    ? segments.slice(1)
    : segments;

  function hrefFor(target: Locale) {
    return "/" + [target, ...rest].join("/").replace(/\/$/, "") || `/${target}`;
  }

  function persist(target: Locale) {
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center rounded-full border border-ink/10 bg-white p-0.5 text-xs font-bold uppercase tracking-wider"
    >
      {locales.map((l) => {
        const isActive = l === locale;
        return (
          <Link
            key={l}
            href={hrefFor(l)}
            onClick={() => persist(l)}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "px-2.5 py-1 rounded-full transition-colors",
              isActive
                ? "bg-ink text-cream"
                : "text-ink/50 hover:text-ink"
            )}
          >
            {l}
          </Link>
        );
      })}
    </div>
  );
}
