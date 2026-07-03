"use client";

import { useEffect, useState } from "react";

import { getDashboardStats } from "@/lib/progress-stats";
import { StorageService } from "@/services/storage-service";
import type { ProgressRecord } from "@/types/progress";

export function ProfileProgress() {
  const [progress, setProgress] = useState<ProgressRecord | null>(null);
  const [draft, setDraft] = useState("");
  const [saved, setSaved] = useState(false);

  // One-time client-only hydration read; see home-dashboard.tsx for why
  // this can't be computed during the initial render.
  useEffect(() => {
    const loaded = StorageService.load();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(loaded);
    setDraft(String(loaded.dailyGoal));
  }, []);

  if (!progress) {
    return null;
  }

  const stats = getDashboardStats(progress);

  function handleSave() {
    const parsed = Number(draft);

    if (!Number.isFinite(parsed) || parsed <= 0) {
      return;
    }

    const updated = StorageService.setDailyGoal(parsed);

    setProgress(updated);
    setDraft(String(updated.dailyGoal));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <>
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <span className="text-slate-400">Daily Goal</span>

        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="w-16 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-right font-semibold text-slate-100 focus:border-blue-500 focus:outline-none"
          />

          <button
            onClick={handleSave}
            className="rounded-lg bg-blue-600 px-3 py-1 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <span className="text-slate-400">Total Answered</span>

        <span className="font-semibold">{stats.questionsAnswered}</span>
      </div>

      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <span className="text-slate-400">Accuracy</span>

        <span className="font-semibold">{stats.accuracy}%</span>
      </div>
    </>
  );
}
