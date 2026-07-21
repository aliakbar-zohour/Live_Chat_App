import { listConversations } from "@/lib/chat";
import { requireSession } from "@/lib/session";
import { ConversationList } from "@/components/chat/conversation-list";
import { DirectCreatePanel } from "@/components/chat/create-panels";
import { ChatIdle, ChatSidebar } from "@/components/chat/chat-shell";
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
      <ChatSidebar>
        <DirectCreatePanel />
        <ConversationList
          system="direct"
          items={conversations}
          emptyLabel={dict.chat.directEmpty}
        />
      </ChatSidebar>
      <ChatIdle label={dict.chat.direct} title={dict.chat.directIdleTitle} />
    </div>
  );
}
