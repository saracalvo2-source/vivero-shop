import { useState } from 'react'
import './AgregarProducto.css'

function AgregarProducto() {
  const [form, setForm] = useState({ nombre: '', categoria: '', precio: '', descripcion: '' })
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [exito, setExito] = useState(false)
  const [errorGeneral, setErrorGeneral] = useState('')

  const validar = () => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'El nombre es obligatorio'
    if (!form.categoria) e.categoria = 'Selecciona una categoría'
    if (!form.precio || isNaN(form.precio) || Number(form.precio) <= 0)
      e.precio = 'Ingresa un precio válido mayor a 0'
    if (!form.descripcion.trim() || form.descripcion.length < 10)
      e.descripcion = 'La descripción debe tener al menos 10 caracteres'
    return e
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errores[e.target.name]) setErrores({ ...errores, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorGeneral('')
    const nuevosErrores = validar()
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }
    setEnviando(true)
    try {
      // Aquí va la llamada real al backend:
      // await axios.post('http://localhost:3000/api/productos', form)
      await new Promise(r => setTimeout(r, 1400))
      setExito(true)
      setForm({ nombre: '', categoria: '', precio: '', descripcion: '' })
      setErrores({})
      setTimeout(() => setExito(false), 3500)
    } catch {
      setErrorGeneral('Ocurrió un error al guardar. Intenta de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="agregar-page">
      <div className="agregar-container">
        <div className="agregar-header">
          <h1>🌱 Agregar Planta</h1>
          <p>Añade una nueva planta al catálogo de Varium</p>
        </div>

        {exito && <div className="alerta exito">✅ ¡Planta agregada exitosamente al catálogo!</div>}
        {errorGeneral && <div className="alerta error-gen">❌ {errorGeneral}</div>}

        <form onSubmit={handleSubmit} className="form-planta" noValidate>
          <div className="campo">
            <label>Nombre de la planta *</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Monstera Deliciosa"
              className={errores.nombre ? 'input-error' : ''}
            />
            {errores.nombre && <span className="msg-error">{errores.nombre}</span>}
          </div>

          <div className="campo">
            <label>Categoría *</label>
            <select
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              className={errores.categoria ? 'input-error' : ''}
            >
              <option value="">Selecciona una categoría</option>
              <option value="Interior">Interior</option>
              <option value="Exterior">Exterior</option>
              <option value="Flores">Flores</option>
              <option value="Suculentas">Suculentas</option>
            </select>
            {errores.categoria && <span className="msg-error">{errores.categoria}</span>}
          </div>

          <div className="campo">
            <label>Precio (COP) *</label>
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              placeholder="Ej: 45000"
              min="1"
              className={errores.precio ? 'input-error' : ''}
            />
            {errores.precio && <span className="msg-error">{errores.precio}</span>}
          </div>

          <div className="campo">
            <label>Descripción *</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Describe la planta, sus cuidados, características..."
              rows={4}
              className={errores.descripcion ? 'input-error' : ''}
            />
            <span className="char-count">{form.descripcion.length} caracteres</span>
            {errores.descripcion && <span className="msg-error">{errores.descripcion}</span>}
          </div>

          <button type="submit" className="btn-submit" disabled={enviando}>
            {enviando ? '🌿 Guardando...' : '✅ Agregar Planta'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AgregarProducto
