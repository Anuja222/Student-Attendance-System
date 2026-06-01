"use client";

import { useEffect } from "react";

// health and users hooks removed per request
import { Badge, Button, Card } from "@/components/ui";
import { useToggle } from "@/hooks";
import { useAppDispatch, useAppSelector, setActiveSection } from "@/redux";

import { MetricCard } from "./MetricCard";

export function DashboardPage() {
  const { value: showDetails, toggle: toggleDetails } = useToggle(true);
  const dispatch = useAppDispatch();
  const activeSection = useAppSelector((state) => state.app.activeSection);
  const sidebarOpen = useAppSelector((state) => state.app.sidebarOpen);

  // removed health and users state

  useEffect(() => {
    dispatch(setActiveSection("Dashboard"));
  }, [dispatch]);

  const users: any[] = [];

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <Badge>slisr-app-admin scaffold</Badge>
          <h2 className="text-4xl font-semibold tracking-tight lg:text-5xl">
            A structured Next.js frontend ready for real features.
          </h2>
          <p className="max-w-xl text-base leading-7 text-[var(--muted)]">
            This scaffold includes API hooks, Redux state, shared context, icons, utilities,
            and feature-based components so you can build out the admin experience quickly.
          </p>
        </div>

        <Button variant="secondary" onClick={toggleDetails}>
          {showDetails ? "Hide details" : "Show details"}
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <MetricCard
          label="Active section"
          value={activeSection}
          description="Redux state is wired and available to the UI."
        />
        <MetricCard
          label="Sidebar"
          value={sidebarOpen ? "Open" : "Closed"}
          description="The header toggle updates the shared layout state."
        />
        <MetricCard
          label="Features"
          value={"—"}
          description="Replace with real metrics when available."
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div />

        <Card className="space-y-4">
          <div>
            <Badge>Workflow</Badge>
            <h2 className="mt-3 text-xl font-semibold">What is wired</h2>
          </div>

          <ul className="space-y-3 text-sm leading-6 text-[var(--muted)]">
            <li>• `src/app` App Router layout and page</li>
            <li>• `src/api` client, types, hooks, and local API routes</li>
            <li>• `src/context` theme provider</li>
            <li>• `src/redux` store, hooks, and slice</li>
            <li>• `src/components` feature folders and UI primitives</li>
          </ul>

          {showDetails ? (
            <p className="rounded-2xl border border-[var(--border)] bg-[var(--panel-strong)] p-4 text-sm leading-6 text-[var(--muted)]">
              The project now has a buildable structure with barrel exports and minimal example
              screens, so you can replace the seed data and route handlers with your real API
              layer when ready.
            </p>
          ) : null}
        </Card>
      </div>

      {/* Users list removed */}
    </section>
  );
}