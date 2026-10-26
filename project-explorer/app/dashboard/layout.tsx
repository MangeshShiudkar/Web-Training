import Link from "next/link";

const dashboardLinks = [
  ["Overview", "/dashboard"],
  ["Analytics", "/dashboard/analytics"],
  ["Reports", "/dashboard/reports"],
  ["Team", "/dashboard/team"],
] as const;

export default function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  return (
    <div className="grid gap-8 lg:grid-cols-[205px_minmax(0,1fr)]">
      <aside className="border-b border-stone-200 pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-stone-500">
          Dashboard
        </p>
        <nav
          aria-label="Dashboard navigation"
          className="flex flex-wrap gap-2 lg:flex-col"
        >
          {dashboardLinks.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-md px-3 py-2 text-sm text-stone-700 hover:bg-emerald-50 hover:text-emerald-900"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/projects"
            className="rounded-md px-3 py-2 text-sm text-stone-700 hover:bg-emerald-50 hover:text-emerald-900"
          >
            Browse projects
          </Link>
        </nav>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
