"use client";

import { useLocale } from "@/components/i18n/locale-provider";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { locale, switchLocale, transitioning, dictionary } = useLocale();

  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      role="group"
      aria-label={dictionary.nav.language}
    >
      {locales.map((item) => {
        const active = item === locale;
        return (
          <button
            key={item}
            type="button"
            disabled={transitioning}
            onClick={() => switchLocale(item as Locale)}
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-colors",
              active
                ? "bg-signal text-onsignal"
                : "text-mist hover:text-bone",
            )}
          >
            {compact ? item.toUpperCase() : localeNames[item]}
          </button>
        );
      })}
    </div>
  );
}
