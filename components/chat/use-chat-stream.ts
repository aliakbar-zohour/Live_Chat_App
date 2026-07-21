"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChatEvent, ChatMessagePayload } from "@/lib/realtime";

export function useChatStream(conversationId?: string | null) {
  const [events, setEvents] = useState<ChatEvent[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const params = conversationId
      ? `?conversationId=${encodeURIComponent(conversationId)}`
      : "";
    const source = new EventSource(`/api/stream${params}`);

    source.onopen = () => setConnected(true);
    source.onerror = () => setConnected(false);
    source.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data) as ChatEvent | { type: "ready" };
        if (data.type === "ready") {
          setConnected(true);
          return;
        }
        setEvents((prev) => [...prev.slice(-40), data]);
      } catch {
        // ignore malformed frames
      }
    };

    return () => {
      source.close();
      setConnected(false);
    };
  }, [conversationId]);

  return { events, connected };
}

export function useLiveMessages(
  conversationId: string,
  initial: ChatMessagePayload[],
) {
  const { events, connected } = useChatStream(conversationId);
  const [messages, setMessages] = useState(initial);

  useEffect(() => {
    setMessages(initial);
  }, [initial, conversationId]);

  useEffect(() => {
    const latest = events[events.length - 1];
    if (!latest || latest.type !== "message.created") return;
    if (latest.conversationId !== conversationId) return;

    setMessages((prev) => {
      if (prev.some((item) => item.id === latest.message.id)) return prev;
      return [...prev, latest.message];
    });
  }, [events, conversationId]);

  return useMemo(() => ({ messages, connected }), [messages, connected]);
}
