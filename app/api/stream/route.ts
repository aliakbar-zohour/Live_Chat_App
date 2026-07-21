import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { assertMembership } from "@/lib/chat";
import {
  subscribeAll,
  subscribeConversation,
  type ChatEvent,
} from "@/lib/realtime";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const conversationId = request.nextUrl.searchParams.get("conversationId");
  const encoder = new TextEncoder();

  let cleanup: (() => void) | undefined;
  let heartbeat: ReturnType<typeof setInterval> | undefined;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: ChatEvent | { type: "ready" }) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(event)}\n\n`),
        );
      };

      send({ type: "ready" });

      const onEvent = async (event: ChatEvent) => {
        if (conversationId) {
          if (event.conversationId !== conversationId) return;
          send(event);
          return;
        }

        const member = await assertMembership(
          event.conversationId,
          session.user.id,
        );
        if (member) send(event);
      };

      cleanup = conversationId
        ? subscribeConversation(conversationId, onEvent)
        : subscribeAll(onEvent);

      heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(`: ping\n\n`));
      }, 15000);

      request.signal.addEventListener("abort", () => {
        cleanup?.();
        if (heartbeat) clearInterval(heartbeat);
        controller.close();
      });
    },
    cancel() {
      cleanup?.();
      if (heartbeat) clearInterval(heartbeat);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
