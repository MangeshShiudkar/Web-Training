"use client";

export default function ProjectError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  function retryProject() {
    const url = new URL(window.location.href);
    const isDemoFailure = url.searchParams.has("simulateError");
    url.searchParams.delete("simulateError");
    if (isDemoFailure) {
      window.location.assign(url.toString());
    } else {
      reset();
    }
  }

  return (
    <div role="alert" className="max-w-xl border-l-2 border-rose-700 py-2 pl-5">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-rose-800">
        Project unavailable
      </p>
      <h2 className="mt-2 text-xl font-semibold text-stone-900">
        We couldn’t load this project.
      </h2>
      <p className="mt-2 text-sm leading-6 text-stone-600">
        There was a problem retrieving the project information. Please try
        again.
      </p>
      <button
        type="button"
        onClick={retryProject}
        className="mt-5 rounded-md bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900"
      >
        Try again
      </button>
    </div>
  );
}
