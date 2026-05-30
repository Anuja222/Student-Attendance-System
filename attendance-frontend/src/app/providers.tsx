"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "@/context";
import { ReduxProvider } from "@/redux";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ReduxProvider>
  );
}