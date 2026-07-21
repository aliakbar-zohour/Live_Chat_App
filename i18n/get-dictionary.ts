import "server-only";
import type { Locale } from "@/i18n/config";
import type en from "@/i18n/dictionaries/en.json";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/i18n/dictionaries/en.json").then((m) => m.default),
  fa: () => import("@/i18n/dictionaries/fa.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
