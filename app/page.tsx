import { AppShell } from "@/components/layout/app-shell";
import { BottomNav } from "@/components/navigation/bottom-nav";

export default function HomePage() {
  return (
    <>
      <AppShell>
        <h1 className="text-4xl font-bold">Journeyman Prep</h1>

        <p className="mt-2 text-slate-400">
          Master the NEC. Pass the Exam.
        </p>
      </AppShell>

      <BottomNav />
    </>
  );
}