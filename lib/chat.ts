import { and, desc, eq, inArray, ne, or, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "@/db";
import {
  conversation,
  conversationMember,
  message,
  user,
  type ConversationType,
} from "@/db/schema";
import { publish, type ChatMessagePayload } from "@/lib/realtime";
import { slugify } from "@/lib/utils";

function toMessagePayload(
  row: {
    id: string;
    conversationId: string;
    body: string;
    createdAt: Date;
    senderId: string;
    senderName: string;
    senderHandle: string;
    senderImage: string | null;
  },
): ChatMessagePayload {
  return {
    id: row.id,
    conversationId: row.conversationId,
    body: row.body,
    createdAt: row.createdAt.toISOString(),
    sender: {
      id: row.senderId,
      name: row.senderName,
      handle: row.senderHandle,
      image: row.senderImage,
    },
  };
}

export async function assertMembership(
  conversationId: string,
  userId: string,
) {
  const [member] = await db
    .select()
    .from(conversationMember)
    .where(
      and(
        eq(conversationMember.conversationId, conversationId),
        eq(conversationMember.userId, userId),
      ),
    )
    .limit(1);

  return member ?? null;
}

export async function listConversations(
  userId: string,
  type?: ConversationType,
) {
  const memberships = await db
    .select({
      id: conversation.id,
      type: conversation.type,
      title: conversation.title,
      slug: conversation.slug,
      description: conversation.description,
      isPublic: conversation.isPublic,
      inviteCode: conversation.inviteCode,
      updatedAt: conversation.updatedAt,
      role: conversationMember.role,
    })
    .from(conversationMember)
    .innerJoin(
      conversation,
      eq(conversation.id, conversationMember.conversationId),
    )
    .where(
      and(
        eq(conversationMember.userId, userId),
        type ? eq(conversation.type, type) : undefined,
      ),
    )
    .orderBy(desc(conversation.updatedAt));

  const ids = memberships.map((item) => item.id);
  if (ids.length === 0) return [];

  const latestMessages = await db
    .select({
      conversationId: message.conversationId,
      body: message.body,
      createdAt: message.createdAt,
      senderName: user.name,
    })
    .from(message)
    .innerJoin(user, eq(user.id, message.senderId))
    .where(inArray(message.conversationId, ids))
    .orderBy(desc(message.createdAt));

  const latestByConversation = new Map<string, (typeof latestMessages)[number]>();
  for (const item of latestMessages) {
    if (!latestByConversation.has(item.conversationId)) {
      latestByConversation.set(item.conversationId, item);
    }
  }

  const members = await db
    .select({
      conversationId: conversationMember.conversationId,
      userId: user.id,
      name: user.name,
      handle: user.handle,
      image: user.image,
      status: user.status,
    })
    .from(conversationMember)
    .innerJoin(user, eq(user.id, conversationMember.userId))
    .where(inArray(conversationMember.conversationId, ids));

  const membersByConversation = new Map<string, typeof members>();
  for (const member of members) {
    const list = membersByConversation.get(member.conversationId) ?? [];
    list.push(member);
    membersByConversation.set(member.conversationId, list);
  }

  return memberships.map((item) => {
    const people = membersByConversation.get(item.id) ?? [];
    const others = people.filter((person) => person.userId !== userId);
    const latest = latestByConversation.get(item.id);
    const displayTitle =
      item.type === "direct"
        ? (others[0]?.name ?? "Direct")
        : (item.title ?? "Untitled");

    return {
      ...item,
      displayTitle,
      peer: others[0] ?? null,
      members: people,
      latestMessage: latest
        ? {
            body: latest.body,
            createdAt: latest.createdAt.toISOString(),
            senderName: latest.senderName,
          }
        : null,
    };
  });
}

export async function listPublicRooms(userId: string) {
  const rooms = await db
    .select()
    .from(conversation)
    .where(and(eq(conversation.type, "room"), eq(conversation.isPublic, true)))
    .orderBy(desc(conversation.updatedAt));

  const memberships = await db
    .select({ conversationId: conversationMember.conversationId })
    .from(conversationMember)
    .where(eq(conversationMember.userId, userId));

  const joined = new Set(memberships.map((item) => item.conversationId));

  return rooms.map((room) => ({
    ...room,
    joined: joined.has(room.id),
  }));
}

export async function getMessages(conversationId: string, limit = 80) {
  const rows = await db
    .select({
      id: message.id,
      conversationId: message.conversationId,
      body: message.body,
      createdAt: message.createdAt,
      senderId: user.id,
      senderName: user.name,
      senderHandle: user.handle,
      senderImage: user.image,
    })
    .from(message)
    .innerJoin(user, eq(user.id, message.senderId))
    .where(eq(message.conversationId, conversationId))
    .orderBy(desc(message.createdAt))
    .limit(limit);

  return rows.reverse().map(toMessagePayload);
}

export async function sendMessage(
  conversationId: string,
  senderId: string,
  body: string,
) {
  const trimmed = body.trim();
  if (!trimmed) {
    throw new Error("Message cannot be empty");
  }

  const member = await assertMembership(conversationId, senderId);
  if (!member) {
    throw new Error("Forbidden");
  }

  const id = nanoid();
  const createdAt = new Date();

  await db.insert(message).values({
    id,
    conversationId,
    senderId,
    body: trimmed,
    createdAt,
  });

  await db
    .update(conversation)
    .set({ updatedAt: createdAt })
    .where(eq(conversation.id, conversationId));

  const [sender] = await db
    .select()
    .from(user)
    .where(eq(user.id, senderId))
    .limit(1);

  const payload = toMessagePayload({
    id,
    conversationId,
    body: trimmed,
    createdAt,
    senderId,
    senderName: sender.name,
    senderHandle: sender.handle,
    senderImage: sender.image,
  });

  publish({
    type: "message.created",
    conversationId,
    message: payload,
  });

  return payload;
}

export async function findOrCreateDirect(userId: string, peerId: string) {
  if (userId === peerId) {
    throw new Error("Cannot message yourself");
  }

  const existing = await db
    .select({
      conversationId: conversationMember.conversationId,
    })
    .from(conversationMember)
    .innerJoin(
      conversation,
      eq(conversation.id, conversationMember.conversationId),
    )
    .where(
      and(
        eq(conversation.type, "direct"),
        eq(conversationMember.userId, userId),
      ),
    );

  for (const item of existing) {
    const peer = await db
      .select()
      .from(conversationMember)
      .where(
        and(
          eq(conversationMember.conversationId, item.conversationId),
          eq(conversationMember.userId, peerId),
        ),
      )
      .limit(1);

    if (peer.length > 0) {
      return item.conversationId;
    }
  }

  const id = nanoid();
  const now = new Date();

  await db.insert(conversation).values({
    id,
    type: "direct",
    title: null,
    isPublic: false,
    createdById: userId,
    createdAt: now,
    updatedAt: now,
  });

  await db.insert(conversationMember).values([
    {
      id: nanoid(),
      conversationId: id,
      userId,
      role: "member",
      joinedAt: now,
    },
    {
      id: nanoid(),
      conversationId: id,
      userId: peerId,
      role: "member",
      joinedAt: now,
    },
  ]);

  publish({ type: "conversation.updated", conversationId: id });
  return id;
}

export async function createRoom(
  userId: string,
  input: { title: string; description?: string; isPublic?: boolean },
) {
  const id = nanoid();
  const now = new Date();
  const base = slugify(input.title) || "room";
  const slug = `${base}-${nanoid(5)}`;

  await db.insert(conversation).values({
    id,
    type: "room",
    title: input.title.trim(),
    slug,
    description: input.description?.trim() || null,
    isPublic: input.isPublic ?? true,
    createdById: userId,
    createdAt: now,
    updatedAt: now,
  });

  await db.insert(conversationMember).values({
    id: nanoid(),
    conversationId: id,
    userId,
    role: "owner",
    joinedAt: now,
  });

  publish({ type: "conversation.updated", conversationId: id });
  return id;
}

export async function joinRoom(userId: string, conversationId: string) {
  const [room] = await db
    .select()
    .from(conversation)
    .where(
      and(eq(conversation.id, conversationId), eq(conversation.type, "room")),
    )
    .limit(1);

  if (!room) throw new Error("Room not found");
  if (!room.isPublic) throw new Error("Room is private");

  const existing = await assertMembership(conversationId, userId);
  if (existing) return conversationId;

  await db.insert(conversationMember).values({
    id: nanoid(),
    conversationId,
    userId,
    role: "member",
    joinedAt: new Date(),
  });

  publish({ type: "conversation.updated", conversationId });
  return conversationId;
}

export async function createGroup(
  userId: string,
  input: { title: string; description?: string; memberIds?: string[] },
) {
  const id = nanoid();
  const now = new Date();
  const inviteCode = nanoid(10);

  await db.insert(conversation).values({
    id,
    type: "group",
    title: input.title.trim(),
    description: input.description?.trim() || null,
    isPublic: false,
    inviteCode,
    createdById: userId,
    createdAt: now,
    updatedAt: now,
  });

  const memberIds = Array.from(
    new Set([userId, ...(input.memberIds ?? [])].filter(Boolean)),
  );

  await db.insert(conversationMember).values(
    memberIds.map((memberId) => ({
      id: nanoid(),
      conversationId: id,
      userId: memberId,
      role: memberId === userId ? "owner" : "member",
      joinedAt: now,
    })),
  );

  publish({ type: "conversation.updated", conversationId: id });
  return { id, inviteCode };
}

export async function joinGroupByInvite(userId: string, inviteCode: string) {
  const [group] = await db
    .select()
    .from(conversation)
    .where(
      and(
        eq(conversation.type, "group"),
        eq(conversation.inviteCode, inviteCode.trim()),
      ),
    )
    .limit(1);

  if (!group) throw new Error("Invalid invite code");

  const existing = await assertMembership(group.id, userId);
  if (!existing) {
    await db.insert(conversationMember).values({
      id: nanoid(),
      conversationId: group.id,
      userId,
      role: "member",
      joinedAt: new Date(),
    });
    publish({ type: "conversation.updated", conversationId: group.id });
  }

  return group.id;
}

export async function searchUsers(query: string, excludeUserId: string) {
  const q = query.trim().toLowerCase();
  if (!q) {
    return db
      .select({
        id: user.id,
        name: user.name,
        handle: user.handle,
        image: user.image,
        status: user.status,
      })
      .from(user)
      .where(ne(user.id, excludeUserId))
      .limit(20);
  }

  return db
    .select({
      id: user.id,
      name: user.name,
      handle: user.handle,
      image: user.image,
      status: user.status,
    })
    .from(user)
    .where(
      and(
        ne(user.id, excludeUserId),
        or(
          sql`lower(${user.name}) like ${`%${q}%`}`,
          sql`lower(${user.handle}) like ${`%${q}%`}`,
          sql`lower(${user.email}) like ${`%${q}%`}`,
        ),
      ),
    )
    .limit(20);
}

export async function getConversationForUser(
  conversationId: string,
  userId: string,
) {
  const member = await assertMembership(conversationId, userId);
  if (!member) return null;

  const [item] = await db
    .select()
    .from(conversation)
    .where(eq(conversation.id, conversationId))
    .limit(1);

  if (!item) return null;

  const members = await db
    .select({
      id: user.id,
      name: user.name,
      handle: user.handle,
      image: user.image,
      status: user.status,
      role: conversationMember.role,
    })
    .from(conversationMember)
    .innerJoin(user, eq(user.id, conversationMember.userId))
    .where(eq(conversationMember.conversationId, conversationId));

  const others = members.filter((person) => person.id !== userId);

  return {
    ...item,
    displayTitle:
      item.type === "direct"
        ? (others[0]?.name ?? "Direct")
        : (item.title ?? "Untitled"),
    peer: others[0] ?? null,
    members,
  };
}
