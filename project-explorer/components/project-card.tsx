import Link from "next/link";
import type { Project } from "@/lib/projects";
import FavoriteButton from "@/components/favorite-button";

const statusStyles: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-900",
  completed: "bg-sky-100 text-sky-900",
  planned: "bg-amber-100 text-amber-900",
};

type ProjectCardProps = {
  project: Project;
  search?: string;
  status?: string;
};

export default function ProjectCard({
  project,
  search = "",
  status = "",
}: ProjectCardProps) {
  const query = new URLSearchParams();
  if (search) query.set("search", search);
  if (status) query.set("status", status);
  const detailsHref = `/projects/${project.id}${query.size ? `?${query.toString()}` : ""}`;

  return (
    <article className="border-b border-stone-200 py-5 first:border-t">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span
              className={`rounded px-2 py-1 text-xs font-semibold capitalize ${statusStyles[project.status]}`}
            >
              {project.status}
            </span>
            <span className="text-xs text-stone-500">{project.category}</span>
          </div>
          <h2 className="text-lg font-semibold text-stone-900">
            <Link href={detailsHref} className="hover:text-emerald-800">
              {project.name}
            </Link>
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-stone-600">
            {project.description}
          </p>
        </div>
        <FavoriteButton projectId={project.id} projectName={project.name} />
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
        <div>
          <div className="mb-1 flex justify-between text-xs text-stone-500">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full rounded-full bg-emerald-700"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
        <p className="text-sm text-stone-600">
          <span className="text-stone-400">Owner</span> {project.owner}
        </p>
        <Link
          href={detailsHref}
          className="text-sm font-semibold text-emerald-800 hover:text-emerald-950"
        >
          View project <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
