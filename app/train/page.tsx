import { AppShell } from "@/components/layout/app-shell";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { TrainingSession } from "@/components/study/training-session";

interface TrainPageProps {
  searchParams: Promise<{ article?: string }>;
}

export default async function TrainPage({ searchParams }: TrainPageProps) {
  const { article } = await searchParams;

  return (
    <>
      <AppShell>
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold">
              Practice
            </h1>

            <p className="mt-2 text-slate-400">
              {article
                ? `Practicing NEC Article ${article} questions.`
                : "Test your knowledge with randomized NEC questions."}
            </p>
          </div>

          <TrainingSession article={article} />
        </div>
      </AppShell>

      <BottomNav />
    </>
  );
}
