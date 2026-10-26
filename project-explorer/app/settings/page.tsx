import PageHeading from "@/components/page-heading";

export default function SettingsPage() {
  return (
    <div>
      <PageHeading
        eyebrow="Workspace"
        title="Settings"
        description="Workspace details for Project Explorer."
      />
      <section className="max-w-2xl divide-y divide-stone-200 border-y border-stone-200">
        <div className="flex flex-wrap justify-between gap-3 py-5">
          <div>
            <h2 className="text-sm font-semibold text-stone-900">
              Workspace name
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              The name shown in the main navigation.
            </p>
          </div>
          <span className="text-sm text-stone-700">Project Explorer</span>
        </div>
        <div className="flex flex-wrap justify-between gap-3 py-5">
          <div>
            <h2 className="text-sm font-semibold text-stone-900">
              Default project view
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Start with every project visible.
            </p>
          </div>
          <span className="text-sm text-stone-700">All projects</span>
        </div>
        <div className="flex flex-wrap justify-between gap-3 py-5">
          <div>
            <h2 className="text-sm font-semibold text-stone-900">
              Workspace access
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Project information is available to employees.
            </p>
          </div>
          <span className="text-sm text-stone-700">Employees</span>
        </div>
      </section>
    </div>
  );
}
