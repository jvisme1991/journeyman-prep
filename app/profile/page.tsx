import { AppShell } from "@/components/layout/app-shell";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { ProfileProgress } from "@/components/profile/profile-progress";
import { questionRepository } from "@/services/question-repository";

export default function ProfilePage() {
  const questionBankSize = questionRepository.getAll().length;

  return (
    <>
      <AppShell>
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold">Profile</h1>

            <p className="mt-2 text-slate-400">
              Study preferences.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="space-y-5">
              <Setting
                label="Exam"
                value="Texas Journeyman (2023 NEC)"
              />

              <ProfileProgress />

              <Setting
                label="Question Bank"
                value={`${questionBankSize} Questions`}
              />

              <Setting
                label="Current Version"
                value="v0.1"
              />
            </div>
          </div>
        </div>
      </AppShell>

      <BottomNav />
    </>
  );
}

function Setting({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-4 last:border-b-0 last:pb-0">
      <span className="text-slate-400">
        {label}
      </span>

      <span className="font-semibold">
        {value}
      </span>
    </div>
  );
}
