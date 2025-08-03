# Proyecto Inventario Fullstack

Este proyecto es una aplicación web para gestión de inventario con un frontend en React (Vite) y un backend en Node.js con Express y MongoDB.

---

## 📁 Estructura del proyecto

- `/frontend`: Aplicación frontend creada con React y Vite.
- `/backend`: Servidor backend en Node.js y Express.
- `start-project.bat`: Script para iniciar ambos servidores y abrir el navegador automáticamente.

---

## ✅ Requisitos previos

- [Node.js](https://nodejs.org/) instalado (preferiblemente versión 16 o superior).
- [MongoDB](https://www.mongodb.com/) corriendo localmente o una URI válida para conexión remota.
- Sistema operativo Windows (para usar el script `.bat`), aunque puedes ejecutar los servidores manualmente en cualquier SO.

---

## ⚙️ Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
   ```

2. Instala las dependencias del backend:

   ```bash
   cd backend
   npm install
   ```

3. Instala las dependencias del frontend:

   ```bash
   cd ../frontend
   npm install
   ```

4. Crea el archivo `.env` y configura las variables de entorno necesarias, especialmente `MONGO_URI` para la conexión a MongoDB.

---

## 🚀 Ejecución

### 🔸 Opción 1: Ejecutar todo automáticamente (solo en Windows)

```bat
start-project.bat
```

Este script inicia backend y frontend y abre el navegador con la URL del frontend.

---

### 🔸 Opción 2: Ejecutar manualmente

#### Iniciar Backend

```bash
cd backend
npm run dev
```

#### Iniciar Frontend

```bash
cd frontend
npm run dev
```

---

## 🌐 Uso

- El **frontend** estará disponible en: [http://localhost:5173/](http://localhost:5173/)
- El **backend** correrá por defecto en: [http://localhost:5000/](http://localhost:5000/)

---

## 🧰 Tecnologías utilizadas

### Frontend:
- React
- Vite
- React Router
- Axios

### Backend:
- Node.js
- Express
- Mongoose
- JWT
- bcrypt

### Base de datos:
- MongoDB