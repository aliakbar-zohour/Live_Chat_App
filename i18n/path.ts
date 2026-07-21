import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

export function localizedPath(locale: Locale, path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}

export function stripLocaleFromPathname(pathname: string) {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  if (maybeLocale && isLocale(maybeLocale)) {
    const rest = `/${segments.slice(2).join("/")}`;
    return {
      locale: maybeLocale as Locale,
      pathnameWithoutLocale: rest === "/" ? "/" : rest.replace(/\/$/, "") || "/",
    };
  }
  return {
    locale: null as Locale | null,
    pathnameWithoutLocale: pathname,
  };
}

export function resolveLocale(input?: string | null): Locale {
  if (input && isLocale(input)) return input;
  return defaultLocale;
}
