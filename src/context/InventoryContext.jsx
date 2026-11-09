import { createContext, useContext, useMemo, useState } from 'react'
import { articulosIniciales } from '../data/seed'

const InventoryContext = createContext(null)

function leerCantidad(valor) {
  const texto = String(valor).trim()
  if (!/^\d+$/.test(texto)) return null
  return Number(texto)
}

function leerPrecio(valor) {
  const texto = String(valor).trim().replace(',', '.')
  if (!/^\d+(\.\d{1,2})?$/.test(texto)) return null
  return Number(texto)
}

export function InventoryProvider({ children }) {
  const [inventario, setInventario] = useState({
    articulos: articulosIniciales,
    carrito: [],
  })
  const [categoria, setCategoria] = useState('todas')

  const { articulos, carrito } = inventario

  // El filtro solo cambia la vista. `articulos` conserva el inventario completo.
  const articulosFiltrados = useMemo(() => {
    if (categoria === 'todas') return articulos
    return articulos.filter((articulo) => articulo.tipo === categoria)
  }, [articulos, categoria])

  const tipos = useMemo(() => {
    return Array.from(new Set(articulos.map((articulo) => articulo.tipo))).sort((a, b) =>
      a.localeCompare(b, 'es'),
    )
  }, [articulos])

  function agregarArticulo(datos) {
    const nombre = String(datos.nombre ?? '').trim()
    const marca = String(datos.marca ?? '').trim()
    const tipo = String(datos.tipo ?? '').trim()
    const descripcion = String(datos.descripcion ?? '').trim()
    const cantidad = leerCantidad(datos.cantidad)
    const precio = leerPrecio(datos.precio)

    if (!nombre || !marca || !tipo) {
      return 'Nombre, marca y tipo son obligatorios.'
    }
    if (cantidad === null) {
      return 'La cantidad debe ser un número entero mayor o igual a 0.'
    }
    if (precio === null) {
      return 'El precio debe ser un número mayor o igual a 0.'
    }

    setInventario((prev) => ({
      ...prev,
      articulos: [
        {
          id: crypto.randomUUID(),
          nombre,
          marca,
          tipo,
          descripcion,
          cantidad,
          precio,
        },
        ...prev.articulos,
      ],
    }))

    return null
  }

  function ajustarCantidad(id, delta) {
    setInventario((prev) => {
      const articulo = prev.articulos.find((item) => item.id === id)
      if (!articulo) return prev

      const linea = prev.carrito.find((item) => item.id === id)
      const enCarrito = linea ? linea.cantidad : 0

      if (delta > 0 && articulo.cantidad < delta) return prev
      if (delta < 0 && enCarrito < Math.abs(delta)) return prev

      const articulosSiguientes = prev.articulos.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad - delta } : item,
      )

      const nuevaCantidad = enCarrito + delta
      let carritoSiguiente
      if (nuevaCantidad <= 0) {
        carritoSiguiente = prev.carrito.filter((item) => item.id !== id)
      } else if (linea) {
        carritoSiguiente = prev.carrito.map((item) =>
          item.id === id ? { ...item, cantidad: nuevaCantidad } : item,
        )
      } else {
        carritoSiguiente = [...prev.carrito, { id, cantidad: nuevaCantidad }]
      }

      return { articulos: articulosSiguientes, carrito: carritoSiguiente }
    })
  }

  const valor = {
    articulos,
    categoria,
    setCategoria,
    articulosFiltrados,
    tipos,
    agregarArticulo,
    carrito,
    agregarAlCarrito: (id) => ajustarCantidad(id, 1),
    aumentarEnCarrito: (id) => ajustarCantidad(id, 1),
    disminuirEnCarrito: (id) => ajustarCantidad(id, -1),
  }

  return <InventoryContext.Provider value={valor}>{children}</InventoryContext.Provider>
}

export function useInventory() {
  const contexto = useContext(InventoryContext)
  if (!contexto) {
    throw new Error('useInventory debe usarse dentro de InventoryProvider')
  }
  return contexto
}
