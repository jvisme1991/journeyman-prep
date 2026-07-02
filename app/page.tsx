import { AppShell } from "@/components/layout/app-shell";
import { BottomNav } from "@/components/navigation/bottom-nav";

import { DashboardHeader } from "@/components/dashboard/header";
import { ReadinessCard } from "@/components/dashboard/readiness-card";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { TodaysGoal } from "@/components/dashboard/todays-goal";

export default function HomePage() {
  return (
    <>
      <AppShell>
        <DashboardHeader />

        <ReadinessCard
          data={{
            readiness: 0,
            nextLesson: "Start your first training session.",
          }}
        />

        <StatsGrid
          stats={{
            questionsAnswered: 0,
            accuracy: 0,
            streak: 0,
            weakestArticle: "—",
          }}
        />

        <TodaysGoal
          goal={{
            goal: 25,
            completed: 0,
          }}
        />
      </AppShell>

      <BottomNav />
    </>
  );
}