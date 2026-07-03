import { AppShell } from "@/components/layout/app-shell";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { ArticleGrid } from "@/components/home/article-grid";

export default function LearnPage() {
  return (
    <>
      <AppShell>
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Learn
            </h1>

            <p className="mt-2 text-muted-foreground">
              Choose an NEC article to study.
            </p>
          </div>

          <ArticleGrid />
        </div>
      </AppShell>

      <BottomNav />
    </>
  );
}