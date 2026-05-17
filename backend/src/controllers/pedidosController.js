import pool from '../db/database.js'

// Helper: trae un pedido completo con sus items
async function getPedidoCompleto(id) {
    const [pedidos] = await pool.execute(
        'SELECT * FROM pedidos WHERE id = ?', [id]
    )
    if (!pedidos.length) return null

    const [items] = await pool.execute(
        'SELECT * FROM pedido_items WHERE pedido_id = ?', [id]
    )
    return { ...pedidos[0], items }
}

// ─── POST /api/pedidos ────────────────────────────────────────────────────────
// Llamado desde Carrito.jsx al pulsar "Realizar Pedido →"
// Body: { nombre_cliente?: string, items: [{ id, nombre, precio, cantidad, emoji }] }
export const crearPedido = async (req, res) => {
    const conn = await pool.getConnection()
    try {
        const { items, nombre_cliente } = req.body

        if (!items || !Array.isArray(items) || items.length === 0)
            return res.status(400).json({ ok: false, mensaje: 'El carrito está vacío' })

        // Verificar stock de cada producto antes de hacer nada
        for (const item of items) {
            const [rows] = await conn.execute(
                'SELECT * FROM productos WHERE id = ?', [item.id]
            )
            if (!rows.length)
                return res.status(404).json({
                    ok: false,
                    mensaje: `Producto "${item.nombre}" ya no existe en el catálogo`
                })
            if (rows[0].stock < item.cantidad)
                return res.status(400).json({
                    ok: false,
                    mensaje: `Stock insuficiente para "${rows[0].nombre}". Solo quedan ${rows[0].stock} unidades`
                })
        }

        // Calcular total
        const total = items.reduce((sum, i) => sum + i.precio * i.cantidad, 0)

        // Transacción: todo o nada
        await conn.beginTransaction()

        // 1. Crear el pedido
        const [pedidoResult] = await conn.execute(
            'INSERT INTO pedidos (total, nombre_cliente) VALUES (?, ?)',
            [total, nombre_cliente || 'Cliente']
        )
        const pedidoId = pedidoResult.insertId

        // 2. Insertar cada item y descontar stock
        for (const item of items) {
            await conn.execute(
                'INSERT INTO pedido_items (pedido_id, producto_id, nombre, precio, cantidad) VALUES (?, ?, ?, ?, ?)',
                [pedidoId, item.id, item.nombre, item.precio, item.cantidad]
            )
            await conn.execute(
                'UPDATE productos SET stock = stock - ? WHERE id = ?',
                [item.cantidad, item.id]
            )
        }

        await conn.commit()

        const pedido = await getPedidoCompleto(pedidoId)
        res.status(201).json({
            ok: true,
            mensaje: '¡Pedido realizado! Tu pedido está en camino.',
            data: pedido
        })
    } catch (err) {
        await conn.rollback()
        res.status(500).json({ ok: false, mensaje: err.message })
    } finally {
        conn.release()
    }
}

// ─── GET /api/pedidos ─────────────────────────────────────────────────────────
// Lista todos los pedidos (útil para un panel de administración)
export const getPedidos = async (req, res) => {
    try {
        const [pedidos] = await pool.execute(`
      SELECT p.*, COUNT(pi.id) AS total_items
      FROM pedidos p
      LEFT JOIN pedido_items pi ON pi.pedido_id = p.id
      GROUP BY p.id
      ORDER BY p.creado_en DESC
    `)
        res.json({ ok: true, data: pedidos })
    } catch (err) {
        res.status(500).json({ ok: false, mensaje: err.message })
    }
}

// ─── GET /api/pedidos/:id ─────────────────────────────────────────────────────
// Detalle de un pedido con todos sus items
export const getPedido = async (req, res) => {
    try {
        const pedido = await getPedidoCompleto(req.params.id)
        if (!pedido)
            return res.status(404).json({ ok: false, mensaje: 'Pedido no encontrado' })
        res.json({ ok: true, data: pedido })
    } catch (err) {
        res.status(500).json({ ok: false, mensaje: err.message })
    }
}

// ─── PUT /api/pedidos/:id/estado ──────────────────────────────────────────────
// Actualizar el estado de un pedido
export const actualizarEstado = async (req, res) => {
    try {
        const { estado } = req.body
        const estados = ['pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado']

        if (!estados.includes(estado))
            return res.status(400).json({
                ok: false,
                mensaje: `Estado inválido. Opciones: ${estados.join(', ')}`
            })

        const [rows] = await pool.execute(
            'SELECT id FROM pedidos WHERE id = ?', [req.params.id]
        )
        if (!rows.length)
            return res.status(404).json({ ok: false, mensaje: 'Pedido no encontrado' })

        await pool.execute(
            'UPDATE pedidos SET estado = ? WHERE id = ?', [estado, req.params.id]
        )
        res.json({
            ok: true,
            mensaje: `Estado actualizado a "${estado}"`,
            data: { id: Number(req.params.id), estado }
        })
    } catch (err) {
        res.status(500).json({ ok: false, mensaje: err.message })
    }
}