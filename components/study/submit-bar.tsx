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
        rounded-2xl
        bg-blue-600
        py-4
        text-lg
        font-semibold
        text-white
        transition
        hover:bg-blue-700
        disabled:cursor-not-allowed
        disabled:opacity-40
      "
    >
      Submit Answer
    </button>
  );
}