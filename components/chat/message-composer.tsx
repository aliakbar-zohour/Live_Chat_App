"use client";

import { FormEvent, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useDictionary } from "@/components/i18n/locale-provider";

export function MessageComposer({
  conversationId,
  onOptimistic,
}: {
  conversationId: string;
  onOptimistic?: (body: string) => void;
}) {
  const t = useDictionary();
  const [body, setBody] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const value = body.trim();
    if (!value || pending) return;

    setPending(true);
    setError(null);
    setBody("");
    onOptimistic?.(value);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, body: value }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to send");
      }
    } catch (err) {
      setBody(value);
      setError(err instanceof Error ? err.message : "Failed to send");
    } finally {
      setPending(false);
    }
  }

  const canSend = Boolean(body.trim()) && !pending;

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-2xl px-5 pb-5 md:px-8 md:pb-7"
    >
      <div className="flex items-end gap-2 rounded-[1.75rem] bg-ink-elevated px-2 py-2">
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void onSubmit(event as unknown as FormEvent);
            }
          }}
          rows={1}
          placeholder={t.chat.writeMessage}
          className="max-h-32 min-h-[2.75rem] flex-1 resize-none bg-transparent px-3 py-2.5 text-bone outline-none placeholder:text-mist/60"
        />
        <button
          type="submit"
          disabled={!canSend}
          aria-label={t.chat.send}
          className="mb-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-signal text-onsignal transition disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowUp className="h-5 w-5" strokeWidth={2.25} />
        </button>
      </div>
      {error ? (
        <p className="mt-2 px-3 text-sm text-danger">{error}</p>
      ) : null}
    </form>
  );
}
