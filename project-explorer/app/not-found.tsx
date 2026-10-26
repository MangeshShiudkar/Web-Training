import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-stone-900">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-stone-600">
        The page you requested could not be found.
      </p>
      <Link
        className="mt-6 inline-block text-sm font-semibold text-emerald-800"
        href="/"
      >
        Return home →
      </Link>
    </div>
  );
}
