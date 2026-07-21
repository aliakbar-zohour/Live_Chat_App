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
      className={cn(
        "inline-flex items-center gap-1 rounded-[var(--ds-radius-sm)] border border-line bg-ink-elevated/80 p-1",
        className,
      )}
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
              "min-w-10 rounded-[calc(var(--ds-radius-sm)-2px)] px-2.5 py-1.5 text-xs font-semibold transition-colors",
              active
                ? "bg-signal text-onsignal"
                : "text-mist hover:bg-ink-soft hover:text-bone",
            )}
          >
            {compact ? item.toUpperCase() : localeNames[item]}
          </button>
        );
      })}
    </div>
  );
}
