import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { searchUsers } from "@/lib/chat";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const q = request.nextUrl.searchParams.get("q") ?? "";
  const users = await searchUsers(q, session.user.id);
  return NextResponse.json({ users });
}
