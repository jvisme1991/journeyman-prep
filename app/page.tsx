import { AppShell } from "@/components/layout/app-shell";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { DashboardHeader } from "@/components/dashboard/header";
import { TrainingSession } from "@/components/study/training-session";

export default function HomePage() {
  return (
    <>
      <AppShell>
        <DashboardHeader />
        <TrainingSession />
      </AppShell>

      <BottomNav />
    </>
  );
}