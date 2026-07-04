"use client";

import { useEffect, useState } from "react";
import { ListChecks, Percent, Target } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { getDashboardStats } from "@/lib/progress-stats";
import { ProgressService } from "@/services/progress-service";
import type { ProgressRecord } from "@/types/progress";

import { SettingRow } from "./setting-row";

export function ProfileProgress() {
  const [progress, setProgress] = useState<ProgressRecord | null>(null);
  const [draft, setDraft] = useState("");
  const [saved, setSaved] = useState(false);
  const { user, migrationStatus } = useAuth();

  // Client-only load; see home-dashboard.tsx for why this can't be
  // computed during the initial render, and why it depends on auth state.
  useEffect(() => {
    ProgressService.load().then((loaded) => {
      setProgress(loaded);
      setDraft(String(loaded.dailyGoal));
    });
  }, [user, migrationStatus]);

  if (!progress) {
    return null;
  }

  const stats = getDashboardStats(progress);

  async function handleSave() {
    const parsed = Number(draft);

    if (!Number.isFinite(parsed) || parsed <= 0) {
      return;
    }

    const updated = await ProgressService.setDailyGoal(parsed);

    setProgress(updated);
    setDraft(String(updated.dailyGoal));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <>
      <SettingRow icon={Target} label="Daily Goal">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="w-16 rounded-lg border border-border bg-background px-2 py-1 text-right font-semibold text-foreground focus:border-accent focus:outline-none"
          />

          <button
            onClick={handleSave}
            className="rounded-lg bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90"
          >
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </SettingRow>

      <SettingRow icon={ListChecks} label="Total Answered" value={String(stats.questionsAnswered)} />

      <SettingRow icon={Percent} label="Accuracy" value={`${stats.accuracy}%`} />
    </>
  );
}
