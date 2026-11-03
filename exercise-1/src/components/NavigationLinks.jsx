function NavigationLinks() {
  return (
    <>
      <a
        className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        href="#dashboard"
      >
        Dashboard
      </a>
      <a
        className="rounded-lg bg-brand/10 px-3 py-2 text-sm font-semibold text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        href="#products"
        aria-current="page"
      >
        Products
      </a>
    </>
  )
}

export default NavigationLinks