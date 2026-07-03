"use client";

interface SubmitBarProps {
  disabled: boolean;
  onSubmit: () => void;
}

export function SubmitBar({
  disabled,
  onSubmit,
}: SubmitBarProps) {
  return (
    <button
      disabled={disabled}
      onClick={onSubmit}
      className="
        w-full
        rounded-card
        bg-accent
        py-4
        text-lg
        font-semibold
        text-accent-foreground
        transition
        hover:bg-accent/90
        disabled:cursor-not-allowed
        disabled:opacity-40
      "
    >
      Submit Answer
    </button>
  );
}