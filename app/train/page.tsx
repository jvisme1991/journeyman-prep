import { AppShell } from "@/components/layout/app-shell";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { TrainingSession } from "@/components/study/training-session";

export default function TrainPage() {
  return (
    <>
      <AppShell>
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold">
              Practice
            </h1>

            <p className="mt-2 text-slate-400">
              Test your knowledge with randomized NEC questions.
            </p>
          </div>

          <TrainingSession />
        </div>
      </AppShell>

      <BottomNav />
    </>
  );
}