export function formatPrecio(valor) {
  const entero = Number.isInteger(valor)
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: entero ? 0 : 2,
  }).format(valor)
}
