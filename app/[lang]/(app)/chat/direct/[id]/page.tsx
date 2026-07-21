import { notFound } from "next/navigation";
import {
  getConversationForUser,
  getMessages,
  listConversations,
} from "@/lib/chat";
import { requireSession } from "@/lib/session";
import { ChatThread } from "@/components/chat/chat-thread";
import { ConversationList } from "@/components/chat/conversation-list";
import { DirectCreatePanel } from "@/components/chat/create-panels";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function DirectThreadPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const session = await requireSession();
  const conversation = await getConversationForUser(id, session.user.id);

  if (!conversation || conversation.type !== "direct") {
    notFound();
  }

  const [messages, conversations] = await Promise.all([
    getMessages(id),
    listConversations(session.user.id, "direct"),
  ]);

  return (
    <div className="flex h-full min-h-0">
      <div className="hidden w-[var(--ds-chat-rail)] shrink-0 flex-col border-e border-line bg-ink-elevated md:flex">
        <DirectCreatePanel />
        <ConversationList
          system="direct"
          items={conversations}
          emptyLabel={dict.chat.directEmpty}
        />
      </div>
      <ChatThread
        conversationId={conversation.id}
        title={conversation.displayTitle}
        subtitle={
          conversation.peer
            ? `@${conversation.peer.handle} · ${dict.chat.privateChannel}`
            : dict.chat.privateChannel
        }
        systemLabel={dict.chat.direct}
        currentUserId={session.user.id}
        initialMessages={messages}
      />
    </div>
  );
}
