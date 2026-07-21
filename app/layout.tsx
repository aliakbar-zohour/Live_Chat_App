import type { Metadata } from "next";
import { cookies } from "next/headers";
import { JetBrains_Mono, Manrope, Unbounded, Vazirmatn } from "next/font/google";
import {
  defaultLocale,
  getDirection,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/i18n/config";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Pulse — Live chat systems",
  description:
    "Three realtime chat systems: Direct, Rooms, and Groups. Built as a full-stack resume project with Drizzle and SSE.",
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
      className={`${unbounded.variable} ${manrope.variable} ${vazirmatn.variable} ${jetbrains.variable} h-full antialiased`}
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
