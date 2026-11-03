import NavigationLinks from './NavigationLinks.jsx'

function MobileNavigation() {
  return (
    <div className="border-b border-line bg-surface px-5 py-4 lg:hidden">
      <a className="text-lg font-bold tracking-normal text-brand" href="#dashboard">
        Demo Store
      </a>
      <nav className="mt-3 flex gap-2" aria-label="Main navigation">
        <NavigationLinks />
      </nav>
    </div>
  )
}

export default MobileNavigation