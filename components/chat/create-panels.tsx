"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input, Textarea } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";

type UserHit = {
  id: string;
  name: string;
  handle: string;
  image: string | null;
  status: string;
};

export function DirectCreatePanel() {
  const router = useRouter();
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
      router.push(`/chat/direct/${data.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="border-b border-line p-4">
      <Field label="Start a direct">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search people by name or @handle"
        />
      </Field>
      {error ? <p className="mt-2 text-sm text-danger">{error}</p> : null}
      <ul className="mt-3 max-h-48 space-y-1 overflow-y-auto">
        {users.map((person) => (
          <li key={person.id}>
            <button
              type="button"
              disabled={pending}
              onClick={() => void startDirect(person.id)}
              className="flex w-full items-center gap-3 rounded-[var(--ds-radius-sm)] px-2 py-2 text-left hover:bg-ink-soft"
            >
              <Avatar name={person.name} image={person.image} size="sm" />
              <span className="min-w-0">
                <span className="block truncate text-sm">{person.name}</span>
                <span className="block font-mono text-[11px] text-mist">
                  @{person.handle}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RoomCreatePanel() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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

  async function loadDiscover() {
    const response = await fetch("/api/rooms?scope=discover");
    if (!response.ok) return;
    const data = await response.json();
    setDiscover(data.rooms ?? []);
  }

  useEffect(() => {
    void loadDiscover();
  }, []);

  async function onCreate(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, isPublic: true }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Failed");
      setTitle("");
      setDescription("");
      router.push(`/chat/rooms/${data.id}`);
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
    router.push(`/chat/rooms/${data.id}`);
    router.refresh();
  }

  return (
    <div className="space-y-4 border-b border-line p-4">
      <form onSubmit={onCreate} className="space-y-3">
        <Field label="Create room">
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Room title"
            required
          />
        </Field>
        <Textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="What is this room for?"
        />
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <Button type="submit" variant="signal" disabled={pending} className="w-full">
          Open room
        </Button>
      </form>

      <div>
        <p className="ds-kicker mb-2">Discover</p>
        <ul className="max-h-40 space-y-1 overflow-y-auto">
          {discover.map((room) => (
            <li
              key={room.id}
              className="flex items-center justify-between gap-2 rounded-[var(--ds-radius-sm)] px-2 py-2 hover:bg-ink-soft"
            >
              <div className="min-w-0">
                <p className="truncate text-sm">{room.title}</p>
                <p className="truncate text-xs text-mist">
                  {room.description ?? "Public room"}
                </p>
              </div>
              {room.joined ? (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => router.push(`/chat/rooms/${room.id}`)}
                >
                  Open
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="line"
                  onClick={() => void join(room.id)}
                >
                  Join
                </Button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function GroupCreatePanel() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Failed");
      router.push(`/chat/groups/${data.id}`);
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
      router.push(`/chat/groups/${data.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-5 border-b border-line p-4">
      <form onSubmit={onCreate} className="space-y-3">
        <Field label="Create group">
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Group name"
            required
          />
        </Field>
        <Textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Private purpose"
        />
        <Button type="submit" variant="signal" disabled={pending} className="w-full">
          Create group
        </Button>
      </form>

      <form onSubmit={onJoin} className="space-y-3">
        <Field label="Join with invite">
          <Input
            value={inviteCode}
            onChange={(event) => setInviteCode(event.target.value)}
            placeholder="Invite code"
            required
          />
        </Field>
        <Button type="submit" variant="line" disabled={pending} className="w-full">
          Enter group
        </Button>
      </form>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </div>
  );
}
