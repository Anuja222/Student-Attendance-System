import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/utils";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-[var(--accent)] text-[var(--accent-contrast)] shadow-sm",
    secondary: "bg-[var(--panel-strong)] text-[var(--foreground)]",
    ghost: "bg-transparent text-[var(--foreground)]",
  };

  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}