"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const sections = [
  ["Overview", ""],
  ["Team", "team"],
  ["Tasks", "tasks"],
  ["Activity", "activity"],
  ["Docs", "docs"],
] as const;

export default function ProjectSectionNav({
  projectId,
}: {
  projectId: string;
}) {
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  return (
    <nav
      aria-label="Project sections"
      className="mb-7 flex gap-5 overflow-x-auto border-b border-stone-200"
    >
      {sections.map(([label, path]) => {
        const href = `/projects/${projectId}${path ? `/${path}` : ""}${query ? `?${query}` : ""}`;
        return (
          <Link
            key={label}
            href={href}
            className="shrink-0 border-b-2 border-transparent pb-3 text-sm text-stone-600 hover:border-emerald-700 hover:text-emerald-900"
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
