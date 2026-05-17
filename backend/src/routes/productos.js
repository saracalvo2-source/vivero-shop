import { Router } from 'express'
import {
    getProductos,
    getCategorias,
    getProducto,
    crearProducto,
    editarProducto,
    eliminarProducto
} from '../controllers/productosController.js'

const router = Router()

// Orden importante: /categorias debe ir ANTES que /:id
// para que Express no confunda "categorias" con un id
router.get('/categorias', getCategorias)   // GET /api/productos/categorias
router.get('/', getProductos)    // GET /api/productos
router.get('/:id', getProducto)     // GET /api/productos/:id
router.post('/', crearProducto)   // POST /api/productos
router.put('/:id', editarProducto)  // PUT  /api/productos/:id
router.delete('/:id', eliminarProducto)// DELETE /api/productos/:id

export default router