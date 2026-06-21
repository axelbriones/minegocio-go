# Tarea 09: Database - Resumen y Estado

## 📌 Lo Realizado

En esta tarea se ha establecido la arquitectura de base de datos tanto para el backend (PostgreSQL) como para la aplicación móvil (SQLite local), cubriendo los siguientes puntos clave:

### 1. Modelo Relacional y ERD (Entity Relationship Diagram)
- Se ha diseñado el modelo de datos principal enfocado en un sistema de inventario ágil (no ERP).
- Se ha documentado el diagrama entidad-relación en `docs/ERD.md` utilizando sintaxis Mermaid.
- Entidades principales creadas: `User`, `Product`, `Sale`, `SaleItem`, `Purchase`, `PurchaseItem`, `StockMovement`.

### 2. Implementación en Backend (Prisma)
- Se inicializó un proyecto Node.js en la carpeta `backend/`.
- Se configuró **Prisma ORM** apuntando a una base de datos PostgreSQL local (`migo_db`).
- Se definió el esquema completo en `backend/prisma/schema.prisma`.
- Se establecieron todas las **Relaciones** necesarias (1:N) entre usuarios, productos y transacciones.
- Se agregaron **Índices** en campos clave (`userId`, `productId`, `createdAt`, `barcode`, `name`) para garantizar la **Optimización** de consultas.
- Se generaron y aplicaron las **Migraciones** iniciales (`init` y `add_indexes`).
- Se generó el cliente de Prisma (`@prisma/client`).

### 3. Implementación en Frontend / Mobile
- Se diseñó el esquema para la base de datos local SQLite de la app móvil.
- El archivo `mobile/database/schema.sql` contiene la réplica de las tablas de negocio.
- Se incluyó la tabla adicional `SyncQueue` para soportar la arquitectura "Offline-First" y manejar la sincronización diferida al detectar conexión.

---

## ⏳ Lo Pendiente (Próximos Pasos Recomendados)

Aunque la estructura de datos fundacional está completada, para integrar completamente el sistema de base de datos al flujo de la aplicación quedan las siguientes tareas:

1. **Configuración de Conexión en la App Móvil:**
   - Implementar `expo-sqlite` en la app móvil.
   - Crear el script de inicialización que lea e instancie el esquema de `mobile/database/schema.sql` en el primer arranque de la app.

2. **Lógica de Sincronización (Offline a Online):**
   - Desarrollar la lógica en React Native que inserte operaciones (ventas, productos nuevos) en la tabla `SyncQueue` cuando no haya internet.
   - Implementar un *Background Task* o *Worker* en la app que procese la `SyncQueue` enviando los eventos al backend cuando regrese la conexión.

3. **Backend API (Controladores/Servicios):**
   - Construir los endpoints (REST o GraphQL) en el backend que reciban la información de la `SyncQueue`.
   - Utilizar el Prisma Client generado para validar e insertar estos datos en la base de datos PostgreSQL en la nube.

4. **Integración con Zustand:**
   - Conectar los repositorios locales (SQLite) con los stores de Zustand en la aplicación móvil para asegurar que la UI refleje el estado de la base de datos de manera reactiva.
