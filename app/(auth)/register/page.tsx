import Link from "next/link";
import { RegisterForm } from "@/components/auth/auth-forms";

export default function RegisterPage() {
  return (
    <main className="ds-grain ds-grid-bg relative flex min-h-screen items-center justify-center px-[var(--ds-page-x)] py-16">
      <div className="relative z-[2] w-full max-w-md">
        <Link href="/" className="mb-10 inline-flex items-center gap-2">
          <span className="ds-live-dot" />
          <span className="font-display text-2xl tracking-tight">Pulse</span>
        </Link>
        <p className="ds-kicker mb-3">Join</p>
        <h1 className="ds-display mb-8 text-4xl md:text-5xl">
          Claim your handle.
        </h1>
        <RegisterForm />
        <p className="mt-8 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-mist">
          Handles are unique across Pulse
        </p>
      </div>
    </main>
  );
}
