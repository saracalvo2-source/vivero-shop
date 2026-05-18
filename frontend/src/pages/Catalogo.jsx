import { useState, useEffect } from 'react'
import axios from 'axios'
import './Catalogo.css'

const imagenesLocales = {
  'monstera': '/Deliciosas.png',
  'deliciosa': '/Deliciosas.png',
  'cactus': '/Cactus.png',
  'orqu': '/Orquidea.png',
  'pothos': '/Pothos.png',
  'lavanda': '/Lavanda.png',
  'bamb': '/Bambu.png',
  'rosa': '/Rosas.png',
  'roja': '/Rosas.png',
}

const getImagen = (nombre) => {
  const lower = nombre.toLowerCase()
  for (const key of Object.keys(imagenesLocales)) {
    if (lower.includes(key)) return imagenesLocales[key]
  }
  return null
}

function Catalogo() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState(['Todas'])
  const [busqueda, setBusqueda] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas')
  const [notificacion, setNotificacion] = useState('')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    cargarProductos()
    cargarCategorias()
  }, [])

  useEffect(() => {
    cargarProductos()
  }, [busqueda, categoriaFiltro])

  const cargarProductos = async () => {
    try {
      const params = {}
      if (busqueda) params.buscar = busqueda
      if (categoriaFiltro !== 'Todas') params.categoria = categoriaFiltro
      const res = await axios.get('/api/productos', { params })
      setProductos(res.data.data)
    } catch (err) {
      console.error('Error cargando productos:', err)
    } finally {
      setCargando(false)
    }
  }

  const cargarCategorias = async () => {
    try {
      const res = await axios.get('/api/productos/categorias')
      setCategorias(['Todas', ...res.data.data])
    } catch (err) {
      console.error('Error cargando categorias:', err)
    }
  }

  const eliminarProducto = async (id, nombre) => {
    if (!window.confirm(`¿Eliminar ${nombre} del catálogo?`)) return
    try {
      await axios.delete(`/api/productos/${id}`)
      setNotificacion(`🗑 ${nombre} eliminado`)
      setTimeout(() => setNotificacion(''), 2500)
      cargarProductos()
    } catch (err) {
      console.error('Error eliminando producto:', err)
    }
  }

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
        <div className="busqueda-wrapper">
          <svg className="lupa-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Buscar planta..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="input-busqueda"
          />
        </div>
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

      {cargando ? (
        <div className="estado-vacio">🌿 Cargando plantas...</div>
      ) : productos.length === 0 ? (
        <div className="estado-vacio">🍂 No se encontraron plantas con ese filtro</div>
      ) : (
        <div className="productos-grid">
          {productos.map(producto => {
            const imagen = getImagen(producto.nombre)
            return (
              <div key={producto.id} className="producto-card">
                <div className="producto-imagen">
                  {imagen
                    ? <img src={imagen} alt={producto.nombre} />
                    : <span>{producto.emoji || '🌿'}</span>
                  }
                </div>
                <div className="producto-info">
                  <span className="producto-cat-tag">{producto.categoria}</span>
                  <h3>{producto.nombre}</h3>
                  <p>{producto.descripcion}</p>
                  <div className="producto-footer">
                    <span className="precio">${Number(producto.precio).toLocaleString()}</span>
                    <div className="footer-btns">
                      <button className="btn-agregar" onClick={() => agregarAlCarrito(producto)} title="Agregar al carrito">🛒</button>
                      <button className="btn-eliminar-prod" onClick={() => eliminarProducto(producto.id, producto.nombre)} title="Eliminar planta">✕</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Catalogo
