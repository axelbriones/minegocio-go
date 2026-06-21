# Tarea 7 - Integración Total del Panel Web con Backend

Esta tarea transformó el panel estático web (creado en la Tarea 6) en una aplicación conectada directamente a los servicios RESTful asumiendo la arquitectura del Backend. Se eliminaron por completo las dependencias de arreglos estáticos (mock data) locales y se estructuró una arquitectura robusta de peticiones.

## 🏗 Arquitectura de Frontend

Para garantizar calidad y evitar duplicidad, se organizó `web/src` de la siguiente manera:

- **/components:** Elementos UI reutilizables (Skeletons, EmptyStates, ErrorStates).
- **/hooks:** Lógica encapsulada, destacando `useApi` para manejo estandarizado de llamadas asíncronas con estados `loading` y `error`.
- **/services:** Cliente HTTP (`api.ts`) usando `fetch` nativo, e indexado de rutas exactas (`endpoints.ts`).
- **/types:** Interfaces exactas para mapear la respuesta del backend a TypeScript (`DashboardStats`, `Product`, `AIAnalysisResult`, etc.).
- **/constants:** Valores globales como paletas de color.

## 🔗 Endpoints Utilizados

Todo el panel consume datos a través de la variable de entorno `NEXT_PUBLIC_API_URL` (por defecto `http://localhost:3000/api`).

- **Dashboard:** `GET /dashboard`
- **Inventario:** `GET /products`, `DELETE /products/:id`
- **Movimientos:** `GET /inventory/movements`
- **Ventas:** `GET /sales`
- **Alertas:** `GET /alerts`
- **MIGO IA:**
  - `POST /ai/inventory` (Predicciones)
  - `POST /ai/suggestions` (Recomendaciones activas)

## 🎨 Manejo de Estados UI

- **Loading:** Se implementaron `Skeletons` (animaciones de pulso) para simular la carga de datos sin romper la estructura de la tabla o tarjetas.
- **Error:** Componente global para fallos de red con botón de reintento (`onRetry`).
- **Empty State:** Si la API retorna un arreglo vacío, se muestra una ilustración limpia indicando que no hay registros bajo los filtros actuales.

## 🧠 Módulo MIGO IA

Se incorporó exitosamente como el núcleo inteligente de la plataforma. Su vista principal invoca directamente a los endpoints de análisis de inventario para sugerir acciones específicas (vender primero, aplicar descuentos, reabastecer).
