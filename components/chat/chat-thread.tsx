"use client";

import { useEffect, useRef } from "react";
import { MessageComposer } from "@/components/chat/message-composer";
import { MessageList } from "@/components/chat/message-list";
import { useLiveMessages } from "@/components/chat/use-chat-stream";
import { useDictionary } from "@/components/i18n/locale-provider";
import type { ChatMessagePayload } from "@/lib/realtime";

export function ChatThread({
  conversationId,
  title,
  subtitle,
  systemLabel,
  currentUserId,
  initialMessages,
  inviteCode,
}: {
  conversationId: string;
  title: string;
  subtitle?: string;
  systemLabel: string;
  currentUserId: string;
  initialMessages: ChatMessagePayload[];
  inviteCode?: string | null;
}) {
  const t = useDictionary();
  const { messages, connected } = useLiveMessages(
    conversationId,
    initialMessages,
  );
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <section className="flex h-full min-h-0 flex-1 flex-col">
      <header className="flex items-center justify-between gap-4 px-6 py-5 md:px-8">
        <div className="min-w-0">
          <h1 className="truncate font-display text-xl tracking-tight md:text-2xl">
            {title}
          </h1>
          <p className="mt-1 truncate text-sm text-mist">
            {subtitle ?? systemLabel}
            {inviteCode ? ` · ${inviteCode}` : null}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 text-xs text-mist">
          <span
            className={
              connected ? "ds-live-dot" : "h-2 w-2 rounded-full bg-mist/50"
            }
          />
          <span>{connected ? t.chat.live : t.chat.reconnecting}</span>
        </div>
      </header>

      <MessageList messages={messages} currentUserId={currentUserId} />
      <div ref={bottomRef} />
      <MessageComposer conversationId={conversationId} />
    </section>
  );
}
