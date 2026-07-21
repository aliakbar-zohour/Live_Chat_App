"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { useDictionary, useLocale } from "@/components/i18n/locale-provider";
import { localizedPath } from "@/i18n/path";

type UserHit = {
  id: string;
  name: string;
  handle: string;
  image: string | null;
  status: string;
};

export function DirectCreatePanel() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = useDictionary();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<UserHit[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      const response = await fetch(
        `/api/users?q=${encodeURIComponent(query)}`,
        { signal: controller.signal },
      );
      if (!response.ok) return;
      const data = await response.json();
      setUsers(data.users ?? []);
    }, 180);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  async function startDirect(peerId: string) {
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/direct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ peerId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Failed");
      router.push(localizedPath(locale, `/chat/direct/${data.id}`));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="px-3 pb-2 pt-5">
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t.chat.searchPeople}
        className="h-11 rounded-2xl border-0 bg-ink px-4"
      />
      {error ? <p className="mt-2 px-1 text-sm text-danger">{error}</p> : null}
      {query.trim() || users.length > 0 ? (
        <ul className="mt-2 max-h-44 space-y-0.5 overflow-y-auto">
          {users.map((person) => (
            <li key={person.id}>
              <button
                type="button"
                disabled={pending}
                onClick={() => void startDirect(person.id)}
                className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-start transition-colors hover:bg-ink"
              >
                <Avatar name={person.name} image={person.image} size="sm" />
                <span className="min-w-0">
                  <span className="block truncate text-sm text-bone">
                    {person.name}
                  </span>
                  <span className="block truncate text-xs text-mist">
                    @{person.handle}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function RoomCreatePanel() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = useDictionary();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discover, setDiscover] = useState<
    Array<{
      id: string;
      title: string | null;
      description: string | null;
      joined: boolean;
    }>
  >([]);

  useEffect(() => {
    void (async () => {
      const response = await fetch("/api/rooms?scope=discover");
      if (!response.ok) return;
      const data = await response.json();
      setDiscover(data.rooms ?? []);
    })();
  }, []);

  async function onCreate(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, isPublic: true }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Failed");
      setTitle("");
      setOpen(false);
      router.push(localizedPath(locale, `/chat/rooms/${data.id}`));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setPending(false);
    }
  }

  async function join(conversationId: string) {
    const response = await fetch("/api/rooms?action=join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error ?? "Failed to join");
      return;
    }
    router.push(localizedPath(locale, `/chat/rooms/${data.id}`));
    router.refresh();
  }

  return (
    <div className="space-y-3 px-3 pb-2 pt-5">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-ink text-sm text-bone transition hover:bg-ink-soft"
      >
        <Plus className="h-4 w-4 text-bone-muted" />
        {t.chat.createRoom}
      </button>

      {open ? (
        <form onSubmit={onCreate} className="space-y-2">
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={t.chat.roomTitle}
            required
            className="h-11 rounded-2xl border-0 bg-ink px-4"
          />
          <button
            type="submit"
            disabled={pending}
            className="h-10 w-full rounded-2xl bg-signal text-sm font-semibold text-onsignal disabled:opacity-40"
          >
            {t.chat.openRoom}
          </button>
        </form>
      ) : null}

      {error ? <p className="px-1 text-sm text-danger">{error}</p> : null}

      {discover.length > 0 ? (
        <ul className="max-h-36 space-y-0.5 overflow-y-auto">
          {discover.map((room) => (
            <li key={room.id}>
              <button
                type="button"
                onClick={() =>
                  room.joined
                    ? router.push(
                        localizedPath(locale, `/chat/rooms/${room.id}`),
                      )
                    : void join(room.id)
                }
                className="flex w-full items-center justify-between gap-2 rounded-2xl px-3 py-2.5 text-start transition hover:bg-ink"
              >
                <span className="min-w-0 truncate text-sm text-bone">
                  {room.title}
                </span>
                <span className="shrink-0 text-xs text-bone-muted">
                  {room.joined ? t.chat.open : t.chat.join}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function GroupCreatePanel() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = useDictionary();
  const [mode, setMode] = useState<"idle" | "create" | "join">("idle");
  const [title, setTitle] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onCreate(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Failed");
      router.push(localizedPath(locale, `/chat/groups/${data.id}`));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setPending(false);
    }
  }

  async function onJoin(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/groups?action=join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteCode }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Failed");
      router.push(localizedPath(locale, `/chat/groups/${data.id}`));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-2 px-3 pb-2 pt-5">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setMode(mode === "create" ? "idle" : "create")}
          className="h-11 rounded-2xl bg-ink text-sm text-bone transition hover:bg-ink-soft"
        >
          {t.chat.createGroup}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "join" ? "idle" : "join")}
          className="h-11 rounded-2xl bg-ink text-sm text-bone transition hover:bg-ink-soft"
        >
          {t.chat.joinInvite}
        </button>
      </div>

      {mode === "create" ? (
        <form onSubmit={onCreate} className="space-y-2">
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={t.chat.groupName}
            required
            className="h-11 rounded-2xl border-0 bg-ink px-4"
          />
          <button
            type="submit"
            disabled={pending}
            className="h-10 w-full rounded-2xl bg-signal text-sm font-semibold text-onsignal disabled:opacity-40"
          >
            {t.chat.createGroup}
          </button>
        </form>
      ) : null}

      {mode === "join" ? (
        <form onSubmit={onJoin} className="space-y-2">
          <Input
            value={inviteCode}
            onChange={(event) => setInviteCode(event.target.value)}
            placeholder={t.chat.inviteCode}
            required
            className="h-11 rounded-2xl border-0 bg-ink px-4"
          />
          <button
            type="submit"
            disabled={pending}
            className="h-10 w-full rounded-2xl bg-signal text-sm font-semibold text-onsignal disabled:opacity-40"
          >
            {t.chat.enterGroup}
          </button>
        </form>
      ) : null}

      {error ? <p className="px-1 text-sm text-danger">{error}</p> : null}
    </div>
  );
}
