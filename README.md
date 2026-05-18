# 🌿 Varium - Vivero Shop

Aplicación web de tienda de plantas desarrollada como proyecto final de Programación Web.
Permite explorar un catálogo de plantas, agregar productos y realizar pedidos.

---

## 👥 Integrantes y Roles

| Nombre | Rol | Tecnología |
|--------|-----|-----------|
| Sara Calvo Duque | Frontend Developer | React + Vite |
| Manuela Cruz Marín | Backend Developer | Node.js + Express |
| Joan Sebastian Loaiza Díaz | Database Administrator | MySQL + AWS Aurora RDS |

---

## 🏗️ Arquitectura

```
Frontend (React)  →  Backend (Node.js/Express)  →  Base de Datos (MySQL - AWS Aurora RDS)
localhost:5173         localhost:3000                      AWS RDS
```

---

## 🚀 Cómo correr el proyecto localmente

### Requisitos previos
- Node.js v18 o superior
- MySQL corriendo (local o conexión a AWS RDS)
- Git

### 1. Clonar el repositorio
```bash
git clone https://github.com/saracalvo2-source/vivero-shop.git
cd vivero-shop
```

### 2. Configurar el Backend
```bash
cd backend
```
Crear el archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```
Editar `.env` con las credenciales de la base de datos, luego:
```bash
npm install
npm start
```
El backend corre en `http://localhost:3000`

### 3. Configurar el Frontend
Abrir una nueva terminal:
```bash
cd frontend
npm install
npm run dev
```
El frontend corre en `http://localhost:5173`

### 4. Abrir la aplicación
Entrar a `http://localhost:5173` en el navegador.

---

## 📁 Estructura del proyecto

```
vivero-shop/
├── frontend/          # React + Vite
│   ├── src/
│   │   ├── pages/     # Inicio, Catálogo, AgregarProducto, Carrito
│   │   ├── components/ # Navbar
│   │   └── App.jsx
│   └── public/        # Archivos estáticos
├── backend/           # Node.js + Express
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── db/
│   └── .env.example
└── database/          # Scripts SQL y diagrama ER
```

---

## 🌐 Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/productos | Listar todos los productos |
| GET | /api/productos/:id | Obtener un producto |
| POST | /api/productos | Crear producto |
| PUT | /api/productos/:id | Editar producto |
| DELETE | /api/productos/:id | Eliminar producto |
| GET | /api/pedidos | Listar pedidos |
| POST | /api/pedidos | Crear pedido |

---

## 📌 Vistas del Frontend

1. **Inicio** — Página principal con video de fondo y presentación
2. **Catálogo** — Lista de plantas con búsqueda y filtro por categoría
3. **Agregar Planta** — Formulario con validación para registrar nuevas plantas
4. **Carrito** — Resumen de compra y confirmación de pedido

---

Universidad Tecnológica de Pereira · TS5C4 Programación Web G401 · 2026
