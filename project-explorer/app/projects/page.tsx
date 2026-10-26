import PageHeading from "@/components/page-heading";
import ProjectCard from "@/components/project-card";
import ProjectFilters from "@/components/project-filters";
import { projects } from "@/lib/projects";

export const instant = false;

type ProjectsPageProps = {
  searchParams: Promise<{ search?: string; status?: string }>;
};

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const { search = "", status = "" } = await searchParams;
  const normalizedSearch = search.trim().toLowerCase();
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      !normalizedSearch ||
      `${project.name} ${project.description} ${project.owner}`
        .toLowerCase()
        .includes(normalizedSearch);
    const matchesStatus = !status || project.status === status.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <PageHeading
        eyebrow="Portfolio"
        title="Projects"
        description="Search the project list or filter it by status. Open a project to see its overview, team, tasks, and updates."
      />
      <ProjectFilters />
      <div className="mt-8 flex items-center justify-between border-b border-stone-200 pb-3">
        <h2 className="text-sm font-semibold text-stone-900">
          All projects{" "}
          <span className="ml-1 font-normal text-stone-500">
            ({filteredProjects.length})
          </span>
        </h2>
        {(search || status) && (
          <p className="text-xs text-stone-500">
            Filters are in the URL and can be shared.
          </p>
        )}
      </div>
      {filteredProjects.length ? (
        <div>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              search={search}
              status={status}
            />
          ))}
        </div>
      ) : (
        <p className="border-b border-stone-200 py-10 text-sm text-stone-600">
          No projects match these filters. Try another search or status.
        </p>
      )}
    </div>
  );
}
