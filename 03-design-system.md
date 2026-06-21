# Etapa 3: UX y Design System

Este documento centraliza las reglas de diseño (Design System) y detalla el trabajo de conceptualización UX realizado para la aplicación "Mi Negocio GO".

---

## Parte 1: Design System (Sistema de Diseño)

El sistema de diseño está concebido para usuarios no técnicos. La regla de oro es: **"Debe sentirse como usar WhatsApp, no como usar Excel."**

### 1.1 Paleta de Colores

*   **Color Primario (Marca / Acción Principal):**
    *   **Migo Green (`#00A859`):** Utilizado para el botón principal de la pantalla, confirmar ventas, botón de "Ingresar" y elementos positivos. Representa crecimiento, éxito y la identidad central de la IA.
*   **Color Secundario (Acción Alternativa / Gastos):**
    *   **Digital Blue (`#2563EB`):** Utilizado para registrar compras/gastos, enlaces y acciones secundarias importantes para crear un contraste claro con el verde.
*   **Colores de Fondo (Dark Theme por Defecto):**
    *   **Fondo Principal (`#121212` o similar):** Un tema oscuro moderno que reduce la fatiga visual, hace resaltar el verde brillante y se asocia con interfaces modernas.
    *   **Superficies/Tarjetas (`#1E1E1E`):** Para diferenciar elementos como tarjetas de productos o burbujas de chat.
*   **Colores de Texto:**
    *   **Texto Principal:** Blanco o gris muy claro (`#FFFFFF` a `#E0E0E0`).
    *   **Texto Secundario:** Gris medio (`#A0A0A0`) para subtítulos, fechas o información de bajo contraste.
*   **Colores Semánticos:**
    *   **Rojo (`#EF4444`):** Para eliminar elementos, alertas de error o stock crítico.
    *   **Amarillo/Naranja (`#F59E0B`):** Para advertencias o stock bajo.

### 1.2 Tipografía

*   **Fuente Principal:** San Francisco (iOS) / Roboto (Android) o Inter. Sans-serif limpia y altamente legible.
*   **Jerarquía:**
    *   **Títulos Grandes:** Para las vistas principales (ej. el saludo del Dashboard).
    *   **Cuerpo Amplio (Large Body):** Tamaño de texto más grande que el estándar de las apps tradicionales, pensado para lectura rápida (ej. nombres de productos en inventario).
    *   **Microcopy mínimo:** Las descripciones o letras pequeñas se evitan a menos que sea estrictamente necesario.

### 1.3 Elementos de Interfaz (UI Components)

*   **Botones (Call to Action - CTA):**
    *   **Tamaño:** Gigantes y prominentes (mínimo 48px a 56px de altura).
    *   **Diseño:** Bordes redondeados (Radius 12px a 16px).
    *   **Regla de Oro UX:** Máximo un botón primario por pantalla.
*   **Listas y Tarjetas:**
    *   Estilo "Lista de Contactos". Sin tablas, sin cuadrículas complejas. Cada producto es una fila ancha con un título (nombre del producto), subtítulo (precio/stock) y un ícono (foto).
*   **Inputs (Entrada de texto):**
    *   Diseñados como barras de búsqueda o áreas de mensajes de chat.
    *   Teclados contextuales estrictos (ej. si se pide cantidad, se abre obligatoriamente el teclado numérico gigante, no el alfanumérico).

### 1.4 Reglas de Experiencia de Usuario (UX)

1.  **Regla de los 3 Toques:** Cualquier operación central (registrar venta, registrar compra, buscar producto) no debe requerir más de 3 toques en la pantalla.
2.  **El Teclado como Enemigo:** Se priorizan botones de `[ + ]` y `[ - ]` para sumar cantidades o selección de opciones antes que forzar al usuario a escribir.
3.  **Chat como Interfaz (MIGO):** La interacción con el asistente de inteligencia artificial utiliza la metáfora universal del chat de voz/texto.
4.  **Offline Primero:** El usuario nunca debe ver un estado de "Cargando" eterno si no hay red. La interfaz debe responder instantáneamente asumiendo que los datos se guardaron localmente.

---

## Parte 2: Detalle de lo Realizado en la Etapa de UX

Durante esta etapa, se ha conceptualizado la arquitectura de la información y la estructura visual a través de **Wireframes Textuales Estructurales** (disponibles en el archivo `WIREFRAMES.md`).

A continuación, el detalle de lo que se resolvió para cada pantalla basándonos en el sistema de diseño:

1.  **Login:** Se diseñó priorizando el ingreso mediante "PIN de Seguridad de 4 dígitos" y número de teléfono. Esto fomenta el ingreso rápido y soporta la arquitectura offline (el PIN valida el token local sin necesidad de internet).
2.  **Dashboard:** Se estructuró como un centro de mando inmediato. Arriba un resumen rápido, en el centro dos botones gigantes (Nueva Venta, Nueva Compra) y abajo un feed estilo "historial de notificaciones" con las últimas transacciones.
3.  **Inventario:** Se eliminó el concepto de "tabla de Excel". Se diseñó como una lista de contactos. Un botón gigante arriba para "Agregar" y la lista de productos debajo con indicadores simples de stock.
4.  **Producto (Detalle/Creación):** Se redujo el formulario típico de un ERP (que tendría 20 campos) a solo 3 elementos vitales: Nombre, Precio y un selector rápido `[ - ] [ + ]` para el stock actual.
5.  **Ventas:** Se conceptualizó como un flujo ultra rápido. Paso 1: Buscar/Escanear producto. Paso 2: El producto se añade a la lista visualmente con un total actualizado. Paso 3: Botón gigante verde de Confirmar.
6.  **Compras:** Estructuralmente idéntico a Ventas para reducir la curva de aprendizaje, diferenciado visualmente por el uso del color secundario y el cambio de término ("Costo de la compra").
7.  **Configuración:** Se mantuvo minimalista. Se integró el estado de sincronización de la base de datos local (nube vs offline) y accesos directos críticos (PIN, Impresora, Ayuda), eliminando ajustes técnicos complejos.
8.  **MIGO (Asistente de IA):** Se diseñó replicando exactamente la interfaz de WhatsApp. Consta de un hilo de mensajes, una barra de entrada de texto y un botón prominente de micrófono `[🎙️]`. Está pensado para ser el puente "invisible" que convierte lenguaje natural en datos estructurados de inventario.
