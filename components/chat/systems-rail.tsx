"use client";

import { usePathname, useRouter } from "next/navigation";
import { Hash, LogOut, MessagesSquare, Users } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { LocaleLink } from "@/components/i18n/locale-link";
import { useDictionary, useLocale } from "@/components/i18n/locale-provider";
import { localizedPath, stripLocaleFromPathname } from "@/i18n/path";

export function SystemsRail({
  user,
}: {
  user: {
    name: string;
    handle?: string | null;
    email: string;
    image?: string | null;
  };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useLocale();
  const t = useDictionary();
  const { pathnameWithoutLocale } = stripLocaleFromPathname(pathname);

  const systems = [
    {
      key: "direct",
      href: "/chat/direct",
      label: t.chat.direct,
      icon: MessagesSquare,
    },
    {
      key: "rooms",
      href: "/chat/rooms",
      label: t.chat.rooms,
      icon: Hash,
    },
    {
      key: "groups",
      href: "/chat/groups",
      label: t.chat.groups,
      icon: Users,
    },
  ] as const;

  return (
    <>
      <aside className="hidden h-full w-[4.5rem] shrink-0 flex-col items-center bg-ink py-6 lg:flex">
        <LocaleLink
          href="/chat"
          className="mb-10 flex items-center justify-center"
          aria-label="Pulse"
        >
          <span className="ds-live-dot" />
        </LocaleLink>

        <nav className="flex flex-1 flex-col items-center gap-2">
          {systems.map((system) => {
            const active = pathnameWithoutLocale.startsWith(system.href);
            const Icon = system.icon;
            return (
              <LocaleLink
                key={system.key}
                href={system.href}
                title={system.label}
                aria-label={system.label}
                className={cn(
                  "relative flex h-11 w-11 items-center justify-center rounded-2xl transition-colors",
                  active
                    ? "bg-signal text-onsignal"
                    : "text-mist hover:bg-ink-soft hover:text-bone",
                )}
              >
                <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
              </LocaleLink>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col items-center gap-4">
          <LanguageSwitcher compact className="border-0 bg-transparent p-0" />
          <Avatar name={user.name} image={user.image} size="sm" />
          <button
            type="button"
            title={t.chat.signOut}
            aria-label={t.chat.signOut}
            className="flex h-10 w-10 items-center justify-center rounded-2xl text-mist transition-colors hover:bg-ink-soft hover:text-bone"
            onClick={async () => {
              await authClient.signOut();
              router.push(localizedPath(locale, "/login"));
              router.refresh();
            }}
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-[var(--ds-z-nav)] grid grid-cols-3 bg-ink/90 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden">
        {systems.map((system) => {
          const active = pathnameWithoutLocale.startsWith(system.href);
          const Icon = system.icon;
          return (
            <LocaleLink
              key={system.key}
              href={system.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px]",
                active ? "text-bone" : "text-mist",
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
              {system.label}
            </LocaleLink>
          );
        })}
      </nav>

      <div className="flex items-center justify-between px-5 py-4 lg:hidden">
        <div className="flex items-center gap-2">
          <span className="ds-live-dot" />
          <span className="font-display text-lg">Pulse</span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher compact className="border-0 bg-transparent p-0" />
          <Avatar name={user.name} image={user.image} size="sm" />
        </div>
      </div>
    </>
  );
}
