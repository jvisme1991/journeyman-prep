"use client";

interface AnswerButtonProps {
  letter: string;
  text: string;
  selected: boolean;
  correct?: boolean;
  incorrect?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function AnswerButton({
  letter,
  text,
  selected,
  correct = false,
  incorrect = false,
  disabled = false,
  onClick,
}: AnswerButtonProps) {
  let classes = "border-border hover:border-muted-foreground/50 hover:bg-card";

  if (selected) {
    classes = "border-accent bg-accent/15";
  }

  if (correct) {
    classes = "border-success bg-success/15";
  }

  if (incorrect) {
    classes = "border-danger bg-danger/15";
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-card border bg-card p-5 text-left transition-all duration-200 ${classes}`}
    >
      <div
        className={`
          flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold
          ${
            correct
              ? "bg-success text-success-foreground"
              : incorrect
              ? "bg-danger text-danger-foreground"
              : selected
              ? "bg-accent text-accent-foreground"
              : "bg-border text-muted-foreground"
          }
        `}
      >
        {letter}
      </div>

      <span className="flex-1 text-base text-foreground">
        {text}
      </span>
    </button>
  );
}