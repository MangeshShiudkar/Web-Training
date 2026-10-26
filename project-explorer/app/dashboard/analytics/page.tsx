import PageHeading from "@/components/page-heading";
import { projects } from "@/lib/projects";

export default function AnalyticsPage() {
  const averageProgress = Math.round(
    projects.reduce((sum, project) => sum + project.progress, 0) /
      projects.length,
  );

  return (
    <div>
      <PageHeading
        eyebrow="Dashboard"
        title="Analytics"
        description="A simple summary of project progress across the workspace."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="border border-stone-200 bg-white p-5">
          <p className="text-sm text-stone-500">Average completion</p>
          <p className="mt-2 text-3xl font-semibold">{averageProgress}%</p>
          <div className="mt-4 h-2 rounded-full bg-stone-200">
            <div
              className="h-2 rounded-full bg-emerald-700"
              style={{ width: `${averageProgress}%` }}
            />
          </div>
        </div>
        <div className="border border-stone-200 bg-white p-5">
          <p className="text-sm text-stone-500">Projects tracked</p>
          <p className="mt-2 text-3xl font-semibold">{projects.length}</p>
          <p className="mt-2 text-sm text-stone-600">
            Across {new Set(projects.map((project) => project.category)).size}{" "}
            work areas
          </p>
        </div>
      </div>
    </div>
  );
}
