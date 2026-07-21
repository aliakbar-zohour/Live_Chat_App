import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "mist",
  className,
}: {
  children: React.ReactNode;
  tone?: "mist" | "signal" | "bone";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--ds-radius-xs)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em]",
        tone === "signal" && "bg-signal/15 text-signal",
        tone === "bone" && "bg-bone/10 text-bone",
        tone === "mist" && "bg-white/5 text-mist",
        className,
      )}
    >
      {children}
    </span>
  );
}
