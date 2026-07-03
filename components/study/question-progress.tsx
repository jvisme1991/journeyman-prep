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
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Practice Session
          </p>

          <h3 className="mt-1 text-lg font-semibold text-foreground">
            Question {current} of {total}
          </h3>
        </div>

        <div className="rounded-full border border-border px-3 py-1 text-sm font-semibold text-accent">
          {Math.round(percent)}%
        </div>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>
    </div>
  );
}