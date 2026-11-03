import DashboardHeader from './components/DashboardHeader.jsx'
import MobileNavigation from './components/MobileNavigation.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import Sidebar from './components/Sidebar.jsx'

function App() {
  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar />
      <main className="min-h-screen lg:pl-64" id="dashboard">
        <MobileNavigation />
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-shell sm:py-10">
          <DashboardHeader />
          <ProductGrid />
        </div>
      </main>
    </div>
  )
}

export default App