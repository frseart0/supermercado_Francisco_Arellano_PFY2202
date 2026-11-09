import { NavLink } from 'react-router-dom'

function claseEnlace({ isActive }) {
  return [
    'flex flex-col items-center gap-1 px-1 py-3 text-center text-[11px] leading-tight font-semibold sm:text-xs',
    isActive ? 'text-leaf-800' : 'text-stone-500',
  ].join(' ')
}

function IconoInicio() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
    </svg>
  )
}

function IconoPersonas() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9" r="2.2" />
      <path d="M16 19a4.5 4.5 0 0 1 4.5-4" />
    </svg>
  )
}

function IconoCorreo() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

export default function BottomNav() {
  return (
    <nav
      aria-label="Principal"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-sand bg-cream/95 backdrop-blur"
    >
      <ul className="mx-auto flex max-w-5xl">
        <li className="flex-1">
          <NavLink to="/" end className={claseEnlace}>
            <IconoInicio />
            Inicio
          </NavLink>
        </li>
        <li className="flex-1">
          <NavLink to="/quienes-somos" className={claseEnlace}>
            <IconoPersonas />
            Quiénes somos
          </NavLink>
        </li>
        <li className="flex-1">
          <NavLink to="/contacto" className={claseEnlace}>
            <IconoCorreo />
            Contáctanos
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
