import { notFound } from "next/navigation";
import {
  getConversationForUser,
  getMessages,
  listConversations,
} from "@/lib/chat";
import { requireSession } from "@/lib/session";
import { ChatThread } from "@/components/chat/chat-thread";
import { ConversationList } from "@/components/chat/conversation-list";
import { RoomCreatePanel } from "@/components/chat/create-panels";
import { ChatSidebar } from "@/components/chat/chat-shell";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function RoomThreadPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const session = await requireSession();
  const conversation = await getConversationForUser(id, session.user.id);

  if (!conversation || conversation.type !== "room") {
    notFound();
  }

  const [messages, conversations] = await Promise.all([
    getMessages(id),
    listConversations(session.user.id, "room"),
  ]);

  return (
    <div className="flex h-full min-h-0">
      <ChatSidebar className="hidden md:flex">
          <RoomCreatePanel />
          <ConversationList
            system="room"
            items={conversations}
            emptyLabel={dict.chat.roomsEmpty}
          />
        </ChatSidebar>
      <ChatThread
        conversationId={conversation.id}
        title={conversation.displayTitle}
        subtitle={
          conversation.description ??
          `${conversation.members.length} ${dict.chat.members}`
        }
        systemLabel={dict.chat.rooms}
        currentUserId={session.user.id}
        initialMessages={messages}
      />
    </div>
  );
}
