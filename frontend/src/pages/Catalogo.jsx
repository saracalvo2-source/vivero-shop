import { useState } from 'react'
import './Catalogo.css'

const productosDemo = [
  { id: 1, nombre: 'Monstera Deliciosa', categoria: 'Interior', precio: 45000, descripcion: 'Planta tropical de gran tamaño, perfecta para interiores luminosos.', emoji: '🌿' },
  { id: 2, nombre: 'Cactus San Pedro', categoria: 'Exterior', precio: 28000, descripcion: 'Cactus resistente y de bajo mantenimiento, ideal para jardines.', emoji: '🌵' },
  { id: 3, nombre: 'Orquídea Phalaenopsis', categoria: 'Flores', precio: 65000, descripcion: 'Elegante flor con una floración duradera y colores vibrantes.', emoji: '🌸' },
  { id: 4, nombre: 'Pothos Dorado', categoria: 'Interior', precio: 18000, descripcion: 'Planta colgante de fácil cuidado, purifica el aire del hogar.', emoji: '🍃' },
  { id: 5, nombre: 'Lavanda Francesa', categoria: 'Flores', precio: 22000, descripcion: 'Aromática y hermosa, perfecta para jardines y balcones.', emoji: '💜' },
  { id: 6, nombre: 'Bambú de la Suerte', categoria: 'Interior', precio: 35000, descripcion: 'Símbolo de buena fortuna, requiere poca luz y agua.', emoji: '🎋' },
]

const categorias = ['Todas', 'Interior', 'Exterior', 'Flores']

function Catalogo() {
  const [busqueda, setBusqueda] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas')
  const [notificacion, setNotificacion] = useState('')

  const productosFiltrados = productosDemo.filter(p => {
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria = categoriaFiltro === 'Todas' || p.categoria === categoriaFiltro
    return coincideBusqueda && coincideCategoria
  })

  const agregarAlCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]')
    const existe = carritoActual.find(p => p.id === producto.id)
    if (existe) {
      const actualizado = carritoActual.map(p =>
        p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
      )
      localStorage.setItem('carrito', JSON.stringify(actualizado))
    } else {
      localStorage.setItem('carrito', JSON.stringify([...carritoActual, { ...producto, cantidad: 1 }]))
    }
    setNotificacion(`✅ ${producto.nombre} agregado`)
    setTimeout(() => setNotificacion(''), 2500)
  }

  return (
    <div className="catalogo">
      {notificacion && <div className="notificacion">{notificacion}</div>}

      <div className="catalogo-header">
        <h1>Nuestras Plantas</h1>
        <p>Encuentra la planta perfecta para ti</p>
      </div>

      <div className="catalogo-filtros">
        <input
          type="text"
          placeholder="🔍 Buscar planta..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="input-busqueda"
        />
        <div className="categorias-filtro">
          {categorias.map(cat => (
            <button
              key={cat}
              className={`btn-cat ${categoriaFiltro === cat ? 'activo' : ''}`}
              onClick={() => setCategoriaFiltro(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {productosFiltrados.length === 0 ? (
        <div className="estado-vacio">🍂 No se encontraron plantas con ese filtro</div>
      ) : (
        <div className="productos-grid">
          {productosFiltrados.map(producto => (
            <div key={producto.id} className="producto-card">
              <div className="producto-imagen">{producto.emoji}</div>
              <div className="producto-info">
                <span className="producto-cat-tag">{producto.categoria}</span>
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <div className="producto-footer">
                  <span className="precio">${producto.precio.toLocaleString()}</span>
                  <button className="btn-agregar" onClick={() => agregarAlCarrito(producto)} title="Agregar al carrito">
                    🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Catalogo
