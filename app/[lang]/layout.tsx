import { notFound } from "next/navigation";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { PageTransition } from "@/components/i18n/page-transition";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dictionary = await getDictionary(lang);

  return (
    <LocaleProvider locale={lang} dictionary={dictionary}>
      <PageTransition>{children}</PageTransition>
    </LocaleProvider>
  );
}
