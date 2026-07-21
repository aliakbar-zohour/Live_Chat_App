import { redirect } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { localizedPath } from "@/i18n/path";

export default async function ChatIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) redirect("/en/chat/direct");
  redirect(localizedPath(lang, "/chat/direct"));
}
