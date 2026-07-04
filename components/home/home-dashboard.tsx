"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BarChart3, BookOpen, ChevronRight, GraduationCap, type LucideIcon } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { getDailyGoalProgress } from "@/lib/progress-stats";
import { ProgressService } from "@/services/progress-service";
import type { ProgressRecord } from "@/types/progress";

import { DashboardHeader } from "../dashboard/header";
import { ContinuePractice } from "./continue-practice";
import { TodaysGoal } from "./todays-goal";

interface StudyLinkProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

function StudyLink({ href, icon: Icon, title, description }: StudyLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 rounded-card border border-border bg-card p-5 shadow-lg shadow-black/20 transition hover:border-accent/50"
    >
      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Icon size={20} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold text-foreground">
          {title}
        </h3>

        <p className="mt-0.5 truncate text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      <ChevronRight size={18} className="shrink-0 text-muted-foreground" />
    </Link>
  );
}

export function HomeDashboard() {
  const [progress, setProgress] = useState<ProgressRecord | null>(null);
  const { user, migrationStatus } = useAuth();

  // Client-only load: localStorage isn't available on the server, and
  // signed-in reads go to Supabase, so progress is loaded after mount
  // rather than on first render to avoid a server/client markup mismatch.
  // Re-runs when sign-in state or migration status changes so this
  // switches from local to cloud data (or back) live, without needing a
  // page refresh.
  useEffect(() => {
    ProgressService.load().then(setProgress);
  }, [user, migrationStatus]);

  const dailyGoal = progress
    ? getDailyGoalProgress(progress)
    : { goal: 25, completed: 0 };

  const activeSession = progress?.activeSession ?? null;

  return (
    <div className="space-y-8">
      <DashboardHeader />

      <TodaysGoal completed={dailyGoal.completed} goal={dailyGoal.goal} />

      <ContinuePractice
        hasSession={activeSession !== null}
        current={activeSession ? activeSession.currentIndex + 1 : 0}
        total={activeSession ? activeSession.questionIds.length : 0}
        href={
          activeSession?.article
            ? `/train?article=${activeSession.article}`
            : "/train"
        }
      />

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-foreground">
          Study
        </h2>

        <StudyLink
          href="/learn"
          icon={BookOpen}
          title="Study by NEC Article"
          description="Learn one NEC article at a time with targeted practice questions."
        />

        <StudyLink
          href="/train"
          icon={GraduationCap}
          title="Practice Session"
          description="Continue answering practice questions and improve your accuracy."
        />

        <StudyLink
          href="/stats"
          icon={BarChart3}
          title="Statistics"
          description="Review your performance, accuracy, and weakest NEC articles."
        />
      </section>
    </div>
  );
}
