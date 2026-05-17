import mysql from 'mysql2/promise'

// Pool de conexiones (reutiliza conexiones en vez de abrir una nueva por cada request)
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'vivero_shop',
    waitForConnections: true,
    connectionLimit: 10,
})

// Crea las tablas si no existen y carga datos de ejemplo
export async function initDB() {
    await pool.execute(`
    CREATE TABLE IF NOT EXISTS productos (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      nombre      VARCHAR(255)  NOT NULL,
      categoria   VARCHAR(100)  NOT NULL,
      precio      DECIMAL(10,2) NOT NULL CHECK(precio > 0),
      descripcion TEXT          NOT NULL,
      emoji       VARCHAR(10)   DEFAULT '🌿',
      stock       INT           NOT NULL DEFAULT 10,
      creado_en   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
    )
  `)

    await pool.execute(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id             INT AUTO_INCREMENT PRIMARY KEY,
      total          DECIMAL(10,2) NOT NULL,
      estado         ENUM('pendiente','confirmado','enviado','entregado','cancelado')
                     DEFAULT 'pendiente',
      nombre_cliente VARCHAR(255),
      creado_en      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

    await pool.execute(`
    CREATE TABLE IF NOT EXISTS pedido_items (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      pedido_id   INT           NOT NULL,
      producto_id INT           NOT NULL,
      nombre      VARCHAR(255)  NOT NULL,
      precio      DECIMAL(10,2) NOT NULL,
      cantidad    INT           NOT NULL DEFAULT 1,
      FOREIGN KEY (pedido_id)   REFERENCES pedidos(id)   ON DELETE CASCADE,
      FOREIGN KEY (producto_id) REFERENCES productos(id)
    )
  `)

    // Datos de ejemplo solo si la tabla está vacía
    const [rows] = await pool.execute('SELECT COUNT(*) AS n FROM productos')
    if (rows[0].n === 0) {
        await pool.execute(`
      INSERT INTO productos (nombre, categoria, precio, descripcion, emoji, stock) VALUES
      ('Monstera Deliciosa',    'Interior',   45000, 'Planta tropical de gran tamaño, perfecta para interiores luminosos.',    '🌿', 8),
      ('Cactus San Pedro',      'Exterior',   28000, 'Cactus resistente y de bajo mantenimiento, ideal para jardines.',        '🌵', 12),
      ('Orquídea Phalaenopsis', 'Flores',     65000, 'Elegante flor con una floración duradera y colores vibrantes.',         '🌸', 6),
      ('Pothos Dorado',         'Interior',   18000, 'Planta colgante de fácil cuidado, purifica el aire del hogar.',         '🍃', 15),
      ('Lavanda Francesa',      'Flores',     22000, 'Aromática y hermosa, perfecta para jardines y balcones.',               '💜', 10),
      ('Bambú de la Suerte',    'Interior',   35000, 'Símbolo de buena fortuna, requiere poca luz y agua.',                   '🎋', 9)
    `)
        console.log('✅ 6 productos de ejemplo insertados')
    }

    console.log('✅ Base de datos lista')
}

export default pool