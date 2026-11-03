import NavigationLinks from './NavigationLinks.jsx'

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-surface p-6 lg:block">
      <a className="text-lg font-bold tracking-normal text-brand" href="#dashboard">
        Demo Store
      </a>
      <nav className="mt-10 flex flex-col gap-2" aria-label="Main navigation">
        <NavigationLinks />
      </nav>
      <div className="absolute inset-x-6 bottom-6 border-t border-line pt-5">
        <p className="text-sm font-semibold">Workspace</p>
        <p className="mt-1 text-sm text-muted">Demo Store Studio</p>
      </div>
    </aside>
  )
}

export default Sidebar