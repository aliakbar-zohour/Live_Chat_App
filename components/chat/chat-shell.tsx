import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared calm sidebar shell for Direct / Rooms / Groups */
export function ChatSidebar({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col bg-ink-elevated/35 md:w-[19rem] md:shrink-0 lg:w-[21rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ChatIdle({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div className="hidden min-w-0 flex-1 items-center justify-center md:flex">
      <div className="max-w-sm px-8 text-center">
        <p className="mb-3 text-sm text-mist">{label}</p>
        <h1 className="ds-display text-3xl text-bone/90 md:text-4xl">
          {title}
        </h1>
      </div>
    </div>
  );
}
