import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import {
  createGroup,
  joinGroupByInvite,
  listConversations,
} from "@/lib/chat";

const createSchema = z.object({
  title: z.string().min(2).max(80),
  description: z.string().max(280).optional(),
  memberIds: z.array(z.string()).optional(),
});

const joinSchema = z.object({
  inviteCode: z.string().min(4).max(32),
});

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const conversations = await listConversations(session.user.id, "group");
  return NextResponse.json({ conversations });
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const action = request.nextUrl.searchParams.get("action") ?? "create";

  if (action === "join") {
    const parsed = joinSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    try {
      const id = await joinGroupByInvite(
        session.user.id,
        parsed.data.inviteCode,
      );
      return NextResponse.json({ id });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed";
      return NextResponse.json({ error: message }, { status: 400 });
    }
  }

  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    const result = await createGroup(session.user.id, parsed.data);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
