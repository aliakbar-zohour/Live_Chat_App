import { notFound } from "next/navigation";
import {
  getConversationForUser,
  getMessages,
  listConversations,
} from "@/lib/chat";
import { requireSession } from "@/lib/session";
import { ChatThread } from "@/components/chat/chat-thread";
import { ConversationList } from "@/components/chat/conversation-list";
import { GroupCreatePanel } from "@/components/chat/create-panels";

export default async function GroupThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await requireSession();
  const conversation = await getConversationForUser(id, session.user.id);

  if (!conversation || conversation.type !== "group") {
    notFound();
  }

  const [messages, conversations] = await Promise.all([
    getMessages(id),
    listConversations(session.user.id, "group"),
  ]);

  return (
    <div className="flex h-full min-h-0">
      <div className="hidden w-[var(--ds-chat-rail)] shrink-0 flex-col border-r border-line bg-ink-elevated md:flex">
        <GroupCreatePanel />
        <ConversationList
          system="group"
          items={conversations}
          emptyLabel="Create a private group or join with an invite code."
        />
      </div>
      <ChatThread
        conversationId={conversation.id}
        title={conversation.displayTitle}
        subtitle={
          conversation.description ??
          `${conversation.members.length} members · private`
        }
        systemLabel="Group"
        currentUserId={session.user.id}
        initialMessages={messages}
        inviteCode={conversation.inviteCode}
      />
    </div>
  );
}
