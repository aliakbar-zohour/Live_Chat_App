"use client";

import { LoginForm } from "@/components/auth/auth-forms";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { LocaleLink } from "@/components/i18n/locale-link";
import { useDictionary } from "@/components/i18n/locale-provider";

export default function LoginPage() {
  const t = useDictionary();

  return (
    <main className="ds-atmosphere relative flex min-h-screen items-center justify-center px-[var(--ds-page-x)] py-16">
      <div className="absolute inset-x-0 top-0 flex justify-end px-[var(--ds-page-x)] py-6">
        <LanguageSwitcher compact />
      </div>
      <div className="relative z-[2] w-full max-w-sm">
        <LocaleLink href="/" className="mb-12 inline-flex items-center gap-3">
          <span className="ds-live-dot" />
          <span className="text-sm font-medium tracking-[0.08em]">Pulse</span>
        </LocaleLink>
        <p className="ds-kicker mb-4">{t.auth.access}</p>
        <h1 className="ds-display mb-10 text-[clamp(2.4rem,1.5rem+2vw,3.25rem)] text-bone">
          {t.auth.loginTitle}
        </h1>
        <LoginForm />
        <p className="mt-10 text-xs tracking-[0.04em] text-mist">
          {t.auth.demoHint}
        </p>
      </div>
    </main>
  );
}
