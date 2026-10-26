import PageHeading from "@/components/page-heading";
import { projects } from "@/lib/projects";

export default function ReportsPage() {
  return (
    <div>
      <PageHeading
        eyebrow="Dashboard"
        title="Reports"
        description="A quick status report of the current project portfolio."
      />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-y border-stone-200 text-xs uppercase tracking-wide text-stone-500">
              <th className="px-3 py-3 font-semibold">Project</th>
              <th className="px-3 py-3 font-semibold">Owner</th>
              <th className="px-3 py-3 font-semibold">Status</th>
              <th className="px-3 py-3 font-semibold">Progress</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-stone-200">
                <td className="px-3 py-4 font-medium text-stone-900">
                  {project.name}
                </td>
                <td className="px-3 py-4 text-stone-600">{project.owner}</td>
                <td className="px-3 py-4 capitalize text-stone-600">
                  {project.status}
                </td>
                <td className="px-3 py-4 text-stone-600">
                  {project.progress}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
