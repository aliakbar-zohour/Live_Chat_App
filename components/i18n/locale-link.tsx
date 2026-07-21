"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/locale-provider";
import { localizedPath } from "@/i18n/path";
import type { ComponentProps } from "react";

export function LocaleLink({
  href,
  ...props
}: ComponentProps<typeof Link> & { href: string }) {
  const { locale } = useLocale();
  const localized =
    href.startsWith("http") || href.startsWith("#")
      ? href
      : localizedPath(locale, href);

  return <Link href={localized} {...props} />;
}
