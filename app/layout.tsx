import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  Instrument_Serif,
  Plus_Jakarta_Sans,
  Vazirmatn,
} from "next/font/google";
import {
  defaultLocale,
  getDirection,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/i18n/config";
import "./globals.css";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pulse",
  description: "Private messaging, rooms, and groups — live.",
};

async function getHtmlLocale(): Promise<Locale> {
  const jar = await cookies();
  const value = jar.get(LOCALE_COOKIE)?.value;
  return value && isLocale(value) ? value : defaultLocale;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getHtmlLocale();
  const dir = getDirection(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      data-locale={locale}
      className={`${instrument.variable} ${jakarta.variable} ${vazirmatn.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className={`min-h-full bg-ink text-bone ${locale === "fa" ? "is-fa" : "is-en"}`}
      >
        {children}
      </body>
    </html>
  );
}
