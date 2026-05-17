import pool from '../db/database.js'

// ─── GET /api/productos ───────────────────────────────────────────────────────
// Usado en Catalogo.jsx para mostrar la grilla de plantas
// Acepta ?buscar=monstera  ?categoria=Interior  ?orden=precio_asc
export const getProductos = async (req, res) => {
    try {
        const { buscar, categoria, orden } = req.query
        let sql = 'SELECT * FROM productos WHERE 1=1'
        const params = []

        if (buscar) {
            sql += ' AND (nombre LIKE ? OR descripcion LIKE ?)'
            params.push(`%${buscar}%`, `%${buscar}%`)
        }
        if (categoria && categoria !== 'Todas') {
            sql += ' AND categoria = ?'
            params.push(categoria)
        }

        if (orden === 'precio_asc') sql += ' ORDER BY precio ASC'
        else if (orden === 'precio_desc') sql += ' ORDER BY precio DESC'
        else if (orden === 'nombre') sql += ' ORDER BY nombre ASC'
        else sql += ' ORDER BY creado_en DESC'

        const [productos] = await pool.execute(sql, params)
        res.json({ ok: true, data: productos })
    } catch (err) {
        res.status(500).json({ ok: false, mensaje: err.message })
    }
}

// ─── GET /api/productos/categorias ───────────────────────────────────────────
// Usado en Catalogo.jsx para pintar los botones de filtro dinámicamente
export const getCategorias = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT DISTINCT categoria FROM productos ORDER BY categoria'
        )
        res.json({ ok: true, data: rows.map(r => r.categoria) })
    } catch (err) {
        res.status(500).json({ ok: false, mensaje: err.message })
    }
}

// ─── GET /api/productos/:id ───────────────────────────────────────────────────
// Detalle de un producto (útil para una futura página de detalle)
export const getProducto = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM productos WHERE id = ?', [req.params.id]
        )
        if (!rows.length)
            return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' })
        res.json({ ok: true, data: rows[0] })
    } catch (err) {
        res.status(500).json({ ok: false, mensaje: err.message })
    }
}

// ─── POST /api/productos ──────────────────────────────────────────────────────
// Llamado desde AgregarProducto.jsx al enviar el formulario
// Body: { nombre, categoria, precio, descripcion, emoji? }
export const crearProducto = async (req, res) => {
    try {
        const { nombre, categoria, precio, descripcion, emoji, stock } = req.body

        // Validaciones (el frontend ya valida, pero el backend siempre debe validar también)
        if (!nombre?.trim() || !categoria || !precio || !descripcion?.trim())
            return res.status(400).json({
                ok: false,
                mensaje: 'Faltan campos obligatorios: nombre, categoría, precio y descripción'
            })

        if (isNaN(precio) || Number(precio) <= 0)
            return res.status(400).json({
                ok: false,
                mensaje: 'El precio debe ser un número mayor a 0'
            })

        if (descripcion.trim().length < 10)
            return res.status(400).json({
                ok: false,
                mensaje: 'La descripción debe tener al menos 10 caracteres'
            })

        const [result] = await pool.execute(
            'INSERT INTO productos (nombre, categoria, precio, descripcion, emoji, stock) VALUES (?, ?, ?, ?, ?, ?)',
            [
                nombre.trim(),
                categoria.trim(),
                Number(precio),
                descripcion.trim(),
                emoji?.trim() || '🌿',
                Number(stock) || 10
            ]
        )

        const [rows] = await pool.execute(
            'SELECT * FROM productos WHERE id = ?', [result.insertId]
        )
        res.status(201).json({
            ok: true,
            mensaje: '¡Planta agregada exitosamente al catálogo!',
            data: rows[0]
        })
    } catch (err) {
        res.status(500).json({ ok: false, mensaje: err.message })
    }
}

// ─── PUT /api/productos/:id ───────────────────────────────────────────────────
// Editar un producto existente (útil para un panel de administración)
export const editarProducto = async (req, res) => {
    try {
        const [existing] = await pool.execute(
            'SELECT * FROM productos WHERE id = ?', [req.params.id]
        )
        if (!existing.length)
            return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' })

        const p = existing[0]
        const { nombre, categoria, precio, descripcion, emoji, stock } = req.body

        await pool.execute(
            'UPDATE productos SET nombre=?, categoria=?, precio=?, descripcion=?, emoji=?, stock=? WHERE id=?',
            [
                nombre?.trim() ?? p.nombre,
                categoria?.trim() ?? p.categoria,
                Number(precio) || p.precio,
                descripcion?.trim() ?? p.descripcion,
                emoji?.trim() ?? p.emoji,
                Number(stock) ?? p.stock,
                req.params.id
            ]
        )

        const [rows] = await pool.execute(
            'SELECT * FROM productos WHERE id = ?', [req.params.id]
        )
        res.json({ ok: true, mensaje: 'Producto actualizado', data: rows[0] })
    } catch (err) {
        res.status(500).json({ ok: false, mensaje: err.message })
    }
}

// ─── DELETE /api/productos/:id ────────────────────────────────────────────────
// Eliminar un producto del catálogo
export const eliminarProducto = async (req, res) => {
    try {
        const [existing] = await pool.execute(
            'SELECT * FROM productos WHERE id = ?', [req.params.id]
        )
        if (!existing.length)
            return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' })

        await pool.execute('DELETE FROM productos WHERE id = ?', [req.params.id])
        res.json({ ok: true, mensaje: `"${existing[0].nombre}" eliminado del catálogo` })
    } catch (err) {
        res.status(500).json({ ok: false, mensaje: err.message })
    }
}