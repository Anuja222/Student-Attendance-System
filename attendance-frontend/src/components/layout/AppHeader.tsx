"use client";

import { LogoIcon } from "@/icons";
import { useTheme } from "@/context";
import { useAppDispatch, useAppSelector, toggleSidebar } from "@/redux";
import { Button } from "@/components/ui";

export function AppHeader() {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((state) => state.app.sidebarOpen);

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_90%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--panel)] text-[var(--accent)] shadow-sm">
            <LogoIcon className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">Attendance</p>
            <h1 className="text-lg font-semibold">Admin workspace</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => dispatch(toggleSidebar())}>
            {sidebarOpen ? "Hide menu" : "Show menu"}
          </Button>
          <Button variant="ghost" onClick={toggleTheme}>
            {theme === "light" ? "Dark mode" : "Light mode"}
          </Button>
        </div>
      </div>
    </header>
  );
}