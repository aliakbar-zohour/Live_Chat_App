import { listConversations } from "@/lib/chat";
import { requireSession } from "@/lib/session";
import { ConversationList } from "@/components/chat/conversation-list";
import { DirectCreatePanel } from "@/components/chat/create-panels";

export default async function DirectIndexPage() {
  const session = await requireSession();
  const conversations = await listConversations(session.user.id, "direct");

  return (
    <div className="flex h-full min-h-0">
      <div className="flex w-full flex-col border-r border-line bg-ink-elevated md:w-[var(--ds-chat-rail)] md:shrink-0">
        <DirectCreatePanel />
        <ConversationList
          system="direct"
          items={conversations}
          emptyLabel="Search someone above to open a private thread."
        />
      </div>
      <div className="hidden min-w-0 flex-1 items-center justify-center md:flex">
        <div className="max-w-sm px-6 text-center">
          <p className="ds-kicker mb-3">Direct</p>
          <h1 className="font-display text-3xl tracking-tight">
            Pick a person. Talk in private.
          </h1>
        </div>
      </div>
    </div>
  );
}
