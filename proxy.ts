import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

function negotiateLocale(req: NextRequest): Locale {
  const cookie = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const acceptLanguage = req.headers.get("accept-language") ?? "";
  // crude but reliable: first occurrence of any supported locale wins
  for (const segment of acceptLanguage.toLowerCase().split(",")) {
    const lang = segment.split(";")[0].trim().slice(0, 2);
    if (isLocale(lang)) return lang;
  }
  return defaultLocale;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Already starts with a locale: pass through.
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const locale = negotiateLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes, and any file-like path (contains a dot).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
