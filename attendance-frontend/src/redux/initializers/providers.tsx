"use client";

import type { ReactNode } from "react";

import { ReduxProvider } from "../provider";
import { AuthInitializer } from "./AuthInitializer";

export function AppReduxProviders({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <AuthInitializer />
      {children}
    </ReduxProvider>
  );
}
