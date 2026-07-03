import { AppShell } from "@/components/layout/app-shell";
import { BottomNav } from "@/components/navigation/bottom-nav";

export default function StatsPage() {
  return (
    <>
      <AppShell>
        <h1 className="text-3xl font-bold">
          Statistics
        </h1>

        <p className="mt-4 text-slate-400">
          Coming soon...
        </p>
      </AppShell>

      <BottomNav />
    </>
  );
}