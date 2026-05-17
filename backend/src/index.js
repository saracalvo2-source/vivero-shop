import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync } from 'fs'

import { initDB } from './db/database.js'
import productosRoutes from './routes/productos.js'
import pedidosRoutes from './routes/pedidos.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 3000

// Crear carpeta uploads si no existe
mkdirSync(join(__dirname, '../uploads'), { recursive: true })

const app = express()

// ── Middlewares ──────────────────────────────────────────────────────────────

app.use(cors({
    // Permite peticiones desde el frontend de Vite en desarrollo
    origin: ['http://localhost:5173', 'http://localhost:4173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Servir imágenes subidas como archivos estáticos
app.use('/uploads', express.static(join(__dirname, '../uploads')))

// ── Rutas ────────────────────────────────────────────────────────────────────

app.use('/api/productos', productosRoutes)
app.use('/api/pedidos', pedidosRoutes)

// Ruta de salud — útil para verificar que el servidor corre
app.get('/api/health', (req, res) => {
    res.json({ ok: true, mensaje: 'Vivero Shop Backend funcionando 🌿' })
})

// 404 para rutas no definidas
app.use((req, res) => {
    res.status(404).json({ ok: false, mensaje: `Ruta ${req.method} ${req.path} no existe` })
})

// Manejo global de errores
app.use((err, req, res, next) => {
    console.error('❌', err.message)
    res.status(500).json({ ok: false, mensaje: err.message })
})

// ── Arranque ─────────────────────────────────────────────────────────────────

initDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`
🌿 ══════════════════════════════════
   Vivero Shop Backend corriendo
   http://localhost:${PORT}
🌿 ══════════════════════════════════

  GET    /api/health
  GET    /api/productos
  GET    /api/productos/categorias
  GET    /api/productos/:id
  POST   /api/productos
  PUT    /api/productos/:id
  DELETE /api/productos/:id

  POST   /api/pedidos
  GET    /api/pedidos
  GET    /api/pedidos/:id
  PUT    /api/pedidos/:id/estado
      `)
        })
    })
    .catch(err => {
        console.error(' No se pudo conectar a MySQL:', err.message)
        console.error(' Revisa el archivo .env y que MySQL esté corriendo')
        process.exit(1)
    })