import type { PropsWithChildren } from "react";

import { cn } from "@/utils";

export function Badge({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]",
        className,
      )}
    >
      {children}
    </span>
  );
}