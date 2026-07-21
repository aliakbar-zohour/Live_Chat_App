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

export default async function RoomThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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
      <div className="hidden w-[var(--ds-chat-rail)] shrink-0 flex-col border-r border-line bg-ink-elevated md:flex">
        <RoomCreatePanel />
        <ConversationList
          system="room"
          items={conversations}
          emptyLabel="Create a public room or join one from Discover."
        />
      </div>
      <ChatThread
        conversationId={conversation.id}
        title={conversation.displayTitle}
        subtitle={
          conversation.description ??
          `#${conversation.slug ?? "room"} · ${conversation.members.length} members`
        }
        systemLabel="Room"
        currentUserId={session.user.id}
        initialMessages={messages}
      />
    </div>
  );
}
