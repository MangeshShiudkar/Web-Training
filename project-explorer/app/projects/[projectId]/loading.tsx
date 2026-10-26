export default function ProjectLoading() {
  return (
    <div aria-label="Loading project" className="animate-pulse">
      <div className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-20 rounded-md bg-stone-200" />
        ))}
      </div>
      <div className="mt-8 h-5 w-32 rounded bg-stone-200" />
      <div className="mt-4 h-4 max-w-xl rounded bg-stone-200" />
      <div className="mt-2 h-4 max-w-lg rounded bg-stone-200" />
      <p className="mt-6 text-sm text-stone-500">Loading project details…</p>
    </div>
  );
}
