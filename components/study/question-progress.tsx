interface QuestionProgressProps {
  current: number;
  total: number;
}

export function QuestionProgress({
  current,
  total,
}: QuestionProgressProps) {
  const percent = (current / total) * 100;

  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Practice Session
          </p>

          <h3 className="mt-1 text-lg font-semibold">
            Question {current} of {total}
          </h3>
        </div>

        <div className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">
          {Math.round(percent)}%
        </div>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>
    </div>
  );
}