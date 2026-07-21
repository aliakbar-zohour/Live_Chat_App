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
    <div className="ds-scroll mx-auto flex w-full max-w-2xl flex-1 flex-col gap-1 overflow-y-auto px-5 py-8 md:px-8">
      <AnimatePresence initial={false}>
        {messages.map((message, index) => {
          const mine = message.sender.id === currentUserId;
          const prev = messages[index - 1];
          const showMeta =
            !prev ||
            prev.sender.id !== message.sender.id ||
            new Date(message.createdAt).getTime() -
              new Date(prev.createdAt).getTime() >
              1000 * 60 * 4;

          return (
            <motion.article
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "flex max-w-[min(100%,28rem)] gap-2.5",
                mine ? "ms-auto flex-row-reverse" : "me-auto",
                showMeta ? "mt-4 first:mt-0" : "mt-1",
              )}
            >
              {!mine ? (
                showMeta ? (
                  <Avatar
                    name={message.sender.name}
                    image={message.sender.image}
                    size="sm"
                  />
                ) : (
                  <div className="w-8 shrink-0" />
                )
              ) : null}

              <div className={cn("min-w-0", mine && "text-end")}>
                {showMeta && !mine ? (
                  <p className="mb-1.5 px-1 text-xs text-mist">
                    {message.sender.name}
                    <span className="mx-1.5 opacity-40">·</span>
                    <time dateTime={message.createdAt}>
                      {formatTime(message.createdAt)}
                    </time>
                  </p>
                ) : null}
                {showMeta && mine ? (
                  <p className="mb-1.5 px-1 text-xs text-mist">
                    <time dateTime={message.createdAt}>
                      {formatTime(message.createdAt)}
                    </time>
                  </p>
                ) : null}
                <div
                  className={cn(
                    "px-4 py-2.5 text-[0.98rem] leading-relaxed",
                    mine
                      ? "rounded-[1.25rem] rounded-se-md bg-signal text-onsignal"
                      : "rounded-[1.25rem] rounded-ss-md bg-ink-soft text-bone",
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
        <div className="m-auto max-w-xs text-center">
          <p className="text-sm text-mist">{t.chat.firstTransmission}</p>
        </div>
      ) : null}
    </div>
  );
}
