import { useState } from 'react'

const vacio = { nombre: '', correo: '', mensaje: '' }

export default function Contact() {
  const [form, setForm] = useState(vacio)
  const [enviado, setEnviado] = useState(false)

  function actualizar(evento) {
    const { name, value } = evento.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function enviar(evento) {
    evento.preventDefault()
    setEnviado(true)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section>
        <p className="text-xs font-semibold tracking-[0.18em] text-tomato-600 uppercase">Hablemos</p>
        <h1 className="mt-2 font-display text-4xl text-leaf-900">Contáctanos</h1>
        <p className="mt-4 text-stone-700">
          Escríbenos por un pedido especial, un producto que no encuentras o para avisar que
          pasas a retirar.
        </p>
        <dl className="mt-6 space-y-4 text-sm">
          <div>
            <dt className="font-semibold text-leaf-900">Dirección</dt>
            <dd className="text-stone-700">Compañía de Jesús 776, Barrio Yungay, Santiago</dd>
          </div>
          <div>
            <dt className="font-semibold text-leaf-900">Horario</dt>
            <dd className="text-stone-700">Lunes a sábado, 8:30 a 21:00. Domingo, 9:00 a 14:00.</dd>
          </div>
          <div>
            <dt className="font-semibold text-leaf-900">Teléfono</dt>
            <dd className="text-stone-700">+56 2 2345 6780</dd>
          </div>
          <div>
            <dt className="font-semibold text-leaf-900">Correo</dt>
            <dd className="text-stone-700">hola@mercadodelbarrio.cl</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-3xl border border-sand bg-white p-6">
        {enviado ? (
          <div>
            <h2 className="font-display text-2xl text-leaf-900">Mensaje recibido</h2>
            <p className="mt-3 text-stone-700">
              Gracias, {form.nombre.trim() || 'vecino'}. Te responderemos en{' '}
              {form.correo}.
            </p>
            <button
              type="button"
              className="mt-6 rounded-full bg-leaf-800 px-5 py-2.5 font-semibold text-white"
              onClick={() => {
                setForm(vacio)
                setEnviado(false)
              }}
            >
              Escribir otro mensaje
            </button>
          </div>
        ) : (
          <form onSubmit={enviar} className="grid gap-4">
            <h2 className="font-display text-2xl text-leaf-900">Escríbenos</h2>
            <label className="grid gap-1 text-sm font-semibold" htmlFor="nombre">
              Nombre
              <input
                id="nombre"
                name="nombre"
                value={form.nombre}
                onChange={actualizar}
                required
                autoComplete="name"
                className="rounded-xl border border-sand px-3 py-2 font-normal"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold" htmlFor="correo">
              Correo
              <input
                id="correo"
                name="correo"
                type="email"
                value={form.correo}
                onChange={actualizar}
                required
                autoComplete="email"
                className="rounded-xl border border-sand px-3 py-2 font-normal"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold" htmlFor="mensaje">
              Mensaje
              <textarea
                id="mensaje"
                name="mensaje"
                value={form.mensaje}
                onChange={actualizar}
                required
                rows={4}
                className="rounded-xl border border-sand px-3 py-2 font-normal"
              />
            </label>
            <button
              type="submit"
              className="rounded-full bg-leaf-800 px-5 py-2.5 font-semibold text-white"
            >
              Enviar mensaje
            </button>
          </form>
        )}
      </section>
    </div>
  )
}
