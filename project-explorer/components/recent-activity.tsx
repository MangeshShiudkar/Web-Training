import { wait } from "@/lib/projects";

const activity = [
  ["MC", "Maya Chen", "updated the Website Refresh timeline", "12 minutes ago"],
  ["JL", "Jordan Lee", "completed a dashboard review", "1 hour ago"],
  ["SR", "Sam Rivera", "shared the design system handoff", "Yesterday"],
];

export default async function RecentActivity() {
  await wait(1800);

  return (
    <section aria-labelledby="activity-heading">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
            The latest
          </p>
          <h2
            id="activity-heading"
            className="mt-1 text-xl font-semibold text-stone-900"
          >
            Recent activity
          </h2>
        </div>
        <span className="text-xs text-stone-500">Updated just now</span>
      </div>
      <ul className="divide-y divide-stone-200 border-y border-stone-200">
        {activity.map(([initials, name, action, time]) => (
          <li key={name} className="flex items-center gap-3 py-4">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-900">
              {initials}
            </span>
            <p className="min-w-0 flex-1 text-sm text-stone-700">
              <span className="font-semibold text-stone-900">{name}</span>{" "}
              {action}
            </p>
            <time className="shrink-0 text-xs text-stone-500">{time}</time>
          </li>
        ))}
      </ul>
    </section>
  );
}
