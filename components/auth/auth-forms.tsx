"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FadeIn } from "@/components/motion/reveal";
import { LocaleLink } from "@/components/i18n/locale-link";
import { useDictionary, useLocale } from "@/components/i18n/locale-provider";
import { localizedPath } from "@/i18n/path";

export function LoginForm() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = useDictionary();
  const [email, setEmail] = useState("alex@pulse.chat");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const { error: authError } = await authClient.signIn.email({
      email,
      password,
    });
    setPending(false);
    if (authError) {
      setError(authError.message ?? "Unable to sign in");
      return;
    }
    router.push(localizedPath(locale, "/chat"));
    router.refresh();
  }

  return (
    <FadeIn>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label={t.auth.email}>
          <Input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Field>
        <Field label={t.auth.password}>
          <Input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Field>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <Button type="submit" variant="signal" className="w-full" disabled={pending}>
          {pending ? t.auth.entering : t.auth.enterPulse}
        </Button>
        <p className="text-sm text-mist">
          {t.auth.newHere}{" "}
          <LocaleLink
            href="/register"
            className="text-signal underline-offset-4 hover:underline"
          >
            {t.auth.createLink}
          </LocaleLink>
        </p>
      </form>
    </FadeIn>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = useDictionary();
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const { error: authError } = await authClient.signUp.email({
      name,
      email,
      password,
      handle: handle.replace(/^@/, "").toLowerCase(),
    });
    setPending(false);
    if (authError) {
      setError(authError.message ?? "Unable to register");
      return;
    }
    router.push(localizedPath(locale, "/chat"));
    router.refresh();
  }

  return (
    <FadeIn>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label={t.auth.displayName}>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </Field>
        <Field label={t.auth.handle} hint={t.auth.handleHint}>
          <Input
            value={handle}
            onChange={(event) => setHandle(event.target.value)}
            placeholder="yourname"
            required
          />
        </Field>
        <Field label={t.auth.email}>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Field>
        <Field label={t.auth.password}>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
          />
        </Field>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <Button type="submit" variant="signal" className="w-full" disabled={pending}>
          {pending ? t.auth.creating : t.auth.createAccount}
        </Button>
        <p className="text-sm text-mist">
          {t.auth.alreadyLive}{" "}
          <LocaleLink
            href="/login"
            className="text-signal underline-offset-4 hover:underline"
          >
            {t.auth.signInLink}
          </LocaleLink>
        </p>
      </form>
    </FadeIn>
  );
}
