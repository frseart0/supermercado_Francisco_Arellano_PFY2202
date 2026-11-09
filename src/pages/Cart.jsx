import { Link } from 'react-router-dom'
import { useInventory } from '../context/InventoryContext'
import { formatPrecio } from '../utils/format'

export default function Cart() {
  const { articulos, carrito, aumentarEnCarrito, disminuirEnCarrito } = useInventory()

  const lineas = carrito
    .map((linea) => ({
      ...linea,
      articulo: articulos.find((item) => item.id === linea.id),
    }))
    .filter((linea) => linea.articulo)

  const total = lineas.reduce(
    (suma, linea) => suma + linea.articulo.precio * linea.cantidad,
    0,
  )

  return (
    <section>
      <p className="text-xs font-semibold tracking-[0.18em] text-tomato-600 uppercase">Pedido</p>
      <h1 className="mt-2 font-display text-4xl text-leaf-900">Carrito</h1>

      {lineas.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-sand bg-white p-8">
          <p className="text-stone-700">Todavía no agregas artículos.</p>
          <Link
            to="/inventario"
            className="mt-4 inline-block rounded-full bg-leaf-800 px-5 py-2.5 font-semibold text-white"
          >
            Ir al inventario
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <ul className="space-y-3">
            {lineas.map((linea) => {
              const { articulo } = linea
              const sinStock = articulo.cantidad === 0
              return (
                <li
                  key={linea.id}
                  className="grid gap-4 rounded-2xl border border-sand bg-white p-4 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-leaf-900">{articulo.nombre}</h2>
                    <p className="text-sm text-stone-600">
                      {articulo.marca} · {articulo.tipo}
                    </p>
                    <p className="mt-1 text-sm text-stone-600">
                      {formatPrecio(articulo.precio)} · stock restante {articulo.cantidad}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => disminuirEnCarrito(articulo.id)}
                        aria-label={`Disminuir cantidad de ${articulo.nombre}`}
                        className="h-9 w-9 rounded-full border border-sand text-lg font-semibold"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">{linea.cantidad}</span>
                      <button
                        type="button"
                        onClick={() => aumentarEnCarrito(articulo.id)}
                        disabled={sinStock}
                        aria-label={`Aumentar cantidad de ${articulo.nombre}`}
                        className="h-9 w-9 rounded-full border border-sand text-lg font-semibold disabled:cursor-not-allowed disabled:text-stone-300"
                      >
                        +
                      </button>
                    </div>
                    <p className="min-w-24 text-right font-semibold">
                      {formatPrecio(articulo.precio * linea.cantidad)}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
          <p className="text-right font-display text-2xl text-leaf-900">Total {formatPrecio(total)}</p>
        </div>
      )}
    </section>
  )
}
