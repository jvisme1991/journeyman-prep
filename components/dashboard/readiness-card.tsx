import { Trophy } from "lucide-react";
import { ReadinessData } from "@/types/dashboard";

interface Props {
  data: ReadinessData;
}

export function ReadinessCard({ data }: Props) {
  return (
    <section className="mb-6 rounded-card border border-border bg-card p-6 shadow-lg shadow-black/20">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Exam Readiness</p>

          <div className="mt-2 flex items-end gap-2">
            <span className="text-6xl font-black text-foreground">
              {data.readiness}%
            </span>

            <span className="pb-2 text-muted-foreground">
              Ready
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-accent/10 p-3">
          <Trophy className="text-accent" size={24} />
        </div>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${data.readiness}%` }}
        />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {data.nextLesson}
      </p>
    </section>
  );
}