import { notFound } from "next/navigation";
import PageHeading from "@/components/page-heading";
import { findProject } from "@/lib/projects";

export const instant = false;

const tasks = [
  ["Review project goals", "Done"],
  ["Prepare the first delivery", "In progress"],
  ["Share an update with the team", "Up next"],
];

export default async function ProjectTasksPage({
  params,
}: PageProps<"/projects/[projectId]/tasks">) {
  const { projectId } = await params;
  const project = findProject(projectId);
  if (!project) notFound();
  return (
    <div>
      <PageHeading
        eyebrow="Project tasks"
        title="Work plan"
        description={`A short view of the next steps for ${project.name}.`}
      />
      <ul className="divide-y divide-stone-200 border-y border-stone-200">
        {tasks.map(([task, status]) => (
          <li key={task} className="flex items-center gap-3 py-4">
            <span
              className={`grid size-5 place-items-center rounded-full border text-xs ${status === "Done" ? "border-emerald-700 bg-emerald-700 text-white" : "border-stone-300 text-transparent"}`}
            >
              ✓
            </span>
            <span className="flex-1 text-sm text-stone-800">{task}</span>
            <span className="text-xs text-stone-500">{status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
