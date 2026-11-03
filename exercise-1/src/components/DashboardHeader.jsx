function DashboardHeader() {
  return (
    <header className="flex flex-col gap-5 border-b border-line pb-7 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase text-brand">Catalog</p>
        <h1 className="mt-2 text-3xl font-bold">Product dashboard</h1>
        <p className="mt-2 text-sm text-muted">
          Review your current product lineup.
        </p>
      </div>
      <button
        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        type="button"
      >
        Add product
      </button>
    </header>
  )
}

export default DashboardHeader