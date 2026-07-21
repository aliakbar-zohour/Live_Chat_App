import { cn } from "@/lib/utils";

export function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--ds-radius-md)] border border-line bg-ink-elevated/90 backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="ds-kicker">{label}</span>
      {children}
      {hint ? <span className="text-sm text-mist">{hint}</span> : null}
    </label>
  );
}
