import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInventory } from '../context/InventoryContext'

const inicial = {
  nombre: '',
  marca: '',
  tipo: '',
  cantidad: '',
  precio: '',
  descripcion: '',
}

const claseCampo = 'rounded-xl border border-sand px-3 py-2 font-normal'

export default function AddArticle() {
  const { agregarArticulo, tipos } = useInventory()
  const navigate = useNavigate()
  const [form, setForm] = useState(inicial)
  const [error, setError] = useState('')

  function actualizar(evento) {
    const { name, value } = evento.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function enviar(evento) {
    evento.preventDefault()
    const mensaje = agregarArticulo(form)
    if (mensaje) {
      setError(mensaje)
      return
    }
    navigate('/inventario')
  }

  return (
    <section>
      <p className="text-xs font-semibold tracking-[0.18em] text-tomato-600 uppercase">Alta</p>
      <h1 className="mt-2 font-display text-4xl text-leaf-900">Agregar artículo</h1>
      <p className="mt-3 max-w-2xl text-stone-700">
        El producto entra al inventario compartido. Nombre, marca y tipo son obligatorios.
        Si el tipo no existe, se crea y queda disponible en el filtro.
      </p>

      <form onSubmit={enviar} className="mt-6 grid gap-4 rounded-3xl border border-sand bg-white p-5 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold" htmlFor="nombre">
          Nombre
          <input
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={actualizar}
            required
            className={claseCampo}
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold" htmlFor="marca">
          Marca
          <input
            id="marca"
            name="marca"
            value={form.marca}
            onChange={actualizar}
            required
            className={claseCampo}
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold" htmlFor="tipo">
          Tipo de producto
          <input
            id="tipo"
            name="tipo"
            value={form.tipo}
            onChange={actualizar}
            list="tipos-producto"
            required
            placeholder="Lácteos, Abarrotes, Bebidas..."
            className={claseCampo}
          />
          <datalist id="tipos-producto">
            {tipos.map((tipo) => (
              <option key={tipo} value={tipo} />
            ))}
          </datalist>
        </label>
        <label className="grid gap-1 text-sm font-semibold" htmlFor="cantidad">
          Cantidad
          <input
            id="cantidad"
            name="cantidad"
            value={form.cantidad}
            onChange={actualizar}
            inputMode="numeric"
            required
            placeholder="12"
            className={claseCampo}
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold" htmlFor="precio">
          Precio (pesos, sin puntos de miles)
          <input
            id="precio"
            name="precio"
            value={form.precio}
            onChange={actualizar}
            inputMode="decimal"
            required
            placeholder="1290"
            className={claseCampo}
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold sm:col-span-2" htmlFor="descripcion">
          Descripción
          <textarea
            id="descripcion"
            name="descripcion"
            value={form.descripcion}
            onChange={actualizar}
            rows={3}
            className={claseCampo}
          />
        </label>
        {error && (
          <p role="alert" className="text-sm font-semibold text-tomato-600 sm:col-span-2">
            {error}
          </p>
        )}
        <div className="sm:col-span-2">
          <button type="submit" className="rounded-full bg-leaf-800 px-5 py-2.5 font-semibold text-white">
            Guardar en el inventario
          </button>
        </div>
      </form>
    </section>
  )
}
