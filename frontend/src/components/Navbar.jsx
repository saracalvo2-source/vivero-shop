import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🌿 Varium</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Inicio</Link>
        <Link to="/catalogo" className={location.pathname === '/catalogo' ? 'active' : ''}>Catálogo</Link>
        <Link to="/agregar" className={location.pathname === '/agregar' ? 'active' : ''}>Agregar</Link>
        <Link to="/carrito" className={location.pathname === '/carrito' ? 'active' : ''}>🛒 Carrito</Link>
      </div>
    </nav>
  )
}

export default Navbar
