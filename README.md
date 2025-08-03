# Proyecto Inventario Fullstack

Este proyecto es una aplicación web para gestión de inventario con un frontend en React (Vite) y un backend en Node.js con Express y MongoDB.

---

## Estructura del proyecto

- `/frontend`: Aplicación frontend creada con React y Vite.
- `/backend`: Servidor backend en Node.js y Express.
- `start-project.bat`: Script para iniciar ambos servidores y abrir el navegador automáticamente.

---

## Requisitos previos

- [Node.js](https://nodejs.org/) instalado (preferiblemente versión 16 o superior).
- [MongoDB](https://www.mongodb.com/) corriendo localmente o una URI válida para conexión remota.
- Windows (para usar el script `.bat` de inicio, aunque puedes arrancar manualmente en cualquier SO).

---

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
   Instala dependencias del backend:
   ```

bash
Copiar
Editar
cd backend
npm install
Instala dependencias del frontend:

bash
Copiar
Editar
cd ../frontend
npm install
Configura tus variables de entorno en .env (especialmente MONGO_URI para MongoDB).

Ejecución
Para iniciar ambos servidores y abrir automáticamente el navegador en la URL del frontend:

En Windows, simplemente ejecuta el script:

bat
Copiar
Editar
start-project.bat
Alternativamente, puedes iniciar cada proyecto manualmente en consolas separadas:

Backend:

bash
Copiar
Editar
cd backend
npm run dev
Frontend:

bash
Copiar
Editar
cd frontend
npm run dev
Uso
El frontend estará disponible en http://localhost:5173/.

El backend correrá por defecto en http://localhost:5000/.

Tecnologías
Frontend: React, Vite, React Router, Axios.

Backend: Node.js, Express, Mongoose, JWT, bcrypt.

Base de datos: MongoDB.
