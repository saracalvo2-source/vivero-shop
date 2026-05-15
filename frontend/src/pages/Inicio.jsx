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
          <span className="feature-icon">🌱</span>
          <h3>Plantas Únicas</h3>
          <p>Selección curada de las plantas más especiales del bosque</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🚚</span>
          <h3>Envío Seguro</h3>
          <p>Recibe tus plantas con cuidado especial directamente en tu puerta</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">💚</span>
          <h3>Garantía Verde</h3>
          <p>Si tu planta no llega perfecta, te la reemplazamos sin costo</p>
        </div>
      </div>
    </div>
  )
}

export default Inicio
