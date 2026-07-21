import Link from "next/link";
import {
  ArrowUpRight,
  Hash,
  Lock,
  MessagesSquare,
  Radio,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { HeroVisual } from "@/components/landing/hero-visual";

const systems = [
  {
    index: "01",
    title: "Direct",
    copy: "Private one-to-one threads with instant delivery and a quiet, peer-first interface.",
    icon: MessagesSquare,
  },
  {
    index: "02",
    title: "Rooms",
    copy: "Public channels you can discover, join, and broadcast inside — built for open energy.",
    icon: Hash,
  },
  {
    index: "03",
    title: "Groups",
    copy: "Invite-only crews with shared history, roles, and codes that keep the circle tight.",
    icon: Users,
  },
];

const pillars = [
  {
    title: "Realtime by design",
    copy: "Messages fan out over Server-Sent Events the moment they land in SQLite.",
    icon: Zap,
  },
  {
    title: "Auth that feels finished",
    copy: "Better Auth sessions, handles, and protected chat routes — ready for demos.",
    icon: Lock,
  },
  {
    title: "A locked visual system",
    copy: "Navy, ice, and electric blue tokens keep every new screen visually in sync.",
    icon: Sparkles,
  },
];

const steps = [
  {
    step: "01",
    title: "Sign in",
    copy: "Create a handle or jump in with a seeded demo account.",
  },
  {
    step: "02",
    title: "Pick a system",
    copy: "Move between Direct, Rooms, and Groups without losing context.",
  },
  {
    step: "03",
    title: "Send live",
    copy: "Compose once — every connected client sees it stream in.",
  },
];

const stack = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Drizzle",
  "SQLite",
  "Better Auth",
  "SSE",
  "Framer Motion",
  "Tailwind v4",
];

export function LandingPage() {
  return (
    <main className="ds-grain ds-grid-bg relative min-h-screen overflow-x-hidden">
      <div className="relative z-[2]">
        <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-[var(--ds-page-x)] py-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="ds-live-dot" />
            <span className="font-display text-xl font-semibold tracking-tight md:text-2xl">
              Pulse
            </span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-bone-muted md:flex">
            <a href="#systems" className="transition-colors hover:text-bone">
              Systems
            </a>
            <a href="#flow" className="transition-colors hover:text-bone">
              Flow
            </a>
            <a href="#stack" className="transition-colors hover:text-bone">
              Stack
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden h-[var(--ds-control-h)] items-center rounded-[var(--ds-radius-sm)] px-4 text-sm text-bone-muted transition-colors hover:bg-ink-soft hover:text-bone sm:inline-flex"
            >
              Sign in
            </Link>
            <Magnetic>
              <Link
                href="/register"
                className="ds-link-signal inline-flex h-[var(--ds-control-h)] items-center gap-2 rounded-[var(--ds-radius-sm)] px-4 text-sm font-semibold shadow-[var(--ds-shadow-glow)] transition-[filter] hover:brightness-110"
              >
                Start live
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Magnetic>
          </div>
        </header>

        {/* HERO — one composition */}
        <section className="relative flex min-h-dvh flex-col justify-end">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <HeroVisual />
          </div>

          <div className="relative px-[var(--ds-page-x)] pb-16 pt-28 md:pb-24 md:pt-32">
            <Reveal>
              <p className="ds-kicker mb-5 flex items-center gap-2">
                <Radio className="h-3.5 w-3.5" />
                Realtime communication OS
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="ds-display max-w-[13ch] text-[var(--ds-text-hero)] text-bone">
                Three live systems.
                <span className="mt-1 block bg-gradient-to-r from-signal-bright via-glow to-signal bg-clip-text text-transparent">
                  One pulse.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-6 max-w-lg text-[var(--ds-text-lg)] font-light text-bone-muted">
                Direct messages, open rooms, and private groups — streamed the
                instant they land.
              </p>
            </Reveal>

            <Reveal delay={0.22} className="mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <Link
                  href="/register"
                  className="ds-link-primary inline-flex h-[var(--ds-control-h-lg)] items-center gap-2 rounded-[var(--ds-radius-sm)] px-6 text-base font-semibold transition-transform hover:scale-[1.02]"
                >
                  Create account
                </Link>
              </Magnetic>
              <Link
                href="/login"
                className="ds-btn-line inline-flex h-[var(--ds-control-h-lg)] items-center rounded-[var(--ds-radius-sm)] px-6 text-base backdrop-blur-sm"
              >
                Use demo login
              </Link>
            </Reveal>
          </div>
        </section>

        {/* SYSTEMS */}
        <section
          id="systems"
          className="border-t border-line px-[var(--ds-page-x)] py-24 md:py-32"
        >
          <Reveal>
            <p className="ds-kicker mb-4">Systems</p>
            <h2 className="ds-display max-w-4xl text-[clamp(2rem,1.2rem+3vw,3.75rem)]">
              Built as three coherent modes — not three disconnected apps.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
            {systems.map((system, index) => {
              const Icon = system.icon;
              return (
                <Reveal key={system.title} delay={0.08 * index}>
                  <article className="group relative h-full border-t border-line pt-8 transition-colors hover:border-signal/50">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="font-mono text-xs text-signal-bright">
                        {system.index}
                      </span>
                      <Icon className="h-5 w-5 text-signal transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
                    </div>
                    <h3 className="font-display text-3xl tracking-tight md:text-4xl">
                      {system.title}
                    </h3>
                    <p className="mt-4 text-bone-muted">{system.copy}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* PILLARS */}
        <section className="border-t border-line bg-ink-elevated/40 px-[var(--ds-page-x)] py-24 md:py-32">
          <Reveal>
            <p className="ds-kicker mb-4">Signal quality</p>
            <h2 className="ds-display max-w-3xl text-[clamp(2rem,1.2rem+2.6vw,3.4rem)]">
              Everything underneath is tuned for clarity and speed.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {pillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={0.08 * index}>
                  <div className="h-full border border-line bg-ink/50 p-6 md:p-8">
                    <div className="mb-5 inline-flex h-11 w-11 items-center justify-center border border-signal/30 bg-signal/10 text-signal-bright">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-2xl tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-bone-muted">{item.copy}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* FLOW */}
        <section
          id="flow"
          className="border-t border-line px-[var(--ds-page-x)] py-24 md:py-32"
        >
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <Reveal>
              <p className="ds-kicker mb-4">Flow</p>
              <h2 className="ds-display max-w-xl text-[clamp(2rem,1.2rem+2.8vw,3.5rem)]">
                From login to live thread in three moves.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-md text-bone-muted lg:justify-self-end">
                No Docker. No socket server. A file database, a session cookie,
                and an SSE stream — enough to feel production-shaped.
              </p>
            </Reveal>
          </div>

          <ol className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((item, index) => (
              <Reveal key={item.step} delay={0.08 * index}>
                <li className="relative border-l border-signal/40 pl-5">
                  <p className="font-mono text-xs text-signal-bright">
                    {item.step}
                  </p>
                  <h3 className="mt-3 font-display text-2xl tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-bone-muted md:text-base">
                    {item.copy}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* STACK */}
        <section
          id="stack"
          className="border-t border-line px-[var(--ds-page-x)] py-24 md:py-32"
        >
          <Reveal>
            <p className="ds-kicker mb-4">Stack</p>
            <h2 className="ds-display max-w-4xl text-[clamp(2rem,1.1rem+3vw,3.6rem)]">
              Modern, lean, and easy to demo cold.
            </h2>
            <p className="mt-5 max-w-2xl text-bone-muted">
              Next.js App Router, Drizzle on SQLite, Better Auth, and SSE
              realtime — chosen for performance and resume clarity.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-12 flex flex-wrap gap-3">
            {stack.map((item) => (
              <span
                key={item}
                className="border border-line bg-ink-elevated/70 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-bone-muted transition-colors hover:border-signal/40 hover:text-signal-bright"
              >
                {item}
              </span>
            ))}
          </Reveal>
        </section>

        {/* FINAL CTA */}
        <section className="border-t border-line px-[var(--ds-page-x)] py-24 md:py-32">
          <Reveal>
            <div className="relative overflow-hidden border border-line bg-[linear-gradient(135deg,rgba(76,154,255,0.18),rgba(5,10,20,0.9)_45%,rgba(99,208,255,0.12))] px-6 py-14 md:px-12 md:py-20">
              <div className="pointer-events-none absolute -right-10 top-0 h-56 w-56 rounded-full bg-signal/20 blur-3xl" />
              <p className="ds-kicker mb-4">Enter the signal</p>
              <h2 className="ds-display max-w-3xl text-[clamp(2.2rem,1.2rem+3.2vw,4rem)]">
                Open a thread. Watch it arrive live.
              </h2>
              <p className="mt-5 max-w-xl text-bone-muted">
                Demo logins are ready — open two windows and send something.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Magnetic>
                  <Link
                    href="/register"
                    className="ds-link-signal inline-flex h-[var(--ds-control-h-lg)] items-center gap-2 rounded-[var(--ds-radius-sm)] px-6 text-base font-semibold"
                  >
                    Get started
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Magnetic>
                <Link
                  href="/login"
                  className="ds-btn-line inline-flex h-[var(--ds-control-h-lg)] items-center rounded-[var(--ds-radius-sm)] px-6 text-base"
                >
                  alex@pulse.chat
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        <footer className="flex flex-col gap-6 border-t border-line px-[var(--ds-page-x)] py-10 text-sm text-mist md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="ds-live-dot" />
            <p className="font-display text-base text-bone">Pulse</p>
          </div>
          <p>Direct · Rooms · Groups — resume-ready live chat.</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em]">
            navy × ice × electric blue
          </p>
        </footer>
      </div>
    </main>
  );
}
