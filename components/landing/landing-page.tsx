"use client";

import { Reveal } from "@/components/motion/reveal";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { LocaleLink } from "@/components/i18n/locale-link";
import { useDictionary } from "@/components/i18n/locale-provider";

export function LandingPage() {
  const t = useDictionary();

  const systems = [
    { title: t.landing.directTitle, copy: t.landing.directCopy },
    { title: t.landing.roomsTitle, copy: t.landing.roomsCopy },
    { title: t.landing.groupsTitle, copy: t.landing.groupsCopy },
  ];

  return (
    <main className="ds-atmosphere relative min-h-screen overflow-x-hidden">
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-[var(--ds-page-x)] py-6">
        <LocaleLink href="/" className="flex items-center gap-3">
          <span className="ds-live-dot" />
          <span className="text-sm font-medium tracking-[0.08em]">Pulse</span>
        </LocaleLink>

        <div className="flex items-center gap-4 sm:gap-6">
          <LanguageSwitcher compact />
          <LocaleLink
            href="/login"
            className="hidden text-sm text-mist transition-colors hover:text-bone sm:inline"
          >
            {t.nav.signIn}
          </LocaleLink>
          <LocaleLink
            href="/register"
            className="ds-link-primary inline-flex h-10 items-center rounded-full px-5 text-sm font-medium"
          >
            {t.nav.startLive}
          </LocaleLink>
        </div>
      </header>

      <section className="relative flex min-h-dvh flex-col justify-end px-[var(--ds-page-x)] pb-20 pt-32 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute inset-x-[10%] top-[18%] h-[42vh] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(243,241,236,0.09),transparent_68%)] blur-2xl" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        </div>

        <Reveal>
          <p className="ds-kicker mb-8">{t.landing.kicker}</p>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="ds-display max-w-[11ch] text-[var(--ds-text-hero)] text-bone">
            {t.landing.heroTitle}
            <span className="mt-1 block text-bone-muted">
              {t.landing.heroAccent}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-8 max-w-md text-[var(--ds-text-lg)] font-light text-mist">
            {t.landing.heroCopy}
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mt-12 flex flex-wrap items-center gap-4">
          <LocaleLink
            href="/register"
            className="ds-link-primary inline-flex h-12 items-center rounded-full px-7 text-sm font-medium"
          >
            {t.landing.createAccount}
          </LocaleLink>
          <LocaleLink
            href="/login"
            className="inline-flex h-12 items-center px-2 text-sm text-mist transition-colors hover:text-bone"
          >
            {t.landing.demoLogin}
          </LocaleLink>
        </Reveal>
      </section>

      <section
        id="systems"
        className="border-t border-line px-[var(--ds-page-x)] py-28 md:py-36"
      >
        <Reveal>
          <p className="ds-kicker mb-6">{t.landing.systemsKicker}</p>
          <h2 className="ds-display max-w-2xl text-[clamp(2.2rem,1.2rem+2.8vw,3.75rem)] text-bone">
            {t.landing.systemsTitle}
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-16 md:grid-cols-3 md:gap-12">
          {systems.map((system, index) => (
            <Reveal key={system.title} delay={0.06 * index}>
              <article>
                <p className="mb-5 text-xs tracking-[0.18em] text-mist">
                  0{index + 1}
                </p>
                <h3 className="font-display text-3xl text-bone md:text-4xl">
                  {system.title}
                </h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist md:text-[0.95rem]">
                  {system.copy}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line px-[var(--ds-page-x)] py-28 md:py-36">
        <Reveal>
          <h2 className="ds-display max-w-xl text-[clamp(2.4rem,1.3rem+3vw,4.25rem)] text-bone">
            {t.landing.ctaTitle}
          </h2>
          <p className="mt-6 max-w-sm text-mist">{t.landing.ctaCopy}</p>
          <LocaleLink
            href="/register"
            className="ds-link-primary mt-10 inline-flex h-12 items-center rounded-full px-7 text-sm font-medium"
          >
            {t.landing.getStarted}
          </LocaleLink>
        </Reveal>
      </section>

      <footer className="flex flex-col gap-4 border-t border-line px-[var(--ds-page-x)] py-8 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
        <span className="tracking-[0.08em]">Pulse</span>
        <span>{t.landing.footerTag}</span>
      </footer>
    </main>
  );
}
