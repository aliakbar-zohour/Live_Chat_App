import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "signal" | "ghost" | "line";

const styles: Record<Variant, string> = {
  primary:
    "bg-bone text-ink hover:bg-white disabled:bg-bone-muted disabled:text-ink/50",
  signal:
    "bg-signal text-signal-ink hover:brightness-110 disabled:opacity-50",
  ghost:
    "bg-transparent text-bone hover:bg-ink-soft disabled:opacity-40",
  line:
    "bg-transparent text-bone border border-line-strong hover:border-bone/50 disabled:opacity-40",
};

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: "md" | "lg" | "sm";
  }
>(function Button(
  { className, variant = "primary", size = "md", type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[var(--ds-radius-sm)] font-medium transition-all duration-[var(--ds-duration-fast)] ease-[var(--ds-ease-out)] disabled:cursor-not-allowed",
        size === "sm" && "h-9 px-3 text-sm",
        size === "md" && "h-[var(--ds-control-h)] px-4 text-sm",
        size === "lg" && "h-[var(--ds-control-h-lg)] px-5 text-base",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
});
