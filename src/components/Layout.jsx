import { Link, Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'
import InventoryMenu from './InventoryMenu'

export default function Layout() {
  return (
    <div className="min-h-screen">
      <header className="bg-leaf-900 text-cream">
        <div className="mx-auto flex max-w-5xl items-end justify-between gap-4 px-4 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf-100">
              Supermercado
            </p>
            <Link to="/" className="font-display text-3xl leading-none text-white">
              Mercado del Barrio
            </Link>
          </div>
          <p className="hidden text-sm text-leaf-100 sm:block">Barrio Yungay · Santiago</p>
        </div>
      </header>
      <InventoryMenu />
      <main className="mx-auto w-full max-w-5xl px-4 pt-8 pb-28">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
