import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";

const systems = [
  {
    index: "01",
    title: "Direct",
    copy: "Private one-to-one threads with instant delivery.",
  },
  {
    index: "02",
    title: "Rooms",
    copy: "Public channels you can discover, join, and broadcast in.",
  },
  {
    index: "03",
    title: "Groups",
    copy: "Invite-only crews with shared history and codes.",
  },
];

export default function HomePage() {
  return (
    <main className="ds-grain ds-grid-bg relative min-h-screen overflow-hidden">
      <div className="relative z-[2]">
        <header className="flex items-center justify-between px-[var(--ds-page-x)] py-5">
          <div className="flex items-center gap-3">
            <span className="ds-live-dot" />
            <span className="font-display text-xl tracking-tight">Pulse</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden h-[var(--ds-control-h)] items-center rounded-[var(--ds-radius-sm)] px-4 text-sm text-bone hover:bg-ink-soft sm:inline-flex"
            >
              Sign in
            </Link>
            <Magnetic>
              <Link
                href="/register"
                className="inline-flex h-[var(--ds-control-h)] items-center gap-2 rounded-[var(--ds-radius-sm)] bg-signal px-4 text-sm font-medium text-signal-ink"
              >
                Start live
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Magnetic>
          </div>
        </header>

        <section className="relative flex min-h-[calc(100vh-5rem)] flex-col justify-end px-[var(--ds-page-x)] pb-16 pt-20 md:pb-24">
          <Reveal>
            <p className="ds-kicker mb-6">Realtime communication OS</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="ds-display max-w-[14ch] text-[var(--ds-text-hero)] text-bone">
              Three live systems.
              <span className="block text-signal">One pulse.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg text-bone-muted md:text-xl">
              Direct messages, open rooms, and private groups — streamed in
              realtime with an Awwwards-minded interface and a locked design
              system.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <Link
                href="/register"
                className="inline-flex h-[var(--ds-control-h-lg)] items-center gap-2 rounded-[var(--ds-radius-sm)] bg-bone px-5 text-base font-medium text-ink"
              >
                Create account
              </Link>
            </Magnetic>
            <Link
              href="/login"
              className="inline-flex h-[var(--ds-control-h-lg)] items-center rounded-[var(--ds-radius-sm)] border border-line-strong px-5 text-base text-bone"
            >
              Use demo login
            </Link>
          </Reveal>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[var(--ds-page-x)] top-[12%] -z-10 h-[52vh] overflow-hidden rounded-[var(--ds-radius-lg)] border border-line"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(200,245,66,0.22),transparent_42%),linear-gradient(160deg,#111114,#070708_60%)]" />
            <div className="absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]">
              <div className="absolute left-[8%] top-[18%] h-40 w-[42%] rounded-[var(--ds-radius-md)] border border-line bg-ink-elevated/80 p-4">
                <div className="mb-3 h-2 w-16 rounded-full bg-signal/70" />
                <div className="space-y-2">
                  <div className="h-2 w-[78%] rounded-full bg-bone/20" />
                  <div className="h-2 w-[54%] rounded-full bg-bone/15" />
                </div>
              </div>
              <div className="absolute bottom-[18%] right-[10%] h-36 w-[38%] rounded-[var(--ds-radius-md)] border border-signal/30 bg-signal/10 p-4">
                <div className="mb-3 h-2 w-20 rounded-full bg-signal" />
                <div className="space-y-2">
                  <div className="h-2 w-[70%] rounded-full bg-signal/40" />
                  <div className="h-2 w-[48%] rounded-full bg-signal/25" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-line px-[var(--ds-page-x)] py-20 md:py-28">
          <Reveal>
            <p className="ds-kicker mb-4">Systems</p>
            <h2 className="ds-display max-w-3xl text-4xl md:text-6xl">
              Built as three coherent chat modes, not three disconnected apps.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {systems.map((system, index) => (
              <Reveal key={system.title} delay={0.08 * index}>
                <article className="border-t border-line pt-6">
                  <p className="font-mono text-xs text-signal">{system.index}</p>
                  <h3 className="mt-3 font-display text-3xl tracking-tight">
                    {system.title}
                  </h3>
                  <p className="mt-3 text-bone-muted">{system.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-t border-line px-[var(--ds-page-x)] py-20 md:py-28">
          <Reveal>
            <p className="ds-kicker mb-4">Stack</p>
            <h2 className="ds-display max-w-3xl text-4xl md:text-5xl">
              Next.js · Drizzle · SQLite · Better Auth · SSE realtime
            </h2>
            <p className="mt-5 max-w-2xl text-bone-muted">
              No Docker required. File-based SQLite keeps local setup instant,
              while Server-Sent Events deliver messages the moment they land.
            </p>
          </Reveal>
        </section>

        <footer className="flex flex-col gap-4 border-t border-line px-[var(--ds-page-x)] py-8 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>Pulse — resume-ready live chat.</p>
          <p className="font-mono text-xs uppercase tracking-[0.14em]">
            Design system locked in /design-system
          </p>
        </footer>
      </div>
    </main>
  );
}
