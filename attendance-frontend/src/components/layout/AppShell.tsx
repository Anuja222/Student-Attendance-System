import type { PropsWithChildren } from "react";

import { AppHeader } from "./AppHeader";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-10">{children}</main>
    </div>
  );
}