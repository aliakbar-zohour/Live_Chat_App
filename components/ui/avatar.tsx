import { cn, initials } from "@/lib/utils";

export function Avatar({
  name,
  image,
  size = "md",
  className,
}: {
  name: string;
  image?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dim =
    size === "sm" ? "h-8 w-8 text-[10px]" : size === "lg" ? "h-12 w-12 text-sm" : "h-10 w-10 text-xs";

  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name}
        className={cn(
          "rounded-[var(--ds-radius-sm)] object-cover",
          dim,
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--ds-radius-sm)] bg-ink-soft font-display font-semibold text-signal",
        dim,
        className,
      )}
      aria-hidden
    >
      {initials(name)}
    </div>
  );
}
