"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BarChart3,
  BookOpen,
  GraduationCap,
  Home,
  User,
} from "lucide-react";

const items = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Learn",
    href: "/learn",
    icon: BookOpen,
  },
  {
    label: "Train",
    href: "/train",
    icon: GraduationCap,
  },
  {
    label: "Stats",
    href: "/stats",
    icon: BarChart3,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1 px-3 py-3">
        {items.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 rounded-card py-2 text-xs font-medium transition-all ${
                active
                  ? "bg-accent/15 text-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}