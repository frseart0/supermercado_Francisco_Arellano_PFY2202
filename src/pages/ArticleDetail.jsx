import { Link, useParams } from 'react-router-dom'
import { useInventory } from '../context/InventoryContext'
import { formatPrecio } from '../utils/format'

export default function ArticleDetail() {
  const { id } = useParams()
  const { articulos, carrito, agregarAlCarrito } = useInventory()
  const articulo = articulos.find((item) => item.id === id)
  const enCarrito = carrito.find((linea) => linea.id === id)?.cantidad ?? 0

  if (!articulo) {
    return (
      <section className="rounded-3xl border border-sand bg-white p-8">
        <h1 className="font-display text-3xl text-leaf-900">Artículo no encontrado</h1>
        <p className="mt-3 text-stone-600">Ese producto no está en el inventario.</p>
        <Link to="/inventario" className="mt-6 inline-block font-semibold text-leaf-800">
          Volver al inventario
        </Link>
      </section>
    )
  }

  const sinStock = articulo.cantidad === 0

  return (
    <article className="rounded-3xl border border-sand bg-white p-6 md:p-8">
      <Link to="/inventario" className="text-sm font-semibold text-leaf-800">
        Volver al inventario
      </Link>
      <p className="mt-4 text-xs font-semibold tracking-[0.18em] text-tomato-600 uppercase">
        {articulo.tipo}
      </p>
      <h1 className="mt-2 font-display text-4xl text-leaf-900">{articulo.nombre}</h1>
      <p className="mt-2 text-lg text-stone-600">{articulo.marca}</p>
      <p className="mt-4 font-display text-3xl text-ink">{formatPrecio(articulo.precio)}</p>
      <p className="mt-4 max-w-2xl text-stone-700">
        {articulo.descripcion || 'Sin descripción.'}
      </p>
      <dl className="mt-6 grid max-w-md grid-cols-2 gap-4 text-sm">
        <div className="rounded-2xl bg-cream p-4">
          <dt className="text-stone-500">Stock disponible</dt>
          <dd className={sinStock ? 'text-xl font-semibold text-tomato-600' : 'text-xl font-semibold'}>
            {articulo.cantidad}
          </dd>
        </div>
        <div className="rounded-2xl bg-cream p-4">
          <dt className="text-stone-500">En el carrito</dt>
          <dd className="text-xl font-semibold">{enCarrito}</dd>
        </div>
      </dl>
      <button
        type="button"
        disabled={sinStock}
        onClick={() => agregarAlCarrito(articulo.id)}
        className="mt-6 rounded-full bg-leaf-800 px-5 py-2.5 font-semibold text-white disabled:cursor-not-allowed disabled:bg-stone-300"
      >
        {sinStock ? 'Sin stock' : 'Agregar al carrito'}
      </button>
    </article>
  )
}
