import { listConversations } from "@/lib/chat";
import { requireSession } from "@/lib/session";
import { ConversationList } from "@/components/chat/conversation-list";
import { GroupCreatePanel } from "@/components/chat/create-panels";

export default async function GroupsIndexPage() {
  const session = await requireSession();
  const conversations = await listConversations(session.user.id, "group");

  return (
    <div className="flex h-full min-h-0">
      <div className="flex w-full flex-col border-r border-line bg-ink-elevated md:w-[var(--ds-chat-rail)] md:shrink-0">
        <GroupCreatePanel />
        <ConversationList
          system="group"
          items={conversations}
          emptyLabel="Create a private group or join with an invite code."
        />
      </div>
      <div className="hidden min-w-0 flex-1 items-center justify-center md:flex">
        <div className="max-w-sm px-6 text-center">
          <p className="ds-kicker mb-3">Groups</p>
          <h1 className="font-display text-3xl tracking-tight">
            Invite-only spaces for tight crews.
          </h1>
        </div>
      </div>
    </div>
  );
}
