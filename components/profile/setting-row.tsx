import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface SettingRowProps {
  icon: LucideIcon;
  label: string;
  value?: string;
  children?: ReactNode;
}

export function SettingRow({ icon: Icon, label, value, children }: SettingRowProps) {
  return (
    <div className="flex items-center gap-4 border-b border-border pb-4 last:border-b-0 last:pb-0">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Icon size={16} />
      </div>

      <span className="flex-1 text-sm text-muted-foreground">{label}</span>

      {value !== undefined ? (
        <span className="font-semibold text-foreground">{value}</span>
      ) : (
        children
      )}
    </div>
  );
}
