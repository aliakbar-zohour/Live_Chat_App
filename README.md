# Pulse

Full-stack realtime chat with **three live systems** — Direct, Rooms, and Groups — built as a resume project.

## Stack

- **Next.js 16** App Router
- **Drizzle ORM** + **SQLite** (file DB, no Docker)
- **Better Auth** (email/password + sessions)
- **SSE** realtime fan-out (no separate socket server)
- **Framer Motion** for Awwwards-style motion
- Locked **design system** in `/design-system`

## Quick start

```bash
cp .env.example .env
npm install
npm run db:setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo accounts

| Email | Password |
| --- | --- |
| `alex@pulse.chat` | `password123` |
| `jordan@pulse.chat` | `password123` |
| `sam@pulse.chat` | `password123` |

Group invite seed code: `PULSE2026`

## Systems

1. **Direct** — private 1:1 threads
2. **Rooms** — public discoverable channels
3. **Groups** — invite-only multi-member chats

Messages persist in SQLite and stream live over `/api/stream`.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start app |
| `npm run db:push` | Sync Drizzle schema to SQLite |
| `npm run db:seed` | Seed demo users + conversations |
| `npm run db:setup` | Push + seed |
| `npm run db:studio` | Open Drizzle Studio |

## Design system

Read `design-system/README.md` and use tokens from `design-system/tokens.css` for every new UI surface so visuals stay in sync.
