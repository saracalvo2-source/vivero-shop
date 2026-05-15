import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Carrito.css'

function Carrito() {
  const [carrito, setCarrito] = useState([])
  const [pedidoEnviado, setPedidoEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    const guardado = JSON.parse(localStorage.getItem('carrito') || '[]')
    setCarrito(guardado)
  }, [])

  const actualizar = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) { eliminar(id); return }
    const actualizado = carrito.map(p => p.id === id ? { ...p, cantidad: nuevaCantidad } : p)
    setCarrito(actualizado)
    localStorage.setItem('carrito', JSON.stringify(actualizado))
  }

  const eliminar = (id) => {
    const actualizado = carrito.filter(p => p.id !== id)
    setCarrito(actualizado)
    localStorage.setItem('carrito', JSON.stringify(actualizado))
  }

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0)

  const realizarPedido = async () => {
    setEnviando(true)
    try {
      // Aquí va la llamada real al backend:
      // await axios.post('http://localhost:3000/api/pedidos', { items: carrito })
      await new Promise(r => setTimeout(r, 1500))
      setPedidoEnviado(true)
      setCarrito([])
      localStorage.removeItem('carrito')
    } finally {
      setEnviando(false)
    }
  }

  if (pedidoEnviado) {
    return (
      <div className="carrito-page">
        <div className="pedido-exito">
          <span className="exito-icono">🎉</span>
          <h2>¡Pedido realizado!</h2>
          <p>Gracias por tu compra. Tu pedido está en camino.</p>
          <Link to="/catalogo" className="btn-volver">Seguir comprando</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="carrito-page">
      <h1>🛒 Mi Carrito</h1>

      {carrito.length === 0 ? (
        <div className="carrito-vacio">
          <span>🌿</span>
          <p>Tu carrito está vacío</p>
          <Link to="/catalogo" className="btn-ir-catalogo">Ver Catálogo</Link>
        </div>
      ) : (
        <div className="carrito-contenido">
          <div className="carrito-items">
            {carrito.map(item => (
              <div key={item.id} className="carrito-item">
                <span className="item-emoji">{item.emoji}</span>
                <div className="item-info">
                  <h3>{item.nombre}</h3>
                  <p className="item-cat">{item.categoria}</p>
                </div>
                <div className="item-cantidad">
                  <button onClick={() => actualizar(item.id, item.cantidad - 1)}>−</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => actualizar(item.id, item.cantidad + 1)}>+</button>
                </div>
                <div className="item-subtotal">
                  ${(item.precio * item.cantidad).toLocaleString()}
                </div>
                <button className="btn-eliminar" onClick={() => eliminar(item.id)}>✕</button>
              </div>
            ))}
          </div>

          <div className="carrito-resumen">
            <h2>Resumen del pedido</h2>
            <div className="resumen-linea">
              <span>Subtotal ({carrito.reduce((a, p) => a + p.cantidad, 0)} plantas)</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <div className="resumen-linea">
              <span>Envío</span>
              <span className="gratis">Gratis 🌿</span>
            </div>
            <div className="resumen-total">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <button className="btn-pedir" onClick={realizarPedido} disabled={enviando}>
              {enviando ? '🌿 Procesando...' : 'Realizar Pedido →'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Carrito
