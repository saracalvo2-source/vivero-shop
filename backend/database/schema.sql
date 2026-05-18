CREATE TABLE IF NOT EXISTS productos (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(255)  NOT NULL,
  categoria   VARCHAR(100)  NOT NULL,
  precio      DECIMAL(10,2) NOT NULL CHECK(precio > 0),
  descripcion TEXT          NOT NULL,
  emoji       VARCHAR(10)   DEFAULT '🌿',
  stock       INT           NOT NULL DEFAULT 10,
  creado_en   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pedidos (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  total          DECIMAL(10,2) NOT NULL,
  estado         ENUM('pendiente','confirmado','enviado','entregado','cancelado') DEFAULT 'pendiente',
  nombre_cliente VARCHAR(255),
  creado_en      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pedido_items (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id   INT           NOT NULL,
  producto_id INT           NOT NULL,
  nombre      VARCHAR(255)  NOT NULL,
  precio      DECIMAL(10,2) NOT NULL,
  cantidad    INT           NOT NULL DEFAULT 1,
  FOREIGN KEY (pedido_id)   REFERENCES pedidos(id)   ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);