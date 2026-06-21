# Mi Negocio GO - UX Wireframes

Este documento contiene los wireframes en formato texto/estructural de las 8 pantallas solicitadas, diseñadas bajo el concepto de "cuaderno digital inteligente" (tipo WhatsApp) con botones grandes y un máximo de 3 toques por acción.

---

## 1. Login

**Objetivo:** Ingreso rápido y seguro, diseñado para funcionar también sin conexión mediante vinculación de dispositivo.

```text
+-------------------------------------------------+
|                                                 |
|               [ LOGO MIGO ]                     |
|            "Mi Negocio GO"                      |
|                                                 |
|                                                 |
|  [ Ícono Teléfono ] Número de Teléfono          |
|  ---------------------------------------------  |
|                                                 |
|  [ Ícono Candado ] PIN de Seguridad (4 dígitos) |
|  ---------------------------------------------  |
|                                                 |
|                                                 |
|  +-------------------------------------------+  |
|  |           INGRESAR (Verde Migo)           |  |
|  +-------------------------------------------+  |
|                                                 |
|             ¿Olvidaste tu PIN?                  |
|                                                 |
+-------------------------------------------------+
```
*Notas de Diseño:* Fondo limpio, contraste alto, teclado numérico nativo para ingreso rápido.

---

## 2. Dashboard (Pantalla Principal)

**Objetivo:** Resumen rápido del día y acceso inmediato a las operaciones principales (Ventas y Compras). Estilo chat/atajo.

```text
+-------------------------------------------------+
| [Foto Perfil]   Hola, María!        [Icono 🔔]  |
|                                                 |
|  Resumen de Hoy:                                |
|  💰 Ingresos: $120.00                           |
|  📦 Ventas: 15                                  |
|                                                 |
|  +-------------------+   +-------------------+  |
|  |    [ Ícono + ]    |   |    [ Ícono - ]    |  |
|  |   NUEVA VENTA     |   |   NUEVA COMPRA    |  |
|  |   (Verde Migo)    |   |   (Azul Digital)  |  |
|  +-------------------+   +-------------------+  |
|                                                 |
|  Últimos Movimientos:                           |
|  > Venta: 2x Coca Cola                 $3.00    |
|  > Compra: 10x Pan                     $5.00    |
|  > Venta: 1x Leche                     $1.50    |
|                                                 |
|-------------------------------------------------|
| [🏠 Inicio] [📦 Inventario] [🤖 MIGO] [⚙️ Ajustes]|
+-------------------------------------------------+
```
*Notas de Diseño:* Menú de navegación inferior persistente. Botones gigantes de Venta/Compra para cumplir la regla de "máximo 3 toques".

---

## 3. Inventario

**Objetivo:** Lista de productos tipo "contactos" (simple, sin tablas complejas de ERP). Búsqueda rápida.

```text
+-------------------------------------------------+
|  [< Atrás]       INVENTARIO         [🔍 Buscar]|
|                                                 |
|  +-------------------------------------------+  |
|  | ➕ AGREGAR NUEVO PRODUCTO                   |  |
|  +-------------------------------------------+  |
|                                                 |
|  [🥑 Aguacate Hass]                             |
|  Stock: 15 u.  |  Precio: $1.00             [>] |
|  ---------------------------------------------  |
|  [🥖 Pan Francés]                               |
|  Stock: 40 u.  |  Precio: $0.25             [>] |
|  ---------------------------------------------  |
|  [🥤 Coca Cola 600ml]                           |
|  Stock: 8 u. (Bajo) | Precio: $1.50         [>] |
|  ---------------------------------------------  |
|                                                 |
|-------------------------------------------------|
| [🏠 Inicio] [📦 Inventario] [🤖 MIGO] [⚙️ Ajustes]|
+-------------------------------------------------+
```

---

## 4. Producto (Detalle / Creación)

**Objetivo:** Formulario mínimo. Sólo nombre, precio, costo (opcional) y cantidad.

```text
+-------------------------------------------------+
|  [< Atrás]       PRODUCTO             [🗑️]      |
|                                                 |
|  [ 📷 Tomar Foto / Icono ]                      |
|                                                 |
|  Nombre del Producto:                           |
|  [ Ej. Galletas Chokis                     ]    |
|                                                 |
|  Precio de Venta ($):                           |
|  [ $ 0.50                                  ]    |
|                                                 |
|  Stock Actual (Cantidad):                       |
|  [ - ]        25         [ + ]                  |
|                                                 |
|                                                 |
|  +-------------------------------------------+  |
|  |              GUARDAR CAMBIOS              |  |
|  +-------------------------------------------+  |
|                                                 |
+-------------------------------------------------+
```

---

## 5. Ventas (Nueva Venta)

**Objetivo:** Registro ultra rápido. Como enviar un mensaje.

```text
+-------------------------------------------------+
|  [< Atrás]      REGISTRAR VENTA                 |
|                                                 |
|  1. ¿Qué vendiste? (Escanea o busca)            |
|  +-------------------------------------------+  |
|  | 🔍 Buscar producto...             [📷 Escanear]
|  +-------------------------------------------+  |
|                                                 |
|  [+] Coca Cola 600ml    (1) x $1.50 = $1.50     |
|  [+] Pan Francés        (2) x $0.25 = $0.50     |
|                                                 |
|                                                 |
|  Total a cobrar:                     $2.00      |
|                                                 |
|  +-------------------------------------------+  |
|  |          ✅ CONFIRMAR VENTA               |  |
|  +-------------------------------------------+  |
|                                                 |
+-------------------------------------------------+
```
*Notas de Diseño:* Menos de 3 toques: Tocar 'Nueva Venta' en Dashboard -> Tocar el producto o escanear -> Confirmar.

---

## 6. Compras (Ingreso de Mercadería)

**Objetivo:** Igual de simple que la venta. Sólo aumenta el stock y registra el gasto.

```text
+-------------------------------------------------+
|  [< Atrás]      REGISTRAR COMPRA                |
|                                                 |
|  1. ¿Qué compraste/ingresó?                     |
|  +-------------------------------------------+  |
|  | 🔍 Buscar producto...             [📷 Escanear]
|  +-------------------------------------------+  |
|                                                 |
|  [+] Aguacate Hass      (10) u.                 |
|                                                 |
|  Costo Total de la compra ($):                  |
|  [ $ 8.00                                  ]    |
|                                                 |
|                                                 |
|  +-------------------------------------------+  |
|  |          ✅ CONFIRMAR COMPRA              |  |
|  +-------------------------------------------+  |
|                                                 |
+-------------------------------------------------+
```

---

## 7. Configuración

**Objetivo:** Ajustes mínimos. Énfasis en la sincronización, copias de seguridad (seguridad/offline) e identidad.

```text
+-------------------------------------------------+
|  [< Atrás]      CONFIGURACIÓN                   |
|                                                 |
|  PERFIL:                                        |
|  👤 María Negocio (Mi Tiendita)                 |
|  📱 +503 7777-8888                              |
|                                                 |
|  ESTADO DE SINCRONIZACIÓN:                      |
|  ☁️ Todos los datos guardados en la nube.      |
|  [ Sincronizar Ahora ]                          |
|                                                 |
|  OPCIONES:                                      |
|  [🔒] Cambiar PIN de Seguridad              [>] |
|  [🖨️] Impresora Bluetooth                   [>] |
|  [📞] Ayuda por WhatsApp                    [>] |
|                                                 |
|  +-------------------------------------------+  |
|  |             CERRAR SESIÓN                 |  |
|  +-------------------------------------------+  |
|                                                 |
|-------------------------------------------------|
| [🏠 Inicio] [📦 Inventario] [🤖 MIGO] [⚙️ Ajustes]|
+-------------------------------------------------+
```

---

## 8. MIGO (Asistente de IA)

**Objetivo:** Interfaz invisible/mágica. Estilo WhatsApp con chat de voz y texto para corrección/autocompletado de inventario.

```text
+-------------------------------------------------+
|  [< Atrás]         MIGO IA            [ℹ️ Info] |
|                                                 |
|                                                 |
|  [Mensaje MIGO]:                                |
|  ¡Hola! Soy MIGO. Puedes decirme qué vendiste,  |
|  qué compraste o enviarme una foto de tus       |
|  facturas para registrarlas automáticamente.    |
|                                                 |
|            +----------------------------------+ |
|            | "Acabo de vender 3 cocas y 2     | |
|            | panes franceses"                 | |
|            +----------------------------------+ |
|                                                 |
|  [Mensaje MIGO]:                                |
|  ¡Listo! Registré la venta por $5.00.           |
|  [ Ver Detalle ]                                |
|                                                 |
|                                                 |
|  +-------------------------------------------+  |
|  | [📷] [⌨️ Escribe aquí...]             [🎙️] |  |
|  +-------------------------------------------+  |
|                                                 |
|-------------------------------------------------|
| [🏠 Inicio] [📦 Inventario] [🤖 MIGO] [⚙️ Ajustes]|
+-------------------------------------------------+
```
*Notas de Diseño:* El botón de micrófono [🎙️] es prominente. Esta pantalla se enfoca en resolver el trabajo manual (la capa MIGO asiste interpretando voz/fotos/texto).
