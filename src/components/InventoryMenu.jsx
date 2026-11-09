import { NavLink } from 'react-router-dom'
import { useInventory } from '../context/InventoryContext'

function claseEnlace({ isActive }) {
  return [
    'inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold',
    isActive ? 'bg-leaf-800 text-white' : 'text-ink hover:bg-leaf-100',
  ].join(' ')
}

export default function InventoryMenu() {
  const { carrito } = useInventory()
  const unidades = carrito.reduce((suma, linea) => suma + linea.cantidad, 0)

  return (
    <nav aria-label="Gestión de inventario" className="border-b border-sand bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 px-4 py-3">
        <span className="mr-1 text-xs font-semibold tracking-wide text-stone-500 uppercase">
          Gestión
        </span>
        <NavLink to="/inventario" end className={claseEnlace}>
          Inventario
        </NavLink>
        <NavLink to="/inventario/nuevo" className={claseEnlace}>
          Agregar artículo
        </NavLink>
        <NavLink to="/carrito" className={claseEnlace}>
          Carrito
          {unidades > 0 && (
            <span className="ml-2 rounded-full bg-tomato-600 px-2 py-0.5 text-xs text-white">
              {unidades}
            </span>
          )}
        </NavLink>
      </div>
    </nav>
  )
}
