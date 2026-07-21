"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { useDictionary } from "@/components/i18n/locale-provider";
import type { ChatMessagePayload } from "@/lib/realtime";
import { cn, formatTime } from "@/lib/utils";

export function MessageList({
  messages,
  currentUserId,
}: {
  messages: ChatMessagePayload[];
  currentUserId: string;
}) {
  const t = useDictionary();

  return (
    <div className="ds-scroll flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-5 md:px-6">
      <AnimatePresence initial={false}>
        {messages.map((message) => {
          const mine = message.sender.id === currentUserId;
          return (
            <motion.article
              key={message.id}
              layout
              initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "flex max-w-[min(100%,36rem)] gap-3",
                mine ? "ms-auto flex-row-reverse" : "me-auto",
              )}
            >
              <Avatar
                name={message.sender.name}
                image={message.sender.image}
                size="sm"
              />
              <div className={cn("min-w-0", mine && "text-end")}>
                <div
                  className={cn(
                    "mb-1 flex items-baseline gap-2 text-xs text-mist",
                    mine && "justify-end",
                  )}
                >
                  <span className="font-medium text-bone/80">
                    {mine ? t.chat.you : message.sender.name}
                  </span>
                  <time dateTime={message.createdAt}>
                    {formatTime(message.createdAt)}
                  </time>
                </div>
                <div
                  className={cn(
                    "rounded-[var(--ds-radius-md)] px-3.5 py-2.5 text-[0.98rem] leading-relaxed",
                    mine
                      ? "bg-signal text-onsignal"
                      : "border border-line bg-ink-soft text-bone",
                  )}
                >
                  {message.body}
                </div>
              </div>
            </motion.article>
          );
        })}
      </AnimatePresence>
      {messages.length === 0 ? (
        <div className="m-auto max-w-sm text-center">
          <p className="ds-kicker mb-3">{t.chat.noSignal}</p>
          <p className="font-display text-2xl text-bone">
            {t.chat.firstTransmission}
          </p>
        </div>
      ) : null}
    </div>
  );
}
