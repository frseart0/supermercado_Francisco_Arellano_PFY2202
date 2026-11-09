import { useNavigate } from 'react-router-dom'
import { useInventory } from '../context/InventoryContext'
import { formatPrecio } from '../utils/format'

export default function InventoryList() {
  const { articulos, articulosFiltrados, categoria, setCategoria, tipos } = useInventory()
  const navigate = useNavigate()

  const resumen =
    categoria === 'todas'
      ? `${articulos.length} artículos en el inventario`
      : `${articulosFiltrados.length} de ${articulos.length} artículos · ${categoria}`

  function abrirDetalle(id) {
    navigate(`/inventario/${id}`)
  }

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-tomato-600 uppercase">Bodega</p>
          <h1 className="mt-2 font-display text-4xl text-leaf-900">Inventario</h1>
        </div>
        <label className="grid gap-1 text-sm font-semibold" htmlFor="categoria">
          Categoría
          <select
            id="categoria"
            value={categoria}
            onChange={(evento) => setCategoria(evento.target.value)}
            className="rounded-xl border border-sand bg-white px-3 py-2 font-normal"
          >
            <option value="todas">Todas</option>
            {tipos.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-stone-600">{resumen}</p>

      {articulosFiltrados.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-sand bg-white p-6 text-stone-600">
          No hay artículos en esta categoría. El resto del inventario sigue guardado.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-sand bg-white">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">Artículos del inventario</caption>
            <thead className="bg-leaf-50 text-xs tracking-wide text-stone-500 uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold">Nombre</th>
                <th className="px-4 py-3 font-semibold">Marca</th>
                <th className="px-4 py-3 font-semibold">Tipo</th>
                <th className="px-4 py-3 font-semibold">Stock</th>
                <th className="px-4 py-3 font-semibold">Precio</th>
              </tr>
            </thead>
            <tbody>
              {articulosFiltrados.map((articulo) => (
                <tr
                  key={articulo.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver ${articulo.nombre}`}
                  className="cursor-pointer border-t border-sand hover:bg-leaf-50"
                  onClick={() => abrirDetalle(articulo.id)}
                  onKeyDown={(evento) => {
                    if (evento.key === 'Enter' || evento.key === ' ') {
                      evento.preventDefault()
                      abrirDetalle(articulo.id)
                    }
                  }}
                >
                  <td className="px-4 py-3 font-semibold text-leaf-900">{articulo.nombre}</td>
                  <td className="px-4 py-3">{articulo.marca}</td>
                  <td className="px-4 py-3">{articulo.tipo}</td>
                  <td
                    className={[
                      'px-4 py-3 font-semibold',
                      articulo.cantidad === 0 ? 'text-tomato-600' : 'text-ink',
                    ].join(' ')}
                  >
                    {articulo.cantidad}
                  </td>
                  <td className="px-4 py-3">{formatPrecio(articulo.precio)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
