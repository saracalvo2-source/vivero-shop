import { Link } from 'react-router-dom'
import './Inicio.css'

function Inicio() {
  return (
    <div className="inicio">
      <div className="hero">
        <video
          className="video-fondo"
          src="/bosque.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="video-overlay" />

        <div className="hero-content">
          <p className="hero-tag">✦ Tienda de plantas</p>
          <h1 className="hero-title">Varium</h1>
          <p className="hero-desc">
            Descubre plantas únicas que traen vida y magia a tu hogar.
            Cada planta cuenta una historia del bosque encantado.
          </p>
          <div className="hero-buttons">
            <Link to="/catalogo" className="btn-primary">Explorar Plantas</Link>
            <Link to="/carrito" className="btn-secondary">🛒 Mi Carrito</Link>
          </div>
        </div>
      </div>

      <div className="seccion-features">
        <div className="feature-card">
          <span className="feature-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22V12"/>
              <path d="M12 12C12 12 8 9 8 5a4 4 0 0 1 8 0c0 4-4 7-4 7z"/>
              <path d="M12 12C12 12 16 9.5 18 7"/>
              <path d="M12 12C12 12 8 9.5 6 7"/>
            </svg>
          </span>
          <h3>Plantas Únicas</h3>
          <p>Selección curada de las plantas más especiales del bosque</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="1"/>
              <path d="M16 8h4l3 5v3h-7V8z"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </span>
          <h3>Envío Seguro</h3>
          <p>Recibe tus plantas con cuidado especial directamente en tu puerta</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </span>
          <h3>Garantía Verde</h3>
          <p>Si tu planta no llega perfecta, te la reemplazamos sin costo</p>
        </div>
      </div>
    </div>
  )
}

export default Inicio
