import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import {
  defaultLocale,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/i18n/config";
import { localizedPath, stripLocaleFromPathname } from "@/i18n/path";

function pickLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale;

  const header = request.headers.get("accept-language") ?? "";
  if (header.toLowerCase().includes("fa")) return "fa";
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const { locale: pathLocale, pathnameWithoutLocale } =
    stripLocaleFromPathname(pathname);

  if (!pathLocale) {
    const locale = pickLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = localizedPath(locale, pathname);
    const response = NextResponse.redirect(url);
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const locale = pathLocale;
  const sessionCookie = getSessionCookie(request);
  const bare = pathnameWithoutLocale;
  const isAuthPage = bare === "/login" || bare === "/register";
  const isProtected = bare === "/chat" || bare.startsWith("/chat/");

  if (isProtected && !sessionCookie) {
    const url = request.nextUrl.clone();
    url.pathname = localizedPath(locale, "/login");
    return NextResponse.redirect(url);
  }

  if (isAuthPage && sessionCookie) {
    const url = request.nextUrl.clone();
    url.pathname = localizedPath(locale, "/chat");
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
