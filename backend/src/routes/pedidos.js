import { Router } from 'express'
import {
    crearPedido,
    getPedidos,
    getPedido,
    actualizarEstado
} from '../controllers/pedidosController.js'

const router = Router()

router.post('/', crearPedido)      // POST /api/pedidos
router.get('/', getPedidos)       // GET  /api/pedidos
router.get('/:id', getPedido)        // GET  /api/pedidos/:id
router.put('/:id/estado', actualizarEstado) // PUT  /api/pedidos/:id/estado

export default router