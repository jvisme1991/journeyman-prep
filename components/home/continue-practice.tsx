"use client";

import Link from "next/link";
import { PlayCircle } from "lucide-react";

interface ContinuePracticeProps {
  hasSession: boolean;
  current: number;
  total: number;
  href: string;
}

export function ContinuePractice({
  hasSession,
  current,
  total,
  href,
}: ContinuePracticeProps) {
  const percent = total === 0 ? 0 : Math.round((current / total) * 100);

  return (
    <section className="rounded-card border border-border bg-card p-6 shadow-lg shadow-black/20">
      <div className="flex items-center gap-2 text-muted-foreground">
        <PlayCircle size={14} />

        <p className="text-xs font-semibold uppercase tracking-[0.3em]">
          Continue Practice
        </p>
      </div>

      <h2 className="mt-3 text-3xl font-bold text-foreground">
        {hasSession
          ? `Question ${current} of ${total}`
          : "No Session in Progress"}
      </h2>

      {!hasSession && (
        <p className="mt-2 text-sm text-muted-foreground">
          Start a practice session to track your progress here.
        </p>
      )}

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-accent"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>

      <Link
        href={href}
        className="mt-6 block w-full rounded-card bg-accent py-4 text-center text-lg font-semibold text-accent-foreground transition hover:bg-accent/90"
      >
        {hasSession ? "Resume Session →" : "Start Practice →"}
      </Link>
    </section>
  );
}
