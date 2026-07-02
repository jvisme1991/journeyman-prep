import {
  BarChart3,
  BookOpen,
  Flame,
  GraduationCap,
  Home,
  Trophy,
  User,
  Zap,
} from "lucide-react";

const stats = [
  {
    label: "Questions Answered",
    value: "0",
  },
  {
    label: "Accuracy",
    value: "0%",
  },
  {
    label: "Study Streak",
    value: "0 days",
  },
  {
    label: "Weakest Article",
    value: "—",
  },
];

const navItems = [
  {
    label: "Home",
    icon: Home,
  },
  {
    label: "Study",
    icon: BookOpen,
  },
  {
    label: "Exams",
    icon: GraduationCap,
  },
  {
    label: "Progress",
    icon: BarChart3,
  },
  {
    label: "Profile",
    icon: User,
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-28 pt-6">
        <header className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">
                Journeyman Prep
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight">
                Master the NEC.
                <br />
                Pass the Exam.
              </h1>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400 ring-1 ring-blue-400/20">
              <Zap className="h-6 w-6" />
            </div>
          </div>

          <p className="text-sm leading-6 text-slate-400">
            Build speed, accuracy, and code confidence one session at a time.
          </p>
        </header>

        <section className="mb-5 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-black/30">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-400">
                Exam Readiness
              </p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-5xl font-black tracking-tight">0%</span>
                <span className="pb-2 text-sm text-slate-500">ready</span>
              </div>
            </div>

            <div className="rounded-2xl bg-amber-500/10 p-3 text-amber-400 ring-1 ring-amber-400/20">
              <Trophy className="h-6 w-6" />
            </div>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-0 rounded-full bg-blue-500" />
          </div>

          <p className="mt-4 text-sm text-slate-400">
            Start your first lesson to begin building your readiness score.
          </p>
        </section>

        <section className="mb-5 grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {stat.label}
              </p>
              <p className="mt-2 text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </section>

        <button className="mb-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-500 px-5 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/20">
          <BookOpen className="h-5 w-5" />
          Continue Studying
        </button>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">
                Today&apos;s Goal
              </p>
              <h2 className="mt-1 text-xl font-bold">25 Questions</h2>
            </div>

            <div className="rounded-2xl bg-orange-500/10 p-3 text-orange-400 ring-1 ring-orange-400/20">
              <Flame className="h-6 w-6" />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>Completed</span>
            <span>0 / 25</span>
          </div>

          <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-0 rounded-full bg-orange-500" />
          </div>
        </section>
      </div>

      <nav className="fixed inset-x-0 bottom-0 border-t border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = index === 0;

            return (
              <button
                key={item.label}
                className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs font-medium ${
                  active
                    ? "bg-blue-500/15 text-blue-400"
                    : "text-slate-500"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </main>
  );
}