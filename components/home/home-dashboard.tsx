"use client";

import Link from "next/link";

import { DashboardHeader } from "../dashboard/header";
import { ContinuePractice } from "./continue-practice";
import { TodaysGoal } from "./todays-goal";

export function HomeDashboard() {
  return (
    <div className="space-y-8">
      <DashboardHeader />

      <TodaysGoal completed={8} goal={25} />

      <ContinuePractice current={1} total={25} />

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