# 📱 Tarea 5 - Estado de Aplicación Móvil (Inventario)

## 📌 Resumen de Implementación
Se ha desarrollado la arquitectura y las pantallas principales de la aplicación móvil (React Native + Expo) enfocada exclusivamente en el módulo de Inventario, cumpliendo con los requerimientos de la Tarea 5 y respetando la restricción de no modificar el backend.

## 🏗️ Arquitectura y Dependencias
Se adoptó una estructura modular dentro de `mobile/src/modules/`:
*   `auth`: Flujo de autenticación.
*   `dashboard`: Pantalla de inicio con métricas de inventario.
*   `inventory`: Listado y detalle de productos.
*   `movements`: Registro de entradas, salidas, ajustes y transferencias.
*   `scanner`: Lector de códigos de barras mediante cámara.
*   `profile`: Información del usuario.
*   `shared`: Servicios API, cliente Supabase y gestión de base de datos offline.

**Tecnologías Integradas:**
*   `@supabase/supabase-js`: Cliente para consumo de API y Autenticación.
*   `expo-sqlite`: Base de datos local para la arquitectura offline.
*   `zustand`: Manejo de estado global (`useAuthStore`, `useInventoryStore`).
*   `@react-navigation/bottom-tabs`: Navegación principal.
*   `expo-camera`: Escaneo de códigos de barras.

## ✅ Funcionalidades Completadas

1.  **Autenticación & Perfil:**
    *   `LoginScreen`: Autenticación de usuarios utilizando Supabase (correo y contraseña).
    *   `ProfileScreen`: Visualización del usuario conectado y funcionalidad de cierre de sesión.
    *   Protección de rutas implementada en `App.tsx`.

2.  **Dashboard Básico:**
    *   `DashboardScreen`: Muestra métricas clave en tarjetas:
        *   Total de productos.
        *   Stock total.
        *   Productos con stock bajo (alerta visual si hay unidades con menos de 5 en stock).

3.  **Consulta de Inventario:**
    *   `InventoryScreen`: Lista de productos con buscador integrado (filtra por nombre o código de barras).
    *   `InventoryDetailScreen`: Vista detallada mostrando stock disponible, costo, precio de venta, código y los últimos movimientos de la base de datos de historial.

4.  **Movimientos de Inventario:**
    *   `MovementsScreen`: Formulario para registrar operaciones (`IN`, `OUT`, `ADJUST`, `TRANSFER`).
    *   Validación de stock local (no permite sacar más del stock disponible).
    *   Registro del movimiento de forma optimista (actualizando la vista local).

5.  **Escáner de Código de Barras:**
    *   `ScannerScreen`: Utiliza la cámara del dispositivo (`expo-camera`) para escanear formatos de códigos (QR, EAN, UPC).
    *   Al detectar un código, busca automáticamente en el sistema y redirige al detalle del producto si existe.

6.  **Arquitectura Offline (Modo Offline):**
    *   Preparación de caché local mediante `expo-sqlite`.
    *   Creación de la tabla `sync_queue`.
    *   Función `enqueueSync()` lista para almacenar movimientos localmente antes de sincronizarlos al recuperar la conexión.

## 🚧 Próximos Pasos (Evolución)
La arquitectura está lista. A futuro, se podrían enriquecer los detalles del producto agregando soporte visual para lotes, series e imágenes, así como desarrollar completamente el worker en background que consuma la tabla `sync_queue` y la empuje a los endpoints de sincronización cuando retorne internet.
