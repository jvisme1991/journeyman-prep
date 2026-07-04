"use client";

import { useEffect, useState } from "react";

import { ReadinessCard } from "@/components/dashboard/readiness-card";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { useAuth } from "@/hooks/useAuth";
import { getDashboardStats, getReadinessData } from "@/lib/progress-stats";
import { ProgressService } from "@/services/progress-service";
import type { ProgressRecord } from "@/types/progress";

import { AccuracyByArticleChart } from "./accuracy-by-article-chart";

export function ProgressOverview() {
  const [progress, setProgress] = useState<ProgressRecord | null>(null);
  const { user, migrationStatus } = useAuth();

  // Client-only load; see home-dashboard.tsx for why this can't be
  // computed during the initial render, and why it depends on auth state.
  useEffect(() => {
    ProgressService.load().then(setProgress);
  }, [user, migrationStatus]);

  if (!progress) {
    return null;
  }

  if (progress.history.length === 0) {
    return (
      <section className="rounded-card border border-border bg-card p-6 shadow-lg shadow-black/20">
        <h2 className="text-xl font-bold text-foreground">Your Progress</h2>

        <p className="mt-2 text-muted-foreground">
          Complete a practice session to see your accuracy, streak, and exam
          readiness here.
        </p>
      </section>
    );
  }

  const stats = getDashboardStats(progress);
  const readiness = getReadinessData(progress);

  return (
    <div>
      <ReadinessCard data={readiness} />
      <StatsGrid stats={stats} />
      <AccuracyByArticleChart history={progress.history} />
    </div>
  );
}
