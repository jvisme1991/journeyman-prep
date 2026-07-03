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
  let classes =
    "border-slate-700 hover:border-slate-500 hover:bg-slate-800";

  if (selected) {
    classes = "border-blue-500 bg-blue-500/15";
  }

  if (correct) {
    classes = "border-green-500 bg-green-500/20";
  }

  if (incorrect) {
    classes = "border-red-500 bg-red-500/20";
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-200 ${classes}`}
    >
      <div
        className={`
          flex h-10 w-10 items-center justify-center rounded-full font-bold
          ${
            correct
              ? "bg-green-600 text-white"
              : incorrect
              ? "bg-red-600 text-white"
              : selected
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-slate-300"
          }
        `}
      >
        {letter}
      </div>

      <span className="flex-1 text-base">
        {text}
      </span>
    </button>
  );
}