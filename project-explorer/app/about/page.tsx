import PageHeading from "@/components/page-heading";

export default function AboutPage() {
  return (
    <div>
      <PageHeading
        eyebrow="About"
        title="A shared view of the work"
        description="Project Explorer helps teams find project information without losing it across conversations and documents."
      />
      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="text-lg font-semibold text-stone-900">
            Why this portal exists
          </h2>
          <p className="mt-3 text-sm leading-7 text-stone-600">
            Teams need a simple way to see what is being built, who is
            responsible, and what needs attention next. This workspace keeps
            those basics easy to find.
          </p>
        </section>
        <section className="border-l-2 border-emerald-700 pl-5">
          <h2 className="text-lg font-semibold text-stone-900">
            What you can find here
          </h2>
          <p className="mt-3 text-sm leading-7 text-stone-600">
            Browse project overviews, team members, tasks, activity, and
            supporting documentation. The dashboard brings recent updates
            together.
          </p>
        </section>
      </div>
    </div>
  );
}
