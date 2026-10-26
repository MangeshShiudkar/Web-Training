import { notFound } from "next/navigation";
import PageHeading from "@/components/page-heading";
import { findProject } from "@/lib/projects";

export const instant = false;

const members = [
  "Maya Chen",
  "Jordan Lee",
  "Sam Rivera",
  "Avery Patel",
  "Noah Williams",
];

export default async function ProjectTeamPage({
  params,
}: PageProps<"/projects/[projectId]/team">) {
  const { projectId } = await params;
  const project = findProject(projectId);
  if (!project) notFound();
  return (
    <div>
      <PageHeading
        eyebrow="Project team"
        title={`${project.team} people on this project`}
        description="People coordinating the work and sharing responsibility for delivery."
      />
      <ul className="grid gap-x-8 sm:grid-cols-2">
        {members.slice(0, project.team).map((member, index) => (
          <li
            key={member}
            className="flex items-center gap-3 border-b border-stone-200 py-4"
          >
            <span className="grid size-9 place-items-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-900">
              {member
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </span>
            <div>
              <p className="text-sm font-semibold text-stone-900">{member}</p>
              <p className="mt-1 text-xs text-stone-500">
                {index === 0 ? "Project lead" : "Contributor"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
