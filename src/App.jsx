import { Link, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import About from './pages/About'
import AddArticle from './pages/AddArticle'
import ArticleDetail from './pages/ArticleDetail'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Home from './pages/Home'
import InventoryList from './pages/InventoryList'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="quienes-somos" element={<About />} />
        <Route path="contacto" element={<Contact />} />
        <Route path="inventario" element={<InventoryList />} />
        <Route path="inventario/nuevo" element={<AddArticle />} />
        <Route path="inventario/:id" element={<ArticleDetail />} />
        <Route path="carrito" element={<Cart />} />
        <Route
          path="*"
          element={
            <section className="rounded-3xl border border-sand bg-white p-8">
              <h1 className="font-display text-3xl text-leaf-900">Página no encontrada</h1>
              <p className="mt-3 text-stone-600">Esa dirección no existe en el supermercado.</p>
              <Link to="/" className="mt-6 inline-block font-semibold text-leaf-800">
                Volver al inicio
              </Link>
            </section>
          }
        />
      </Route>
    </Routes>
  )
}
