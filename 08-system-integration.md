# Tarea 8: Integración del Sync Engine (Fase 2 Completada)

## Arquitectura del Sync Engine
El motor de sincronización funciona bajo un esquema **Offline-First**. Todas las operaciones de creación y edición (Productos, Ventas, Compras, Movimientos) interactúan exclusivamente con la base de datos local SQLite mediante la capa de `services/`. Esta capa ejecuta las modificaciones locales y simultáneamente encola los payloads en la tabla `sync_queue`.

### Flujo Offline → Online
1. **Sin conexión**: El usuario opera sin interrupciones. La UI refleja los cambios inmediatamente basados en los datos locales.
2. **Detección de red**: El hook `useSyncEngine` monitorea el estado mediante `NetInfo`. Al volver a estar online, dispara automáticamente `processSyncQueue()`.
3. **Push / Pull**:
    - **Push**: Envía secuencialmente la cola local usando Backoff Exponencial (esperando lapsos crecientes según `retryCount`) y realiza el HTTP POST/PUT vía Axios hacia el backend.
    - **Pull**: Utilizando `AsyncStorage` para guardar un cursor temporal (`@last_sync_timestamp`), la app consulta al backend solo los registros creados o modificados desde la última conexión.
4. **Limpieza y Background**: Al terminar, la cola se vacía. El `expo-task-manager` permite que este proceso se repita automáticamente incluso si la app está en segundo plano (cada 15 minutos).

## Resolución de Conflictos Estricta
La app utiliza la regla **Version + Last Write Wins**:
1. Se compara la columna `version` entre el objeto local y el remoto. Gana el número mayor.
2. Si las versiones empatan, gana el objeto que tenga el `updatedAt` más reciente.
3. El proceso de fusión (Merge) actualiza localmente solo las propiedades de negocio usando un sistema de "Whitelisting" para evitar inyecciones SQL o columnas inexistentes que podrían corromper SQLite.

## Flujo de Datos Mobile ↔ Backend ↔ Web
- **Mobile**: Persiste la información en SQLite y actúa como la interfaz primaria de carga offline.
- **Backend (API REST)**: Es el árbitro central y coordinador. Valida la información, almacena en PostgreSQL y sirve los deltas (cambios recientes).
- **Web**: Consume la API del backend en tiempo real usando un mecanismo de *Polling*. No maneja SQLite, garantizando que el panel de administración web siempre muestra el estado consolidado de la nube y refleja lo que otros dispositivos móviles enviaron.

## Decisiones Técnicas y Optimizaciones
- **Componente `<SyncIndicator />`**: Ubicado en la cabecera de la app, informa al usuario el estatus de la red (Offline, Pendiente, Sincronizado, o Error).
- **Control de Carreras (Race Conditions)**: Se incluyó un mutex (`isSyncing`) en la lógica principal y un freno de renderizado en `App.tsx` para evitar que las tareas de sincronización intenten acceder a SQLite antes de que la inicialización termine.
- **Stock Movements Integrados**: Se solucionó la omisión en el esquema SQLite original añadiendo todas las columnas de sincronización (`version`, `isDeleted`, `updatedAt`) a los movimientos de inventario en `initDatabase()`.
