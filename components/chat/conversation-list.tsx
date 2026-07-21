"use client";

import { usePathname } from "next/navigation";
import { Hash, MessagesSquare, Users } from "lucide-react";
import { cn, formatRelative } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
    direct: {
      href: "/chat/direct",
      icon: MessagesSquare,
      label: t.chat.direct,
    },
    room: {
      href: "/chat/rooms",
      icon: Hash,
      label: t.chat.rooms,
    },
    group: {
      href: "/chat/groups",
      icon: Users,
      label: t.chat.groups,
    },
  } as const;

  const Icon = meta[system].icon;

  return (
    <div className="ds-scroll flex h-full flex-col overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-line bg-ink-elevated/95 px-4 py-4 backdrop-blur">
        <p className="ds-kicker mb-1">{meta[system].label}</p>
        <h2 className="font-display text-xl tracking-tight">{t.chat.threads}</h2>
      </div>

      {items.length === 0 ? (
        <div className="m-auto max-w-[14rem] px-4 py-10 text-center text-sm text-mist">
          <Icon className="mx-auto mb-3 h-5 w-5 text-signal" />
          {emptyLabel}
        </div>
      ) : (
        <ul className="flex flex-col p-2">
          {items.map((item) => {
            const href = `${meta[system].href}/${item.id}`;
            const active = pathnameWithoutLocale === href;
            return (
              <li key={item.id}>
                <LocaleLink
                  href={href}
                  className={cn(
                    "group flex items-start gap-3 rounded-[var(--ds-radius-sm)] px-3 py-3 transition-colors",
                    active ? "bg-signal/10" : "hover:bg-ink-soft",
                  )}
                >
                  {system === "direct" && item.peer ? (
                    <Avatar
                      name={item.peer.name}
                      image={item.peer.image}
                      size="md"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-[var(--ds-radius-sm)] bg-ink-soft text-signal">
                      <Icon className="h-4 w-4" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <p className="truncate font-medium text-bone">
                        {item.displayTitle}
                      </p>
                      {item.latestMessage ? (
                        <span className="shrink-0 text-[11px] text-mist">
                          {formatRelative(item.latestMessage.createdAt)}
                        </span>
                      ) : null}
                    </div>
                    <p className="truncate text-sm text-mist">
                      {item.latestMessage?.body ??
                        item.description ??
                        t.chat.noMessages}
                    </p>
                    {system === "group" && item.inviteCode ? (
                      <div className="mt-2">
                        <Badge tone="signal">
                          {t.chat.code} · {item.inviteCode}
                        </Badge>
                      </div>
                    ) : null}
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
