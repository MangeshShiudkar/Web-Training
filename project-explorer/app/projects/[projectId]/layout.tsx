import Link from "next/link";
import ProjectSectionNav from "@/components/project-section-nav";
import { findProject } from "@/lib/projects";

export default async function ProjectLayout({
  children,
  params,
}: LayoutProps<"/projects/[projectId]">) {
  const { projectId } = await params;
  const project = findProject(projectId);
  if (!project) {
    return (
      <div className="max-w-xl border-l-2 border-amber-600 py-2 pl-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-800">
          Project not found
        </p>
        <h2 className="mt-2 text-xl font-semibold text-stone-900">
          This project does not exist.
        </h2>
        <p className="mt-2 text-sm text-stone-600">
          Check the project number or return to the project list.
        </p>
        <Link
          href="/projects"
          className="mt-5 inline-block text-sm font-semibold text-emerald-800 hover:text-emerald-950"
        >
          Browse projects →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/projects"
        className="text-sm font-medium text-emerald-800 hover:text-emerald-950"
      >
        ← All projects
      </Link>
      <div className="mb-7 mt-5 border-b border-stone-200 pb-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-stone-500">
          {project.category} · Project {project.id}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          {project.name}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
          {project.description}
        </p>
      </div>
      <ProjectSectionNav projectId={project.id} />
      {children}
    </div>
  );
}
