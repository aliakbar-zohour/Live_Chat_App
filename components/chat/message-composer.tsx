"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/components/i18n/locale-provider";
import { cn } from "@/lib/utils";

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

  return (
    <form
      onSubmit={onSubmit}
      className="border-t border-line bg-ink/80 px-4 py-3 backdrop-blur-md md:px-6"
    >
      <div
        className={cn(
          "flex items-end gap-2 rounded-[var(--ds-radius-md)] border border-line bg-ink-elevated p-2",
        )}
      >
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
          className="max-h-36 min-h-[2.75rem] flex-1 resize-none bg-transparent px-2 py-2 text-bone outline-none placeholder:text-mist/70"
        />
        <Button
          type="submit"
          variant="signal"
          size="sm"
          disabled={pending || !body.trim()}
          className="shrink-0"
        >
          {t.chat.send}
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
      {error ? <p className="mt-2 text-sm text-danger">{error}</p> : null}
    </form>
  );
}
