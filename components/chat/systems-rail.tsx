"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Hash, LogOut, MessagesSquare, Radio, Users } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const systems = [
  {
    key: "direct",
    href: "/chat/direct",
    label: "Direct",
    hint: "Private 1:1",
    icon: MessagesSquare,
  },
  {
    key: "rooms",
    href: "/chat/rooms",
    label: "Rooms",
    hint: "Open channels",
    icon: Hash,
  },
  {
    key: "groups",
    href: "/chat/groups",
    label: "Groups",
    hint: "Invite only",
    icon: Users,
  },
] as const;

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

  return (
    <>
      <aside className="hidden h-full w-[5.25rem] shrink-0 flex-col border-r border-line bg-ink-elevated lg:flex xl:w-[16rem]">
        <div className="border-b border-line px-3 py-4 xl:px-5">
          <Link href="/chat" className="flex items-center gap-2">
            <span className="ds-live-dot" />
            <span className="font-display text-lg tracking-tight xl:text-xl">
              Pulse
            </span>
          </Link>
          <p className="mt-2 hidden text-xs text-mist xl:block">
            Three live systems. One signal.
          </p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-2 xl:p-3">
          {systems.map((system) => {
            const active = pathname.startsWith(system.href);
            const Icon = system.icon;
            return (
              <Link
                key={system.key}
                href={system.href}
                className={cn(
                  "group flex items-center gap-3 rounded-[var(--ds-radius-sm)] px-2.5 py-3 transition-colors",
                  active
                    ? "bg-signal text-onsignal"
                    : "text-bone hover:bg-ink-soft",
                )}
              >
                <Icon className="mx-auto h-5 w-5 shrink-0 xl:mx-0" />
                <span className="hidden min-w-0 xl:block">
                  <span className="block text-sm font-semibold">
                    {system.label}
                  </span>
                  <span
                    className={cn(
                      "block text-xs",
                      active ? "text-onsignal/80" : "text-mist",
                    )}
                  >
                    {system.hint}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-line p-3">
          <div className="mb-3 hidden items-center gap-3 xl:flex">
            <Avatar name={user.name} image={user.image} />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate font-mono text-[11px] text-mist">
                @{user.handle ?? user.email.split("@")[0]}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center xl:justify-start"
            onClick={async () => {
              await authClient.signOut();
              router.push("/login");
              router.refresh();
            }}
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden xl:inline">Sign out</span>
          </Button>
        </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-[var(--ds-z-nav)] grid grid-cols-3 border-t border-line bg-ink/95 backdrop-blur-md lg:hidden">
        {systems.map((system) => {
          const active = pathname.startsWith(system.href);
          const Icon = system.icon;
          return (
            <Link
              key={system.key}
              href={system.href}
              className={cn(
                "flex flex-col items-center gap-1 px-2 py-3 text-[11px] uppercase tracking-[0.12em]",
                active ? "text-signal" : "text-mist",
              )}
            >
              <Icon className="h-4 w-4" />
              {system.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center justify-between border-b border-line px-4 py-3 lg:hidden">
        <Link href="/chat" className="flex items-center gap-2">
          <Radio className="h-4 w-4 text-signal" />
          <span className="font-display text-lg">Pulse</span>
        </Link>
        <Avatar name={user.name} image={user.image} size="sm" />
      </div>
    </>
  );
}
