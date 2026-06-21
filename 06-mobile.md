# Tarea 6 - Panel Administrativo Web

Se ha completado la creación del panel administrativo para la aplicación web respetando estrictamente la restricción de **no incluir lógica del backend**, utilizando únicamente React y Next.js con datos simulados (mock data).

## Detalles de Implementación

1. **Estructura Base del Proyecto:**
   - Se inicializó un nuevo proyecto de Next.js (App Router, TypeScript, Tailwind CSS) en el directorio `web/`.
   - Se instalaron los iconos de `lucide-react`.

2. **Diseño y Branding:**
   - Se configuraron los colores globales en `web/src/app/globals.css` utilizando las variables definidas en `BRANDING.md` (Migo Green, Digital Blue, fondos Off-White).
   - Se construyó un layout general (`RootLayout`) que contiene una barra lateral de navegación (`Sidebar`) persistente y un área principal para el contenido.

3. **Pantallas Creadas (puramente frontend):**
   - **Dashboard (`/`):** Una vista general con tarjetas de métricas (Ventas, Productos, Ganancias) y una tabla de "Ventas Recientes".
   - **Inventario (`/inventory`):** Una tabla que lista los productos, mostrando su categoría, stock, precio, y destacando aquellos con inventario bajo. Incluye la estructura visual para búsqueda y filtros.
   - **Ventas (`/sales`):** Un historial de las transacciones con detalles como recibo, monto, método de pago y estado.

Toda la aplicación web funciona de forma estática en este momento, permitiendo la previsualización del diseño y flujo de la aplicación sin depender de un servidor de Node.js o una base de datos PostgreSQL.
