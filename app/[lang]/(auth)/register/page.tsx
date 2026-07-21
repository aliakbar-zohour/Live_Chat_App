"use client";

import { RegisterForm } from "@/components/auth/auth-forms";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { LocaleLink } from "@/components/i18n/locale-link";
import { useDictionary } from "@/components/i18n/locale-provider";

export default function RegisterPage() {
  const t = useDictionary();

  return (
    <main className="ds-grain ds-grid-bg relative flex min-h-screen items-center justify-center px-[var(--ds-page-x)] py-16">
      <div className="absolute inset-x-0 top-0 flex justify-end px-[var(--ds-page-x)] py-5">
        <LanguageSwitcher compact />
      </div>
      <div className="relative z-[2] w-full max-w-md">
        <LocaleLink href="/" className="mb-10 inline-flex items-center gap-2">
          <span className="ds-live-dot" />
          <span className="font-display text-2xl tracking-tight">Pulse</span>
        </LocaleLink>
        <p className="ds-kicker mb-3">{t.auth.join}</p>
        <h1 className="ds-display mb-8 text-4xl md:text-5xl">
          {t.auth.registerTitle}
        </h1>
        <RegisterForm />
        <p className="mt-8 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-mist">
          {t.auth.handlesUnique}
        </p>
      </div>
    </main>
  );
}
