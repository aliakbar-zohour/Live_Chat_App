import "dotenv/config";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "./index";
import {
  conversation,
  conversationMember,
  message,
  user,
} from "./schema";
import { auth } from "../lib/auth";

const demoUsers = [
  {
    name: "Alex Rivera",
    email: "alex@pulse.chat",
    handle: "alex",
    password: "password123",
  },
  {
    name: "Jordan Lee",
    email: "jordan@pulse.chat",
    handle: "jordan",
    password: "password123",
  },
  {
    name: "Sam Okonkwo",
    email: "sam@pulse.chat",
    handle: "sam",
    password: "password123",
  },
] as const;

async function ensureUser(input: (typeof demoUsers)[number]) {
  const existing = await db
    .select()
    .from(user)
    .where(eq(user.email, input.email))
    .limit(1);

  if (existing[0]) return existing[0];

  await auth.api.signUpEmail({
    body: {
      name: input.name,
      email: input.email,
      password: input.password,
      handle: input.handle,
    },
  });

  const [created] = await db
    .select()
    .from(user)
    .where(eq(user.email, input.email))
    .limit(1);

  if (!created) {
    throw new Error(`Failed to create ${input.email}`);
  }

  return created;
}

async function seed() {
  console.log("Seeding Pulse…");

  const [alex, jordan, sam] = await Promise.all(
    demoUsers.map((item) => ensureUser(item)),
  );

  const existingRooms = await db.select().from(conversation).limit(1);
  if (existingRooms.length > 0) {
    console.log("Seed data already present.");
    return;
  }

  const now = new Date();

  const directId = nanoid();
  await db.insert(conversation).values({
    id: directId,
    type: "direct",
    createdById: alex.id,
    createdAt: now,
    updatedAt: now,
  });
  await db.insert(conversationMember).values([
    {
      id: nanoid(),
      conversationId: directId,
      userId: alex.id,
      role: "member",
      joinedAt: now,
    },
    {
      id: nanoid(),
      conversationId: directId,
      userId: jordan.id,
      role: "member",
      joinedAt: now,
    },
  ]);

  const roomId = nanoid();
  await db.insert(conversation).values({
    id: roomId,
    type: "room",
    title: "Design Critique",
    slug: "design-critique",
    description: "Share work-in-progress and get sharp feedback.",
    isPublic: true,
    createdById: jordan.id,
    createdAt: now,
    updatedAt: now,
  });
  await db.insert(conversationMember).values([
    {
      id: nanoid(),
      conversationId: roomId,
      userId: jordan.id,
      role: "owner",
      joinedAt: now,
    },
    {
      id: nanoid(),
      conversationId: roomId,
      userId: alex.id,
      role: "member",
      joinedAt: now,
    },
    {
      id: nanoid(),
      conversationId: roomId,
      userId: sam.id,
      role: "member",
      joinedAt: now,
    },
  ]);

  const groupId = nanoid();
  await db.insert(conversation).values({
    id: groupId,
    type: "group",
    title: "Launch Crew",
    description: "Private squad for shipping Pulse.",
    isPublic: false,
    inviteCode: "PULSE2026",
    createdById: sam.id,
    createdAt: now,
    updatedAt: now,
  });
  await db.insert(conversationMember).values([
    {
      id: nanoid(),
      conversationId: groupId,
      userId: sam.id,
      role: "owner",
      joinedAt: now,
    },
    {
      id: nanoid(),
      conversationId: groupId,
      userId: alex.id,
      role: "member",
      joinedAt: now,
    },
    {
      id: nanoid(),
      conversationId: groupId,
      userId: jordan.id,
      role: "member",
      joinedAt: now,
    },
  ]);

  await db.insert(message).values([
    {
      id: nanoid(),
      conversationId: directId,
      senderId: alex.id,
      body: "Hey Jordan — ready to pressure-test the realtime layer?",
      createdAt: now,
    },
    {
      id: nanoid(),
      conversationId: directId,
      senderId: jordan.id,
      body: "Already in. SSE feels snappy on this build.",
      createdAt: new Date(now.getTime() + 1000),
    },
    {
      id: nanoid(),
      conversationId: roomId,
      senderId: jordan.id,
      body: "Drop mockups here. Keep feedback sharp and kind.",
      createdAt: now,
    },
    {
      id: nanoid(),
      conversationId: roomId,
      senderId: sam.id,
      body: "Motion on the composer feels Awwwards-ready.",
      createdAt: new Date(now.getTime() + 2000),
    },
    {
      id: nanoid(),
      conversationId: groupId,
      senderId: sam.id,
      body: "Invite code for new members: PULSE2026",
      createdAt: now,
    },
  ]);

  console.log("Done. Demo logins:");
  for (const item of demoUsers) {
    console.log(`  ${item.email} / ${item.password}`);
  }
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
