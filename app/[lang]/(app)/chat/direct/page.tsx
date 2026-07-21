import { listConversations } from "@/lib/chat";
import { requireSession } from "@/lib/session";
import { ConversationList } from "@/components/chat/conversation-list";
import { DirectCreatePanel } from "@/components/chat/create-panels";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { notFound } from "next/navigation";

export default async function DirectIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const session = await requireSession();
  const conversations = await listConversations(session.user.id, "direct");

  return (
    <div className="flex h-full min-h-0">
      <div className="flex w-full flex-col border-e border-line bg-ink-elevated md:w-[var(--ds-chat-rail)] md:shrink-0">
        <DirectCreatePanel />
        <ConversationList
          system="direct"
          items={conversations}
          emptyLabel={dict.chat.directEmpty}
        />
      </div>
      <div className="hidden min-w-0 flex-1 items-center justify-center md:flex">
        <div className="max-w-sm px-6 text-center">
          <p className="ds-kicker mb-3">{dict.chat.direct}</p>
          <h1 className="font-display text-3xl tracking-tight">
            {dict.chat.directIdleTitle}
          </h1>
        </div>
      </div>
    </div>
  );
}
