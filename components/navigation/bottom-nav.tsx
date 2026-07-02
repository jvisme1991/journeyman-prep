"use client";

import {
  BarChart3,
  BookOpen,
  GraduationCap,
  Home,
  User,
} from "lucide-react";

const items = [
  { label: "Home", icon: Home, active: true },
  { label: "Learn", icon: BookOpen },
  { label: "Train", icon: GraduationCap },
  { label: "Stats", icon: BarChart3 },
  { label: "More", icon: User },
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1 px-3 py-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`flex flex-col items-center gap-1 rounded-xl py-2 text-xs font-medium transition-all ${
                item.active
                  ? "bg-blue-500/15 text-blue-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}