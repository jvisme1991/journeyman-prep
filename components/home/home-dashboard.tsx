"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getDailyGoalProgress } from "@/lib/progress-stats";
import { StorageService } from "@/services/storage-service";
import type { ProgressRecord } from "@/types/progress";

import { DashboardHeader } from "../dashboard/header";
import { ContinuePractice } from "./continue-practice";
import { TodaysGoal } from "./todays-goal";

export function HomeDashboard() {
  const [progress, setProgress] = useState<ProgressRecord | null>(null);

  // One-time client-only hydration read: localStorage isn't available on
  // the server, so progress is loaded after mount rather than on first
  // render to avoid a server/client markup mismatch.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(StorageService.load());
  }, []);

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

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Study
        </h2>

        <Link
          href="/learn"
          className="block rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
        >
          <h3 className="text-xl font-semibold">
            Study by NEC Article
          </h3>

          <p className="mt-2 text-slate-400">
            Learn one NEC article at a time with targeted practice questions.
          </p>

          <div className="mt-5 text-blue-400 font-semibold">
            Open →
          </div>
        </Link>

        <Link
          href="/train"
          className="block rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
        >
          <h3 className="text-xl font-semibold">
            Practice Session
          </h3>

          <p className="mt-2 text-slate-400">
            Continue answering practice questions and improve your accuracy.
          </p>

          <div className="mt-5 text-blue-400 font-semibold">
            Resume →
          </div>
        </Link>

        <Link
          href="/stats"
          className="block rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
        >
          <h3 className="text-xl font-semibold">
            Statistics
          </h3>

          <p className="mt-2 text-slate-400">
            Review your performance, accuracy, and weakest NEC articles.
          </p>

          <div className="mt-5 text-blue-400 font-semibold">
            View →
          </div>
        </Link>
      </section>
    </div>
  );
}
