import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeading from "@/components/page-heading";
import { findProject } from "@/lib/projects";

export const instant = false;

export default async function ProjectDocsPage({
  params,
}: PageProps<"/projects/[projectId]/docs/[[...slug]]">) {
  const { projectId, slug = [] } = await params;
  const project = findProject(projectId);
  if (!project) notFound();
  const path = slug.join(" / ") || "Project resources";
  const heading = slug.at(-1)?.replaceAll("-", " ") ?? "Resources";

  return (
    <div>
      <PageHeading
        eyebrow="Project documentation"
        title={heading}
        description={`Resource path: ${path}`}
      />
      <div className="max-w-2xl border-l-2 border-emerald-700 pl-5">
        <p className="text-sm leading-7 text-stone-700">
          Documentation and setup notes for {project.name}. This route displays
          every section requested in the URL.
        </p>
        <p className="mt-4 rounded bg-stone-100 px-3 py-2 font-mono text-xs text-stone-700">
          /projects/{projectId}/docs{slug.length ? `/${slug.join("/")}` : ""}
        </p>
        <Link
          href={`/projects/${projectId}/docs/setup`}
          className="mt-5 inline-block text-sm font-semibold text-emerald-800 hover:text-emerald-950"
        >
          Open setup guide <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
