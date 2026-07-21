"use client";

import { usePathname } from "next/navigation";
import { Hash, MessagesSquare, Users } from "lucide-react";
import { cn, formatRelative } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { LocaleLink } from "@/components/i18n/locale-link";
import { useDictionary } from "@/components/i18n/locale-provider";
import { stripLocaleFromPathname } from "@/i18n/path";

export type ConversationListItem = {
  id: string;
  type: "direct" | "room" | "group";
  displayTitle: string;
  description?: string | null;
  inviteCode?: string | null;
  peer?: {
    name: string;
    handle: string;
    image: string | null;
    status: string;
  } | null;
  latestMessage?: {
    body: string;
    createdAt: string;
    senderName: string;
  } | null;
  members?: Array<{ userId?: string; id?: string; name: string }>;
};

export function ConversationList({
  items,
  system,
  emptyLabel,
}: {
  items: ConversationListItem[];
  system: "direct" | "room" | "group";
  emptyLabel: string;
}) {
  const pathname = usePathname();
  const t = useDictionary();
  const { pathnameWithoutLocale } = stripLocaleFromPathname(pathname);

  const meta = {
    direct: { href: "/chat/direct", icon: MessagesSquare },
    room: { href: "/chat/rooms", icon: Hash },
    group: { href: "/chat/groups", icon: Users },
  } as const;

  const Icon = meta[system].icon;

  return (
    <div className="ds-scroll flex h-full flex-col overflow-y-auto px-2 pb-4">
      {items.length === 0 ? (
        <div className="m-auto max-w-[12rem] px-4 py-10 text-center text-sm leading-relaxed text-mist">
          {emptyLabel}
        </div>
      ) : (
        <ul className="flex flex-col gap-0.5">
          {items.map((item) => {
            const href = `${meta[system].href}/${item.id}`;
            const active = pathnameWithoutLocale === href;
            return (
              <li key={item.id}>
                <LocaleLink
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors",
                    active ? "bg-ink-soft" : "hover:bg-ink-soft/60",
                  )}
                >
                  {system === "direct" && item.peer ? (
                    <Avatar
                      name={item.peer.name}
                      image={item.peer.image}
                      size="md"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-bone-muted">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="truncate text-[0.95rem] font-medium text-bone">
                        {item.displayTitle}
                      </p>
                      {item.latestMessage ? (
                        <span className="shrink-0 text-[11px] text-mist/80">
                          {formatRelative(item.latestMessage.createdAt)}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-0.5 truncate text-sm text-mist">
                      {item.latestMessage?.body ??
                        item.description ??
                        t.chat.noMessages}
                    </p>
                  </div>
                </LocaleLink>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
