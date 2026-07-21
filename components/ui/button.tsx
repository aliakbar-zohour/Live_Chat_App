import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "signal" | "ghost" | "line";

const styles: Record<Variant, string> = {
  primary: "ds-btn ds-btn-primary",
  signal: "ds-btn ds-btn-signal",
  ghost: "ds-btn ds-btn-ghost",
  line: "ds-btn ds-btn-line",
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
