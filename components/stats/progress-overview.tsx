"use client";

import { useEffect, useState } from "react";

import { ReadinessCard } from "@/components/dashboard/readiness-card";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { getDashboardStats, getReadinessData } from "@/lib/progress-stats";
import { StorageService } from "@/services/storage-service";
import type { ProgressRecord } from "@/types/progress";

export function ProgressOverview() {
  const [progress, setProgress] = useState<ProgressRecord | null>(null);

  // One-time client-only hydration read; see home-dashboard.tsx for why
  // this can't be computed during the initial render.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(StorageService.load());
  }, []);

  if (!progress) {
    return null;
  }

  if (progress.history.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-bold">Your Progress</h2>

        <p className="mt-2 text-slate-400">
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
    </div>
  );
}
