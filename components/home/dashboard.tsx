"use client";

import { DashboardHeader } from "../dashboard/header";
import { TrainingSession } from "../study/training-session";
import { ArticleGrid } from "./article-grid";

export function Dashboard() {
  return (
    <div className="space-y-10">
      <DashboardHeader />

      <TrainingSession />

      <ArticleGrid />
    </div>
  );
}