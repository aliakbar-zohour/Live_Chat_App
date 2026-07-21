import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-[var(--ds-control-h)] w-full rounded-2xl border border-transparent bg-ink-elevated px-4 text-bone outline-none placeholder:text-mist/70",
        className,
      )}
      {...props}
    />
  );
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-24 w-full resize-y rounded-2xl border border-transparent bg-ink-elevated px-4 py-3 text-bone outline-none placeholder:text-mist/70",
        className,
      )}
      {...props}
    />
  );
});
