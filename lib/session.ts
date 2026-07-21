import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/i18n/config";
import { localizedPath } from "@/i18n/path";

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireSession() {
  const session = await getSession();
  if (!session) {
    const jar = await cookies();
    const raw = jar.get(LOCALE_COOKIE)?.value;
    const locale = raw && isLocale(raw) ? raw : defaultLocale;
    redirect(localizedPath(locale, "/login"));
  }
  return session;
}
