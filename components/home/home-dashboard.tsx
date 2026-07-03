"use client";

import { DashboardHeader } from "../dashboard/header";
import { ContinuePractice } from "./continue-practice";
import { TodaysGoal } from "./todays-goal.tsx";

export function HomeDashboard() {
  return (
    <div className="space-y-8">
      <DashboardHeader />

      <TodaysGoal
        completed={8}
        goal={25}
      />

      <ContinuePractice
        current={1}
        total={25}
      />

      <section className="grid grid-cols-2 gap-4">
        <button className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500">
          <div className="text-2xl">📚</div>
          <div className="mt-3 font-semibold">
            Study by Article
          </div>
        </button>

        <button className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500">
          <div className="text-2xl">📝</div>
          <div className="mt-3 font-semibold">
            Timed Exam
          </div>
        </button>

        <button className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500">
          <div className="text-2xl">⭐</div>
          <div className="mt-3 font-semibold">
            Missed Questions
          </div>
        </button>

        <button className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500">
          <div className="text-2xl">🧠</div>
          <div className="mt-3 font-semibold">
            Flashcards
          </div>
        </button>
      </section>
    </div>
  );
}