# MI NEGOCIO GO - Arquitectura de Base de Datos y Backend

Este documento detalla la estructura del backend y la base de datos implementados para la aplicación "MI NEGOCIO GO", cumpliendo con la regla de "No ERP, libreta digital inteligente" y la arquitectura "Offline-First".

## Stack Tecnológico Implementado

*   **Framework Core:** NestJS
*   **ORM y Base de Datos:** Prisma ORM con PostgreSQL
*   **Gestión de Trabajos Asíncronos (Sincronización):** Redis + BullMQ
*   **Seguridad y Autenticación:** JWT (JSON Web Tokens), `passport-jwt` y `bcrypt`
*   **Documentación API:** OpenAPI (Swagger)
*   **Testing:** Jest

---

## Modelo de Datos (Prisma Schema)

La base de datos se ha diseñado intencionalmente ligera y directa, evitando tablas complejas de ERP y centrándonos en el MVP: Productos, Ventas, Compras e Inventario.

### 1. Entidad `User`
Representa al dueño del negocio o la cuenta del dispositivo ligado.
*   **Campos:** `id`, `email`, `password` (hash), `name`, `createdAt`, `updatedAt`
*   **Relaciones:** Tiene múltiples `Product`, `Sale` y `Purchase`.

### 2. Entidad `Product`
El catálogo del negocio.
*   **Campos:** `id`, `userId`, `name`, `description`, `price`, `cost`, `stock`, `barcode`, `categoryId`
*   **Estrategia:** El `stock` mantiene el inventario actual. Cuando ocurren ventas o compras, este valor se actualiza en transacciones (ACID).

### 3. Entidades de Transacción: `Sale` y `Purchase`
Diseñadas para guardar registros de entradas y salidas de dinero y mercancía.
*   **Sale (Venta):** `id`, `userId`, `totalAmount`, `paymentType` (Efectivo, Tarjeta, etc.). Se asocia a múltiples `SaleItem`.
*   **Purchase (Compra):** `id`, `userId`, `totalAmount`. Se asocia a múltiples `PurchaseItem`.
*   *Ambas incluyen un timestamp `syncedAt` para trazar cuándo se consolidaron en el servidor desde un evento offline.*

### 4. Entidad `StockMovement`
Un historial inmutable (append-only log) de los cambios de inventario.
*   **Campos:** `id`, `productId`, `type` (IN/OUT), `quantity`, `reason` (SALE, PURCHASE, ADJUSTMENT).
*   **Propósito:** Permite la reconstrucción del historial de inventario y sirve como auditoría en caso de conflictos de sincronización.

### 5. Entidad `SyncEvent` (El motor Offline-First)
El corazón de la sincronización asíncrona.
*   **Campos:** `id`, `entity` (Product, Sale, etc.), `entityId`, `action` (CREATE, UPDATE, DELETE), `payload` (JSON), `status` (PENDING, PROCESSED, FAILED), `error`.
*   **Flujo:** Cuando el celular recupera la conexión, empuja un arreglo de `SyncEvents`. El backend los guarda aquí y BullMQ los procesa en background para evitar bloqueos y timeouts.

---

## Módulos del Backend (NestJS)

1.  **PrismaModule:** Proveedor global de la conexión a la base de datos PostgreSQL.
2.  **AuthModule:**
    *   Endpoints `/auth/register` y `/auth/login`.
    *   Cifrado de contraseñas con `bcrypt`.
    *   Generación de tokens JWT protegidos por `JwtAuthGuard`.
3.  **Core API Modules (Product, Sale, Purchase, StockMovement):**
    *   Controladores protegidos por JWT.
    *   DTOs (Data Transfer Objects) con validaciones (`class-validator`, `class-transformer`).
    *   Las transacciones de Ventas y Compras ejecutan bloqueos atómicos (`prisma.$transaction`) que crean los registros de venta, actualizan el `stock` del producto y generan el log de `StockMovement` simultáneamente.
4.  **SyncModule (Sincronización Asíncrona):**
    *   Integración con BullMQ y Redis.
    *   Recibe payloads offline masivos a través del controlador.
    *   `SyncProcessor` (WorkerHost de BullMQ) corre en background, procesando cada evento de la cola para integrarlo a la base de datos principal de manera ordenada, previniendo conflictos.

## Documentación y Validación
La API incluye Swagger (OpenAPI) configurado en el puerto raíz (usualmente `http://localhost:3000/api/docs`), que extrae dinámicamente descripciones de todos los DTOs y Controladores del sistema. Además cuenta con un Pipeline Global de validación que rechaza requests mal formados antes de tocar la lógica de negocio.
