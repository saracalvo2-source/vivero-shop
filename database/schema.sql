-- ============================================
-- VARIUM - Vivero Shop
-- Base de datos: vivero_shop
-- Motor: MySQL (AWS Aurora RDS)
-- ============================================

CREATE DATABASE IF NOT EXISTS vivero_shop
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE vivero_shop;

-- Tabla de productos (plantas)
CREATE TABLE IF NOT EXISTS productos (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(255) NOT NULL,
  categoria   VARCHAR(100) NOT NULL,
  precio      DECIMAL(10,2) NOT NULL,
  descripcion TEXT NOT NULL,
  emoji       VARCHAR(10) DEFAULT '🌿',
  stock       INT NOT NULL DEFAULT 10,
  creado_en   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  total          DECIMAL(10,2) NOT NULL,
  estado         ENUM('pendiente','confirmado','enviado','entregado','cancelado') DEFAULT 'pendiente',
  nombre_cliente VARCHAR(255),
  creado_en      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de detalle de pedidos
CREATE TABLE IF NOT EXISTS pedido_items (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id   INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad    INT NOT NULL DEFAULT 1,
  precio_unit DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (pedido_id)   REFERENCES pedidos(id)   ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE RESTRICT
);
