"use client";

import {
  createContext,
  useContext,
  useMemo,
  useTransition,
  useCallback,
  useState,
  useEffect,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Dictionary } from "@/i18n/get-dictionary";
import {
  LOCALE_COOKIE,
  type Locale,
  getDirection,
  localeNames,
} from "@/i18n/config";
import { localizedPath, stripLocaleFromPathname } from "@/i18n/path";

type LocaleContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  dir: "ltr" | "rtl";
  isPending: boolean;
  transitioning: boolean;
  pendingLocale: Locale | null;
  switchLocale: (next: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [transitioning, setTransitioning] = useState(false);
  const [pendingLocale, setPendingLocale] = useState<Locale | null>(null);

  const dir = getDirection(locale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.documentElement.dataset.locale = locale;
    document.body.classList.toggle("is-fa", locale === "fa");
    document.body.classList.toggle("is-en", locale === "en");
    setTransitioning(false);
    setPendingLocale(null);
  }, [locale, dir]);

  const switchLocale = useCallback(
    (next: Locale) => {
      if (next === locale || transitioning) return;

      setPendingLocale(next);
      setTransitioning(true);
      document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000;samesite=lax`;

      const { pathnameWithoutLocale } = stripLocaleFromPathname(pathname);
      const target = localizedPath(next, pathnameWithoutLocale);

      window.setTimeout(() => {
        startTransition(() => {
          router.push(target);
          router.refresh();
        });
      }, 320);
    },
    [locale, pathname, router, transitioning],
  );

  const value = useMemo(
    () => ({
      locale,
      dictionary,
      dir,
      isPending,
      transitioning,
      pendingLocale,
      switchLocale,
    }),
    [
      locale,
      dictionary,
      dir,
      isPending,
      transitioning,
      pendingLocale,
      switchLocale,
    ],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

export function useDictionary() {
  return useLocale().dictionary;
}

export function usePendingLocaleLabel() {
  const { pendingLocale, locale } = useLocale();
  const target = pendingLocale ?? locale;
  return localeNames[target];
}
