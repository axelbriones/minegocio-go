# Etapa 3: UX y Design System (V2 - Inventario Inteligente)

Este documento centraliza las reglas de diseño (Design System) y detalla el trabajo de conceptualización UX realizado para la aplicación "Mi Negocio GO".

**Atención (Pivote Conceptual):** La aplicación ya NO está orientada a POS (Punto de Venta). Ahora es un **Centro de Control de Inventario Inteligente impulsado por IA**.

---

## Parte 1: Design System y Filosofía UX

El sistema de diseño está concebido para usuarios no técnicos pero enfocado en la logística operativa rápida.

### 1.1 Filosofía UX Principal

Toda la aplicación obedece a estas reglas inquebrantables:
*   **Máximo tres toques** para cualquier operación frecuente.
*   **Uso intensivo del escáner** (la cámara es el teclado principal).
*   **Interfaz limpia y rápida**, donde la velocidad de operación prima por encima de la complejidad visual.
*   **Botones gigantes** y prominentes para acciones rápidas.
*   **Mínima escritura manual** (el teclado virtual es el enemigo).
*   **IA Integrada naturalmente** (MIGO actúa como un empleado experto en inventario, no como un chatbot genérico).
*   **Offline First** (la aplicación asume que no hay internet, guarda local y sincroniza después en segundo plano).

### 1.2 Paleta de Colores

*   **Color Primario (Marca / Acción Principal):**
    *   **Migo Green (`#00A859`):** Utilizado para el botón principal, confirmar movimientos de inventario, el escáner y la identidad de MIGO. Representa crecimiento, éxito y fluidez.
*   **Color Secundario (Acciones Especiales):**
    *   **Digital Blue (`#2563EB`):** Utilizado para enlaces, navegación y acciones secundarias importantes.
*   **Colores de Fondo (Dark Theme por Defecto):**
    *   **Fondo Principal (`#121212`):** Tema oscuro moderno que reduce la fatiga visual en entornos logísticos o de bodega.
    *   **Superficies/Tarjetas (`#1E1E1E`):** Para diferenciar elementos estructurales.
*   **Colores de Alertas (Críticos para Inventario):**
    *   **Rojo (`#EF4444`):** Stock crítico, salidas forzadas o errores.
    *   **Amarillo/Naranja (`#F59E0B`):** Avisos de IA, stock bajo, productos próximos a agotarse.

### 1.3 Tipografía

*   **Fuente Principal:** San Francisco (iOS) / Roboto (Android) o Inter. Sans-serif limpia.
*   **Cuerpo Amplio (Large Body):** Tamaño de texto más grande que el estándar, vital para legibilidad rápida en bodegas y usando la app de pie.

---

## Parte 2: Arquitectura de la Información y Resumen de Pantallas

Durante esta etapa, se han actualizado los **Wireframes Textuales Estructurales** (`WIREFRAMES.md`) para reflejar la nueva prioridad.

El orden de navegación recomendado y jerarquía de la app es ahora:
1. Dashboard (Panel Principal)
2. Inventario
3. Escáner
4. Movimientos
5. MIGO IA
6. Compras (Secundario)
7. Ventas (Secundario)
8. Reportes (Secundario)
9. Configuración

### Resumen de los Componentes UX Rediseñados:

1.  **Dashboard (Centro de Control):** Ya no muestra "Vender/Comprar". Ahora muestra "Escanear Producto", "Registrar Movimiento", "Consultar Inventario" y "Preguntar a MIGO". Se centra en alertas de stock crítico, actividad reciente e insights de la IA.
2.  **Inventario (Módulo Protagonista):** Lista ágil con búsqueda instantánea, filtros rápidos (favoritos, stock bajo), ubicación en bodega, fotografía e indicadores visuales (semáforos de stock).
3.  **Producto (Detalle Expandido):** Espacio preparado para escalar. Muestra nombre, precio y stock, pero deja espacio estructural para: Insights de IA (recomendaciones de compra/rotación), historial de movimientos, bodegas, lotes y proveedores.
4.  **Escáner (Módulo de Primera Clase):** Flujo principal para operar con códigos de barra o QR. Permite acción instantánea: escanear y hacer entrada rápida (+1), salida rápida (-1) o simplemente buscar.
5.  **Movimientos:** Pantalla específica, rápida y optimizada para Entradas, Salidas, Ajustes y Transferencias sin la fricción de un módulo de Ventas/Compras contable.
6.  **MIGO IA:** Experiencia tipo chat potenciada. MIGO puede consultar inventario, registrar movimientos por dictado de voz, recibir fotografías de facturas, detectar anomalías y explicar variaciones. Se comporta como un "experto en el bolsillo".
7.  **Compras / Ventas:** Su prioridad se ha reducido drásticamente. Existen solo como catalogación financiera opcional dentro del menú extendido.
8.  **Configuración:** Ampliada para un ecosistema profesional. Ahora incluye Sincronización, Dispositivos (escáneres/impresoras), Permisos, Múltiples Bodegas y Empresas.
