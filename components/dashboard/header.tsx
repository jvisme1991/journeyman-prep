import { Zap } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-2 text-accent">
        <Zap size={16} strokeWidth={2.5} />

        <p className="text-sm font-semibold tracking-wide uppercase">
          Journeyman Prep
        </p>
      </div>

      <h1 className="mt-2 text-4xl font-black leading-tight tracking-tight text-foreground">
        Master the NEC.
        <br />
        Pass the Exam.
      </h1>

      <p className="mt-3 text-muted-foreground">
        Build speed, confidence, and code knowledge every day.
      </p>
    </header>
  );
}