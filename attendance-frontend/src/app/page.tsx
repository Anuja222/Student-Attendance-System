import { AppShell } from "@/components/layout";
import { DashboardPage } from "@/components/features/dashboard";

export default function HomePage() {
  return (
    <AppShell>
      <DashboardPage />
    </AppShell>
  );
}