import { AppShell } from "@/components/layout/app-shell";
import { BottomNav } from "@/components/navigation/bottom-nav";

import { TrainingSession } from "@/components/study/training-session";

export default function TrainPage() {
  return (
    <>
      <AppShell>
        <TrainingSession />
      </AppShell>

      <BottomNav />
    </>
  );
}