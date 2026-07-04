import { BookOpen, GraduationCap, Tag } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { AuthSection } from "@/components/profile/auth-section";
import { MigrationConflict } from "@/components/profile/migration-conflict";
import { ProfileProgress } from "@/components/profile/profile-progress";
import { SettingRow } from "@/components/profile/setting-row";
import { questionRepository } from "@/services/question-repository";

export default function ProfilePage() {
  const questionBankSize = questionRepository.getAll().length;

  return (
    <>
      <AppShell>
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Profile</h1>

            <p className="mt-2 text-muted-foreground">
              Study preferences.
            </p>
          </div>

          <AuthSection />

          <MigrationConflict />

          <div className="rounded-card border border-border bg-card p-6 shadow-lg shadow-black/20">
            <div className="space-y-5">
              <SettingRow
                icon={GraduationCap}
                label="Exam"
                value="Texas Journeyman (2023 NEC)"
              />

              <ProfileProgress />

              <SettingRow
                icon={BookOpen}
                label="Question Bank"
                value={`${questionBankSize} Questions`}
              />

              <SettingRow icon={Tag} label="Current Version" value="v0.1" />
            </div>
          </div>
        </div>
      </AppShell>

      <BottomNav />
    </>
  );
}
