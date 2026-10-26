import Link from "next/link";
import { notFound } from "next/navigation";
import { findProject, wait } from "@/lib/projects";

export const instant = false;

type ProjectPageProps = {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{
    search?: string;
    status?: string;
    simulateError?: string;
  }>;
};

export default async function ProjectOverviewPage({
  params,
  searchParams,
}: ProjectPageProps) {
  const { projectId } = await params;
  const project = findProject(projectId);
  if (!project) notFound();

  await wait(900);
  const filters = await searchParams;
  if (filters.simulateError === "1")
    throw new Error(
      "The project service is temporarily unavailable. Please try again.",
    );

  const query = new URLSearchParams();
  if (filters.search) query.set("search", filters.search);
  if (filters.status) query.set("status", filters.status);
  const returnHref = `/projects${query.size ? `?${query.toString()}` : ""}`;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="border border-stone-200 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-stone-500">
            Status
          </p>
          <p className="mt-2 text-lg font-semibold capitalize text-stone-900">
            {project.status}
          </p>
        </div>
        <div className="border border-stone-200 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-stone-500">
            Project owner
          </p>
          <p className="mt-2 text-lg font-semibold text-stone-900">
            {project.owner}
          </p>
        </div>
        <div className="border border-stone-200 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-stone-500">
            Due date
          </p>
          <p className="mt-2 text-lg font-semibold text-stone-900">
            {project.dueDate}
          </p>
        </div>
      </div>
      <section className="mt-8 max-w-2xl">
        <h2 className="text-lg font-semibold text-stone-900">Overview</h2>
        <p className="mt-2 text-sm leading-7 text-stone-600">
          {project.description} The team has completed {project.progress}% of
          the planned work and has {project.team} people contributing.
        </p>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full bg-emerald-700"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-stone-500">
          {project.progress}% complete
        </p>
      </section>
      <Link
        href={returnHref}
        className="mt-8 inline-block text-sm font-medium text-emerald-800 hover:text-emerald-950"
      >
        ← Back to filtered project list
      </Link>
    </div>
  );
}
