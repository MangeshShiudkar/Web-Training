import { notFound } from "next/navigation";
import PageHeading from "@/components/page-heading";
import { findProject } from "@/lib/projects";

export const instant = false;

export default async function ProjectActivityPage({
  params,
}: PageProps<"/projects/[projectId]/activity">) {
  const { projectId } = await params;
  const project = findProject(projectId);
  if (!project) notFound();
  return (
    <div>
      <PageHeading
        eyebrow="Project activity"
        title="Recent updates"
        description={`Recent work and decisions from ${project.name}.`}
      />
      <ol className="ml-2 border-l border-stone-200">
        {[
          [
            "Today",
            `${project.owner} updated the project progress to ${project.progress}%.`,
          ],
          ["Yesterday", "The team reviewed upcoming work and priorities."],
          ["Last week", "Project goals and delivery dates were confirmed."],
        ].map(([date, update]) => (
          <li key={date} className="relative pb-7 pl-6 last:pb-0">
            <span className="absolute -left-[5px] top-1 size-2.5 rounded-full bg-emerald-700 ring-4 ring-[var(--background)]" />
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
              {date}
            </p>
            <p className="mt-1 text-sm leading-6 text-stone-700">{update}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
