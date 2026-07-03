import { AppShell } from "@/components/layout/app-shell";
import { BottomNav } from "@/components/navigation/bottom-nav";

import { ArticleGrid } from "@/components/home/article-grid";

export default function LearnPage() {
  return (
    <>
      <AppShell>
        <ArticleGrid />
      </AppShell>

      <BottomNav />
    </>
  );
}