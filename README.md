<div align="center">

```text
██████╗ ██╗   ██╗██╗     ███████╗███████╗
██╔══██╗██║   ██║██║     ██╔════╝██╔════╝
██████╔╝██║   ██║██║     ███████╗█████╗  
██╔═══╝ ██║   ██║██║     ╚════██║██╔══╝  
██║     ╚██████╔╝███████╗███████║███████╗
╚═╝      ╚═════╝ ╚══════╝╚══════╝╚══════╝
```

# **PULSE**
### Three live chat systems. One signal.

**Direct · Rooms · Groups** — realtime full-stack messaging with an Awwwards-minded interface.

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Drizzle](https://img.shields.io/badge/Drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br />

[🚀 Quick Start](#-quick-start) ·
[🧠 Architecture](#-architecture) ·
[💬 Chat Systems](#-three-chat-systems) ·
[🎨 Design System](#-design-system) ·
[📡 API](#-api-surface)

<br />

<img
  src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=18&duration=3500&pause=900&color=C8F542&center=true&vCenter=true&width=680&lines=Realtime+SSE+%C2%B7+no+Docker+required;Direct+%2B+Rooms+%2B+Groups;Drizzle+%2B+SQLite+%2B+Better+Auth;Awwwards-style+motion+%26+tokens"
  alt="Pulse typing headline"
/>

</div>

---

## ✨ Why Pulse?

Pulse is a **resume-ready full-stack live chat** that proves you can ship product-quality realtime UX without heavy infra.

| | |
| :--- | :--- |
| ⚡ **Realtime without WebSocket servers** | Server-Sent Events fan-out over `/api/stream` |
| 🧩 **Three coherent systems** | Direct, Rooms, Groups — one conversation model |
| 🗄️ **Zero Docker friction** | File-based SQLite + Drizzle |
| 🔐 **Production-shaped auth** | Better Auth email/password + session cookies |
| 🎨 **Locked design language** | Tokens, primitives, motion rules in `/design-system` |
| 📱 **Fully responsive** | Phone · Tablet · Desktop compositions |

---

## 🛠️ Tech Stack

<div align="center">

### Core runtime

<a href="https://nextjs.org/">
  <img src="https://skillicons.dev/icons?i=nextjs" width="56" height="56" alt="Next.js" />
</a>
&nbsp;
<a href="https://react.dev/">
  <img src="https://skillicons.dev/icons?i=react" width="56" height="56" alt="React" />
</a>
&nbsp;
<a href="https://www.typescriptlang.org/">
  <img src="https://skillicons.dev/icons?i=ts" width="56" height="56" alt="TypeScript" />
</a>
&nbsp;
<a href="https://nodejs.org/">
  <img src="https://skillicons.dev/icons?i=nodejs" width="56" height="56" alt="Node.js" />
</a>

<br /><br />

### Data & auth

<a href="https://orm.drizzle.team/">
  <img src="https://skillicons.dev/icons?i=drizzle" width="56" height="56" alt="Drizzle" />
</a>
&nbsp;
<a href="https://www.sqlite.org/">
  <img src="https://skillicons.dev/icons?i=sqlite" width="56" height="56" alt="SQLite" />
</a>
&nbsp;
<img src="https://cdn.simpleicons.org/betterauth/FFFFFF" width="56" height="56" alt="Better Auth" />

<br /><br />

### UI, motion & validation

<a href="https://tailwindcss.com/">
  <img src="https://skillicons.dev/icons?i=tailwind" width="56" height="56" alt="Tailwind CSS" />
</a>
&nbsp;
<img src="https://cdn.simpleicons.org/framer/0055FF" width="56" height="56" alt="Framer Motion" />
&nbsp;
<img src="https://cdn.simpleicons.org/zod/3E67B1" width="56" height="56" alt="Zod" />
&nbsp;
<img src="https://cdn.simpleicons.org/lucide/F2EFE6" width="56" height="56" alt="Lucide" />

<br /><br />

| Layer | Choice | Why it fits Pulse |
| :---: | :--- | :--- |
| <img src="https://skillicons.dev/icons?i=nextjs" width="28" height="28" alt="Next.js" /> | **Next.js 16** App Router | Server Components, Route Handlers, Proxy |
| <img src="https://skillicons.dev/icons?i=react" width="28" height="28" alt="React" /> | **React 19** | Modern client chat surfaces + motion |
| <img src="https://skillicons.dev/icons?i=ts" width="28" height="28" alt="TypeScript" /> | **TypeScript** | End-to-end typed schema → UI |
| <img src="https://skillicons.dev/icons?i=drizzle" width="28" height="28" alt="Drizzle" /> | **Drizzle ORM** | Lightweight, SQL-first, resume-friendly |
| <img src="https://skillicons.dev/icons?i=sqlite" width="28" height="28" alt="SQLite" /> | **SQLite + better-sqlite3** | Instant local DB, no containers |
| <img src="https://cdn.simpleicons.org/betterauth/FFFFFF" width="28" height="28" alt="Better Auth" /> | **Better Auth** | Sessions, cookies, additional user fields |
| <img src="https://skillicons.dev/icons?i=tailwind" width="28" height="28" alt="Tailwind" /> | **Tailwind CSS v4** | Token-driven styling via `@theme` |
| <img src="https://cdn.simpleicons.org/framer/0055FF" width="28" height="28" alt="Framer Motion" /> | **Framer Motion** | Reveal / magnetic / message enter animations |
| <img src="https://cdn.simpleicons.org/zod/3E67B1" width="28" height="28" alt="Zod" /> | **Zod** | Request payload validation |
| 📡 | **SSE (EventSource)** | Realtime delivery without Socket.IO infra |

</div>

---

## 💬 Three Chat Systems

<div align="center">

| 🔒 Direct | #️⃣ Rooms | 👥 Groups |
| :---: | :---: | :---: |
| Private **1:1** threads | Public **discoverable** channels | **Invite-only** crews |
| Search people → open DM | Create / join open rooms | Create group or enter with code |
| Peer-focused UI | Broadcast-style rooms | Shared history + invite badge |

</div>

```text
 ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
 │   DIRECT     │   │    ROOMS     │   │   GROUPS     │
 │  1 : 1 DM    │   │  public #    │   │ invite-only  │
 └──────┬───────┘   └──────┬───────┘   └──────┬───────┘
        │                  │                  │
        └────────────┬─────┴─────┬────────────┘
                     ▼           ▼
              conversation + members + messages
                     │
                     ▼
              SQLite  ←→  SSE stream
```

Seeded group invite code:

```text
PULSE2026
```

---

## 🧠 Architecture

```mermaid
flowchart LR
  U[Browser clients] -->|POST /api/messages| API[Next.js Route Handlers]
  U -->|EventSource| SSE[/api/stream SSE]
  API --> DB[(SQLite via Drizzle)]
  API --> BUS[In-memory event bus]
  BUS --> SSE
  AUTH[Better Auth] --> DB
  U --> AUTH
```

### Message path

1. Authenticated user sends `POST /api/messages`
2. Message is persisted with Drizzle into SQLite
3. Event is published on the process-local bus
4. Connected SSE clients receive `message.created` instantly
5. Chat UI appends the bubble with Framer Motion enter animation

> Ideal for local / single-node demos. No Redis, no Docker, no separate realtime process.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 20+**
- **npm**

### Install & run

```bash
# 1) clone & enter
git clone <your-repo-url> livechat
cd livechat

# 2) env
cp .env.example .env

# 3) deps
npm install

# 4) database + demo data
npm run db:setup

# 5) go live
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)**

### Environment

| Key | Purpose | Example |
| --- | --- | --- |
| `BETTER_AUTH_SECRET` | Auth signing secret (≥ 32 chars) | `pulse-dev-secret-…` |
| `BETTER_AUTH_URL` | Auth base URL | `http://localhost:3000` |
| `NEXT_PUBLIC_APP_URL` | Client auth base URL | `http://localhost:3000` |
| `DATABASE_URL` | SQLite file path | `./data/pulse.db` |

---

## 🧪 Demo Accounts

Use two browsers (or one normal + one private window) to feel realtime.

| Avatar | Name | Email | Password |
| :---: | :--- | :--- | :--- |
| 🟢 | Alex Rivera | `alex@pulse.chat` | `password123` |
| 🔵 | Jordan Lee | `jordan@pulse.chat` | `password123` |
| 🟣 | Sam Okonkwo | `sam@pulse.chat` | `password123` |

Seeded content includes:
- a Direct thread between Alex ↔ Jordan
- public room **Design Critique**
- private group **Launch Crew** (`PULSE2026`)

---

## 📜 Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start Next.js development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run db:push` | Sync Drizzle schema → SQLite |
| `npm run db:seed` | Seed users + conversations + messages |
| `npm run db:setup` | `db:push` + `db:seed` |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run db:generate` | Generate SQL migrations |

---

## 📡 API Surface

| Method | Endpoint | Role |
| :---: | :--- | :--- |
| `*` | `/api/auth/[...all]` | Better Auth handler |
| `GET` | `/api/stream?conversationId=` | SSE realtime channel |
| `GET/POST` | `/api/messages` | Load / send messages |
| `GET/POST` | `/api/direct` | List / open DMs |
| `GET/POST` | `/api/rooms` | List / create / join rooms |
| `GET/POST` | `/api/groups` | List / create / join groups |
| `GET` | `/api/users?q=` | People search for DMs |

### SSE event shapes

```json
{ "type": "ready" }
```

```json
{
  "type": "message.created",
  "conversationId": "…",
  "message": {
    "id": "…",
    "body": "Hello live world",
    "createdAt": "2026-07-22T00:00:00.000Z",
    "sender": { "id": "…", "name": "Alex", "handle": "alex", "image": null }
  }
}
```

---

## 🗂️ Project Structure

```text
livechat/
├── app/
│   ├── (auth)/login|register      # access screens
│   ├── (app)/chat/{direct,rooms,groups}
│   ├── api/{auth,stream,messages,direct,rooms,groups,users}
│   ├── globals.css                # imports design tokens
│   ├── layout.tsx                 # Syne · Outfit · JetBrains Mono
│   └── page.tsx                   # marketing landing
├── components/
│   ├── auth/                      # login & register forms
│   ├── chat/                      # shell, thread, composer, lists
│   ├── motion/                    # reveal + magnetic
│   └── ui/                        # design-system primitives
├── db/                            # Drizzle schema · client · seed
├── design-system/                 # tokens + rules of engagement
├── lib/                           # auth · chat · realtime · utils
├── data/pulse.db                  # local SQLite (gitignored)
├── drizzle.config.ts
└── proxy.ts                       # route protection (Next.js 16)
```

---

## 🎨 Design System

Pulse avoids generic “AI purple” and cream/terracotta clichés.

<div align="center">

| Token | Swatch | Hex | Role |
| :---: | :---: | :---: | :--- |
| Ink | `⬛` | `#070708` | Page background |
| Elevated | `◾` | `#111114` | Rails / panels |
| Bone | `⬜` | `#F2EFE6` | Primary text |
| Mist | `❔` | `#8D8990` | Secondary text |
| **Signal** | `🟩` | `#C8F542` | CTA · live · focus |

**Fonts:** Syne (display) · Outfit (UI) · JetBrains Mono (handles / codes)

</div>

Rules of engagement live in:

- [`design-system/README.md`](./design-system/README.md)
- [`design-system/tokens.css`](./design-system/tokens.css)

### Motion budget

1. **Page / section reveal** — staggered fade-up
2. **Message enter** — soft rise + blur clear
3. **Magnetic CTAs** — subtle pointer attraction on landing

Easing: `cubic-bezier(0.16, 1, 0.3, 1)`

### Responsive compositions

| Breakpoint | Layout |
| --- | --- |
| **Phone** `< 768px` | List **or** thread · bottom system switcher |
| **Tablet** `768–1023` | List + thread |
| **Desktop** `≥ 1024` | Systems rail + list + thread |

---

## 🔐 Auth & Security Notes

- Email/password via **Better Auth**
- Session cookies + Next.js `proxy.ts` optimistic route guards
- Server-side membership checks before read/write
- Zod validation on mutating chat endpoints
- Secrets stay in `.env` (never commit real secrets)

---

## 🧭 Product Map

```text
Landing  ──►  Login / Register  ──►  /chat
                                      │
                 ┌────────────────────┼────────────────────┐
                 ▼                    ▼                    ▼
            /chat/direct         /chat/rooms         /chat/groups
                 │                    │                    │
                 └────────── live SSE thread UI ───────────┘
```

---

## 📦 What Interviewers Can Notice

- Clear separation of **domain** (`lib/chat.ts`) vs **transport** (`lib/realtime.ts`) vs **UI**
- One conversation model powering three product modes
- Design system treated as a first-class artifact, not an afterthought
- Resume-friendly local DX: `npm run db:setup && npm run dev`

---

## 🛣️ Roadmap Ideas

- [ ] Typing indicators over the same SSE channel
- [ ] Message reactions & unread receipts
- [ ] Image / file attachments
- [ ] Presence heartbeats (`online` / `away`)
- [ ] Optional Redis adapter for multi-instance deploy

---

## 🤝 Contributing locally

```bash
npm run lint
npm run build
```

Keep UI changes on design tokens. If a value isn’t in `design-system/tokens.css`, add the token first — don’t invent one-off colors.

---

<div align="center">

### Built to feel live.

**Pulse** — Direct · Rooms · Groups

`ink × bone × signal`

<br />

<img src="https://cdn.simpleicons.org/nextdotjs/F2EFE6" width="22" height="22" alt="Next.js" />
&nbsp;
<img src="https://cdn.simpleicons.org/react/61DAFB" width="22" height="22" alt="React" />
&nbsp;
<img src="https://cdn.simpleicons.org/typescript/3178C6" width="22" height="22" alt="TypeScript" />
&nbsp;
<img src="https://cdn.simpleicons.org/sqlite/003B57" width="22" height="22" alt="SQLite" />
&nbsp;
<img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" width="22" height="22" alt="Tailwind" />

<br /><br />

<sub>No Docker. No fluff. Just signal.</sub>

</div>
