import type { PropsWithChildren } from "react";

import { cn } from "@/utils";

export function Card({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]",
        className,
      )}
    >
      {children}
    </div>
  );
}