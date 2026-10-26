import Link from "next/link";
import { projects } from "@/lib/projects";

export default function Home() {
  const activeCount = projects.filter(
    (project) => project.status === "active",
  ).length;

  return (
    <div>
      <section className="relative overflow-hidden rounded-xl bg-emerald-950 px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
        <div className="absolute right-0 top-0 hidden h-full w-2/5 border-l border-white/10 bg-[linear-gradient(135deg,transparent_49.8%,rgba(255,255,255,0.08)_50%,transparent_50.2%)] bg-[length:28px_28px] lg:block" />
        <div className="relative max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
            Work, in one place
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
            A clearer view of every project.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-emerald-100">
            Browse the work in motion, see who is involved, and find the details
            your team needs to move forward.
          </p>
          <Link
            href="/projects"
            className="mt-8 inline-flex items-center gap-3 rounded-md bg-white px-5 py-3 text-sm font-semibold text-emerald-950 hover:bg-emerald-50"
          >
            Explore projects <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
      <section className="grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
            Your workspace
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-900">
            Good work starts with shared context.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">
            Project Explorer brings project status, owners, and team updates
            together so everyone can quickly see what is happening.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-stone-200 bg-stone-200">
          <div className="bg-white p-5">
            <p className="text-3xl font-semibold text-stone-900">
              {projects.length}
            </p>
            <p className="mt-1 text-sm text-stone-600">Tracked projects</p>
          </div>
          <div className="bg-white p-5">
            <p className="text-3xl font-semibold text-emerald-800">
              {activeCount}
            </p>
            <p className="mt-1 text-sm text-stone-600">In progress</p>
          </div>
        </div>
      </section>
    </div>
  );
}
