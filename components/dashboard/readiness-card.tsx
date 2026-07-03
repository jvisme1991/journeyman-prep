import { Trophy } from "lucide-react";
import { ReadinessData } from "@/types/dashboard";

interface Props {
  data: ReadinessData;
}

export function ReadinessCard({ data }: Props) {
  return (
    <section className="mb-6 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">Exam Readiness</p>

          <div className="mt-2 flex items-end gap-2">
            <span className="text-6xl font-black">
              {data.readiness}%
            </span>

            <span className="pb-2 text-slate-500">
              Ready
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-amber-500/10 p-3">
          <Trophy className="text-amber-400" size={24} />
        </div>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-blue-500 transition-all"
          style={{ width: `${data.readiness}%` }}
        />
      </div>

      <p className="mt-4 text-sm text-slate-400">
        {data.nextLesson}
      </p>
    </section>
  );
}