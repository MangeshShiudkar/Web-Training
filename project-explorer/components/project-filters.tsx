"use client";

import { useSearchParams } from "next/navigation";

export default function ProjectFilters() {
  const searchParams = useSearchParams();

  return (
    <form
      action="/projects"
      className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_190px_auto]"
    >
      <label className="sr-only" htmlFor="project-search">
        Search projects
      </label>
      <input
        id="project-search"
        name="search"
        type="search"
        defaultValue={searchParams.get("search") ?? ""}
        placeholder="Search projects by name or owner"
        className="min-h-11 rounded-md border border-stone-300 bg-white px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
      />
      <label className="sr-only" htmlFor="project-status">
        Filter by status
      </label>
      <select
        id="project-status"
        name="status"
        defaultValue={searchParams.get("status") ?? ""}
        className="min-h-11 rounded-md border border-stone-300 bg-white px-3 text-sm capitalize outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
      >
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="planned">Planned</option>
      </select>
      <button
        className="min-h-11 rounded-md bg-emerald-800 px-5 text-sm font-semibold text-white hover:bg-emerald-900"
        type="submit"
      >
        Apply filters
      </button>
    </form>
  );
}
