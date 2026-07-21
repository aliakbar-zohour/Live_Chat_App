"use client";

import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
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
    <section className="flex h-full min-h-0 flex-1 flex-col bg-ink">
      <header className="flex items-start justify-between gap-4 border-b border-line px-4 py-4 md:px-6">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge tone="signal">{systemLabel}</Badge>
            <Badge tone={connected ? "signal" : "mist"}>
              {connected ? t.chat.live : t.chat.reconnecting}
            </Badge>
            {inviteCode ? (
              <Badge tone="bone">
                {t.chat.code} · {inviteCode}
              </Badge>
            ) : null}
          </div>
          <h1 className="truncate font-display text-2xl tracking-tight md:text-3xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-1 truncate text-sm text-mist">{subtitle}</p>
          ) : null}
        </div>
      </header>

      <MessageList messages={messages} currentUserId={currentUserId} />
      <div ref={bottomRef} />
      <MessageComposer conversationId={conversationId} />
    </section>
  );
}
