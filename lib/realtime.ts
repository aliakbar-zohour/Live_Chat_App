import { EventEmitter } from "node:events";

export type ChatMessagePayload = {
  id: string;
  conversationId: string;
  body: string;
  createdAt: string;
  sender: {
    id: string;
    name: string;
    handle: string;
    image: string | null;
  };
};

export type ChatEvent =
  | {
      type: "message.created";
      conversationId: string;
      message: ChatMessagePayload;
    }
  | {
      type: "typing";
      conversationId: string;
      userId: string;
      handle: string;
    }
  | {
      type: "conversation.updated";
      conversationId: string;
    };

type GlobalBus = typeof globalThis & {
  __pulseBus?: EventEmitter;
};

const g = globalThis as GlobalBus;

export const bus = g.__pulseBus ?? new EventEmitter();
bus.setMaxListeners(500);
g.__pulseBus = bus;

export function publish(event: ChatEvent) {
  bus.emit(`conversation:${event.conversationId}`, event);
  bus.emit("user:*", event);
}

export function subscribeConversation(
  conversationId: string,
  listener: (event: ChatEvent) => void,
) {
  const key = `conversation:${conversationId}`;
  bus.on(key, listener);
  return () => bus.off(key, listener);
}

export function subscribeAll(listener: (event: ChatEvent) => void) {
  bus.on("user:*", listener);
  return () => bus.off("user:*", listener);
}
