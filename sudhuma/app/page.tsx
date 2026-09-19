import { RetroGrid } from "../components/retro-grid";

/*
  STEP 1 — Landing page (static foundation).
  No real data yet: the "Today" card below is a hard-coded preview
  of the vision. Steps 2–3 will replace it with the student's
  actual timetable + live countdown.
*/

type PreviewLesson = {
  time: string;
  subject: string;
  detail: string;
  state: "next" | "later" | "break";
};

const previewLessons: PreviewLesson[] = [
  { time: "07:30", subject: "Mathematics", detail: "Room A3", state: "next" },
  { time: "08:30", subject: "Geography", detail: "Room B12", state: "later" },
  { time: "09:30", subject: "Break", detail: "30 min", state: "break" },
  { time: "10:00", subject: "Business Studies", detail: "Room C4", state: "later" },
];

const steps = [
  {
    number: "01",
    title: "Enter it once",
    body: "Type in your timetable in about two minutes. Subject, start, end — done. No account, no setup wizard from hell.",
  },
  {
    number: "02",
    title: "Glance, don't dig",
    body: "Open Sudhuma and the answer is just there: what's on now, what's next, and the full day below it. Three seconds, zero taps.",
  },
  {
    number: "03",
    title: "Get the nudge",
    body: "A reminder lands a few minutes before each lesson — subject, time, room. Your timetable finally does the remembering for you.",
  },
];

const promises = [
  "Free to use",
  "No account needed",
  "Works offline",
  "Your data stays on your phone",
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* ---------- Nav ---------- */}
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2">
          <span aria-hidden="true" className="inline-block size-3 rounded-full bg-ember" />
          <span className="text-xl font-bold tracking-tight">sudhuma</span>
        </a>
        <nav className="flex items-center gap-5 text-sm font-medium">
          <a href="#how" className="hidden text-ink-soft transition-colors hover:text-ink sm:inline">
            How it works
          </a>
          <span className="rounded-full border border-line bg-white/60 px-3 py-1 text-xs text-ink-soft">
            v0.1 · foundation
          </span>
        </nav>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <RetroGrid />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-16 pb-20 text-center sm:pt-24">
          <p className="rounded-full border border-line bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-ink-soft uppercase">
            Built for high-school students
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl leading-[1.05] font-bold tracking-tight text-balance sm:text-7xl">
            Know what&rsquo;s <span className="text-ember">next.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Sudhuma turns your school timetable into a calm daily guide — and
            pings you before every lesson, so periods stop living rent-free in
            your head.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#how"
              className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ember-deep"
            >
              Build my timetable
            </a>
            <a
              href="#preview"
              className="rounded-full border border-line bg-white/70 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
            >
              See the vision ↓
            </a>
          </div>
          <p className="mt-4 text-xs text-ink-soft">
            The setup screen arrives in Step 2 — today we&rsquo;re laying the foundation.
          </p>

          {/* ---------- Vision preview card ---------- */}
          <div
            id="preview"
            className="mt-14 w-full max-w-2xl scroll-mt-24 rounded-3xl border border-line bg-white/85 p-6 text-left shadow-[0_20px_60px_-30px_rgba(28,29,36,0.35)] backdrop-blur sm:p-8"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold tracking-widest text-ink-soft uppercase">
                Today · Monday
              </p>
              <p className="flex items-center gap-1.5 rounded-full bg-parchment px-3 py-1 text-xs font-semibold text-ink-soft">
                <span aria-hidden="true" className="inline-block size-1.5 animate-pulse rounded-full bg-ember" />
                Preview
              </p>
            </div>
            <p className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Up next: Mathematics
            </p>
            <p className="mt-1 text-sm font-medium text-ink-soft">
              07:30 · Room A3 · starts in 12 min
            </p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {previewLessons.map((lesson) => (
                <li key={lesson.time} className="flex items-center gap-4 py-3">
                  <span className="w-12 shrink-0 font-mono text-sm font-semibold text-ink-soft">
                    {lesson.time}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`h-9 w-1 shrink-0 rounded-full ${
                      lesson.state === "next"
                        ? "bg-ember"
                        : lesson.state === "break"
                          ? "bg-line"
                          : "bg-gold/60"
                    }`}
                  />
                  <span className="flex-1">
                    <span className="block text-sm font-semibold">{lesson.subject}</span>
                    <span className="block text-xs text-ink-soft">{lesson.detail}</span>
                  </span>
                  {lesson.state === "next" && (
                    <span className="rounded-full bg-ember px-3 py-1 text-xs font-bold text-white">
                      NEXT
                    </span>
                  )}
                  {lesson.state === "break" && (
                    <span className="rounded-full bg-parchment px-3 py-1 text-xs font-semibold text-ink-soft">
                      break
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-ink-soft">
              This card is hard-coded for now. Steps 2–3 wire it to your real
              timetable with a live countdown.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section id="how" className="mx-auto w-full max-w-5xl scroll-mt-16 px-6 py-16 sm:py-24">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Three steps. Two minutes. Zero missed lessons.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-3xl border border-line bg-white/70 p-6"
            >
              <p className="font-mono text-sm font-bold text-ember">{step.number}</p>
              <h3 className="mt-2 text-lg font-bold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
            </article>
          ))}
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-ink-soft">
          {promises.map((promise) => (
            <li key={promise} className="flex items-center gap-2">
              <span aria-hidden="true" className="font-bold text-ember">✓</span>
              {promise}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-2 px-6 py-8 text-center text-xs text-ink-soft sm:flex-row sm:text-left">
          <p>
            <span className="font-bold text-ink">sudhuma</span> — know what&rsquo;s next.
          </p>
          <p>Built step-by-step · Step 1: foundation</p>
        </div>
      </footer>
    </main>
  );
}
