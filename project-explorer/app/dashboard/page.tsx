import Link from "next/link";
import { Suspense } from "react";
import RecentActivity from "@/components/recent-activity";
import { projects } from "@/lib/projects";

function ActivityFallback() {
  return (
    <div
      aria-label="Loading recent activity"
      className="space-y-4 border-y border-stone-200 py-5"
    >
      <div className="h-3 w-32 animate-pulse rounded bg-stone-200" />
      <div className="h-12 animate-pulse rounded bg-stone-100" />
      <div className="h-12 animate-pulse rounded bg-stone-100" />
    </div>
  );
}

export default function DashboardPage() {
  const activeProjects = projects.filter(
    (project) => project.status === "active",
  );

  return (
    <div>
      <div className="mb-8 border-b border-stone-200 pb-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
          Monday, October 26, 2026
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Your dashboard
        </h1>
        <p className="mt-2 text-sm text-stone-600">
          A quick look at the projects moving across your team.
        </p>
      </div>
      <section className="mb-9 grid gap-4 sm:grid-cols-3">
        <div className="border-l-2 border-emerald-700 bg-white px-5 py-4">
          <p className="text-sm text-stone-500">Active projects</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {activeProjects.length}
          </p>
        </div>
        <div className="border-l-2 border-sky-700 bg-white px-5 py-4">
          <p className="text-sm text-stone-500">Projects completed</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {
              projects.filter((project) => project.status === "completed")
                .length
            }
          </p>
        </div>
        <div className="border-l-2 border-amber-600 bg-white px-5 py-4">
          <p className="text-sm text-stone-500">People involved</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {projects.reduce((total, project) => total + project.team, 0)}
          </p>
        </div>
      </section>
      <section className="mb-9">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
              In progress
            </p>
            <h2 className="mt-1 text-xl font-semibold text-stone-900">
              Active projects
            </h2>
          </div>
          <Link
            href="/projects?status=active"
            className="text-sm font-semibold text-emerald-800 hover:text-emerald-950"
          >
            View all <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {activeProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="border border-stone-200 bg-white p-4 hover:border-emerald-700"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-stone-900">{project.name}</h3>
                <span className="text-xs text-stone-500">
                  {project.progress}%
                </span>
              </div>
              <p className="mt-2 text-sm text-stone-600">
                {project.owner} · Due {project.dueDate}
              </p>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-stone-200">
                <div
                  className="h-full bg-emerald-700"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Suspense fallback={<ActivityFallback />}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}
