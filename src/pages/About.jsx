const datos = [
  { cifra: '1998', texto: 'Abrimos en una esquina de Compañía, con un solo pasillo y una caja.' },
  { cifra: '12', texto: 'Personas atienden sala, bodega y caja entre semana.' },
  { cifra: 'Yungay', texto: 'Seguimos en el mismo barrio. Los clientes llegan a pie.' },
]

export default function About() {
  return (
    <article className="space-y-8">
      <header>
        <p className="text-xs font-semibold tracking-[0.18em] text-tomato-600 uppercase">El local</p>
        <h1 className="mt-2 font-display text-4xl text-leaf-900">Quiénes somos</h1>
        <p className="mt-4 max-w-2xl text-lg text-stone-700">
          Mercado del Barrio es un supermercado de familia. Tres generaciones han comprado,
          ordenado y vendido en la misma cuadra de Barrio Yungay.
        </p>
      </header>

      <section className="rounded-3xl border border-sand bg-white p-6 md:p-8">
        <h2 className="font-display text-2xl text-leaf-900">Para qué estamos</h2>
        <p className="mt-3 max-w-2xl text-stone-700">
          Tener a mano lo que el barrio usa cada día: lácteos, despensa, bebidas y aseo.
          Compramos a productores cercanos cuando el producto lo permite
        </p>
        <p className="mt-3 max-w-2xl text-stone-700">
          El inventario de este sitio es el de la bodega. Lo que se agrega al carrito sale
          de esa misma lista, y lo que se devuelve vuelve a quedar disponible.
        </p>
      </section>

      <ul className="grid gap-4 md:grid-cols-3">
        {datos.map((dato) => (
          <li key={dato.cifra} className="rounded-2xl bg-leaf-900 p-5 text-cream">
            <p className="font-display text-3xl text-white">{dato.cifra}</p>
            <p className="mt-2 text-sm text-leaf-100">{dato.texto}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}
