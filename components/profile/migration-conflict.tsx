"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

export function MigrationConflict() {
  const { migrationStatus, conflictInfo, resolveMigrationConflict } = useAuth();
  const [resolving, setResolving] = useState<"cloud" | "local" | null>(null);

  if (migrationStatus !== "conflict" || !conflictInfo) {
    return null;
  }

  async function choose(option: "cloud" | "local") {
    setResolving(option);
    await resolveMigrationConflict(option);
    setResolving(null);
  }

  return (
    <div className="rounded-card border border-danger/40 bg-danger/10 p-5 shadow-lg shadow-black/20">
      <div className="flex items-center gap-2 text-danger">
        <AlertTriangle size={18} />
        <h3 className="font-semibold">Progress conflict</h3>
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        You have <strong className="text-foreground">{conflictInfo.localCount}</strong> answered
        question{conflictInfo.localCount === 1 ? "" : "s"} saved on this device that haven&apos;t
        synced, and <strong className="text-foreground">{conflictInfo.cloudCount}</strong> already
        saved to your account. These don&apos;t match, so pick which one to keep.
      </p>

      <div className="mt-4 flex flex-col gap-2">
        <button
          onClick={() => choose("cloud")}
          disabled={resolving !== null}
          className="rounded-card bg-accent py-3 font-semibold text-accent-foreground transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {resolving === "cloud" ? "Keeping cloud data…" : "Keep Cloud Data"}
        </button>

        <button
          onClick={() => choose("local")}
          disabled={resolving !== null}
          className="rounded-card border border-border bg-card py-3 font-semibold text-foreground transition hover:border-danger/50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {resolving === "local" ? "Replacing cloud data…" : "Keep Local Data (replaces cloud data)"}
        </button>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Your local data on this device won&apos;t be deleted either way — it stays in this browser.
      </p>
    </div>
  );
}
