import { Link } from 'react-router-dom'
import { useInventory } from '../context/InventoryContext'
import { formatPrecio } from '../utils/format'

export default function Home() {
  const { articulos, carrito } = useInventory()
  const unidades = articulos.reduce((suma, articulo) => suma + articulo.cantidad, 0)
  const enCarrito = carrito.reduce((suma, linea) => suma + linea.cantidad, 0)
  const destacados = articulos.slice(0, 3)

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-3xl bg-leaf-900 text-cream">
        <div className="grid gap-8 p-6 md:grid-cols-[1.4fr_0.8fr] md:p-10">
          <div>
            <h1 className="mt-3 font-display text-4xl leading-tight text-white md:text-5xl">
              Lo fresco del día, a la vuelta de la esquina.
            </h1>
            <p className="mt-4 max-w-xl text-base text-leaf-100">
              Mercado del Barrio es el supermercado de Yungay.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/inventario"
                className="rounded-full bg-white px-5 py-2.5 font-semibold text-leaf-900"
              >
                Ver inventario
              </Link>
              <Link
                to="/quienes-somos"
                className="rounded-full border border-white/40 px-5 py-2.5 font-semibold text-white"
              >
                Conocer el local
              </Link>
            </div>
          </div>
          <dl className="grid grid-cols-3 gap-3 md:grid-cols-1">
            <div className="rounded-2xl bg-white/10 p-4">
              <dt className="text-sm text-leaf-100">Productos</dt>
              <dd className="font-display text-3xl text-white">{articulos.length}</dd>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <dt className="text-sm text-leaf-100">Unidades</dt>
              <dd className="font-display text-3xl text-white">{unidades}</dd>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <dt className="text-sm text-leaf-100">En el carrito</dt>
              <dd className="font-display text-3xl text-white">{enCarrito}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl text-leaf-900">Hoy en góndola</h2>
          <Link to="/inventario" className="text-sm font-semibold text-leaf-800">
            Ver todo
          </Link>
        </div>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {destacados.map((articulo) => (
            <li key={articulo.id} className="rounded-2xl border border-sand bg-white p-4">
              <p className="text-xs font-semibold tracking-wide text-tomato-600 uppercase">
                {articulo.tipo}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{articulo.nombre}</h3>
              <p className="text-sm text-stone-600">{articulo.marca}</p>
              <p className="mt-3 font-semibold text-leaf-800">{formatPrecio(articulo.precio)}</p>
              <Link
                to={`/inventario/${articulo.id}`}
                className="mt-3 inline-block text-sm font-semibold text-leaf-800"
              >
                Ver detalle
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
