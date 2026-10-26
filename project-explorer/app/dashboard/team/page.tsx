import PageHeading from "@/components/page-heading";
import { projects } from "@/lib/projects";

const people = ["Maya Chen", "Jordan Lee", "Sam Rivera", "Avery Patel"];

export default function TeamPage() {
  return (
    <div>
      <PageHeading
        eyebrow="Dashboard"
        title="Team"
        description="People coordinating work across the project portfolio."
      />
      <ul className="divide-y divide-stone-200 border-y border-stone-200">
        {people.map((person, index) => (
          <li key={person} className="flex items-center gap-4 py-4">
            <span className="grid size-10 place-items-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-900">
              {person
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-stone-900">{person}</p>
              <p className="mt-1 text-xs text-stone-500">Project lead</p>
            </div>
            <span className="text-sm text-stone-600">
              {projects[index % projects.length].name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
