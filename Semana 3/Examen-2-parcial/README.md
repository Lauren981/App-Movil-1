# Examen Segundo Parcial - Aplicación de Administración de Productos

Esta es una aplicación completa de administración de productos construida con React Native (frontend) y Node.js + Express + MySQL (backend).

## 🚀 Características Implementadas

### Backend API
- ✅ **GET /productos**: Obtiene lista de productos
- ✅ **POST /productos**: Crea un nuevo producto  
- ✅ **DELETE /items/:id**: Elimina un producto por ID
- ✅ Base de datos MySQL con Sequelize ORM
- ✅ Validaciones y manejo de errores

### Frontend React Native
- ✅ **Interfaz moderna y funcional** con navegación por pestañas
- ✅ **Formulario de productos** con validaciones
- ✅ **Lista de productos** con opciones de eliminar y ver detalle
- ✅ **Modal de detalle** para visualizar información completa
- ✅ **Integración con cámara** usando expo-image-picker
- ✅ **Manejo de estados** (Disponible/No disponible)
- ✅ **Actualización automática** de la lista al agregar/eliminar

### Campos del Producto
- Nombre (título)
- Descripción
- Precio (valor)
- Estado (disponible/no disponible)
- Categoría (clasificación)
- URL fotografía (capturada con cámara)

## 📋 Requisitos Previos

### Backend
- Node.js v14+
- MySQL Server
- npm o yarn

### Frontend  
- Node.js v14+
- Expo CLI
- Dispositivo móvil o emulador
- npm o yarn

## 🛠️ Instalación y Configuración

### 1. Configurar Backend

```bash
cd backend-examen

# Instalar dependencias
npm install

# Configurar base de datos en database/db.js
# Cambiar credenciales según tu configuración MySQL:
const sequelize = new Sequelize('articulo_examen_db', 'root', '0000', {
    host: 'localhost',
    dialect: 'mysql'
})

# Crear base de datos en MySQL
CREATE DATABASE articulo_examen_db;

# Iniciar servidor
npm start
```

El servidor se ejecutará en `http://localhost:5000`

### 2. Configurar Frontend

```bash
cd examen-segundo-parcial

# Instalar dependencias
npm install

# Configurar URL del API en services/articulo.service.tsx
# Cambiar la IP por la de tu computadora:
const url_api: string = 'http://TU_IP:5000'

# Iniciar aplicación
npm start
```

## 🔧 Configuración de IP del Backend

Para que el dispositivo móvil pueda conectarse al backend:

1. Encontrar tu IP local:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. Actualizar en `services/articulo.service.tsx`:
   ```typescript
   const url_api: string = 'http://192.168.1.XXX:5000'  // Cambiar XXX por tu IP
   ```

## 📱 Funcionalidades de la App

### Pestaña "Agregar Producto"
- Formulario completo con validaciones
- Captura de foto usando la cámara
- Toggle para estado (Disponible/No disponible)
- Botones para guardar y limpiar formulario

### Pestaña "Mis Productos"
- Lista de productos con cards visuales
- Botón "Ver Detalle" - abre modal con información completa
- Botón "Eliminar" - con confirmación
- Pull-to-refresh para actualizar
- Estado visual con badges de colores

### Modal de Detalle
- Imagen del producto (si existe)
- Toda la información del producto
- Estado visual con colores
- Botón para cerrar

## 🎨 Diseño y UI

- **Material Design** inspirado
- **Colores consistentes**: Verde para disponible, Rojo para no disponible
- **Navegación intuitiva** con iconos
- **Cards modernas** con sombras y bordes redondeados
- **Responsive design** que se adapta a diferentes tamaños

## 🔄 Flujo de la Aplicación

1. **Agregar producto**: Formulario → Tomar foto → Guardar → Automáticamente actualiza lista
2. **Ver productos**: Lista → Ver detalle en modal
3. **Eliminar producto**: Lista → Eliminar con confirmación → Actualiza lista

## 🛡️ Validaciones Implementadas

### Frontend
- Campos obligatorios
- Validación de precio numérico
- Permisos de cámara
- Manejo de errores de red

### Backend  
- Validación de campos requeridos
- Manejo de errores de base de datos
- Respuestas HTTP apropiadas

## 📊 Estructura del Proyecto

```
backend-examen/
├── controllers/          # Lógica de negocio
├── database/            # Configuración DB
├── models/              # Modelos Sequelize
├── routes/              # Rutas de API
└── index.js            # Punto de entrada

examen-segundo-parcial/
├── models/              # Interfaces TypeScript
├── navigation/          # Navegación React Navigation
├── screens/            # Pantallas principales
├── services/           # Servicios API
└── App.tsx            # Componente principal
```

## 🐛 Solución de Problemas

### Backend no se conecta a MySQL
- Verificar que MySQL esté ejecutándose
- Confirmar credenciales en `database/db.js`
- Crear la base de datos manualmente

### Frontend no se conecta al backend
- Verificar que el servidor esté corriendo
- Confirmar la IP en `articulo.service.tsx`
- Verificar que dispositivo y servidor estén en la misma red

### Errores de permisos de cámara
- En dispositivos físicos, aceptar permisos manualmente
- En emuladores, verificar que la cámara esté habilitada

## 📈 Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **Sequelize** - ORM para MySQL
- **MySQL** - Base de datos
- **CORS** - Middleware para requests cross-origin

### Frontend
- **React Native** - Framework mobile
- **Expo** - Plataforma de desarrollo
- **TypeScript** - Tipado estático
- **React Navigation** - Navegación
- **Expo Image Picker** - Acceso a cámara
- **Axios** - Cliente HTTP

## 🎯 Cumplimiento de Requerimientos

✅ API RESTful con endpoints solicitados  
✅ Base de datos MySQL  
✅ Interfaz React Native funcional  
✅ Integración completa frontend-backend  
✅ Funcionalidad de cámara implementada  
✅ Todos los campos de producto requeridos  
✅ Botón de detalle funcional  
✅ UI moderna y profesional  

## 🏆 Características Adicionales

- **Datos de ejemplo** se crean automáticamente
- **Pull-to-refresh** en la lista
- **Confirmaciones** antes de eliminar
- **Loading states** y feedback visual
- **Manejo robusto de errores**
- **Código limpio y documentado**

---

*Desarrollado como parte del examen del segundo parcial - Desarrollo de Aplicaciones Móviles*