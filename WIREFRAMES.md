# Mi Negocio GO - UX Wireframes (V2 - Inventario Inteligente)

Este documento contiene los wireframes estructurales diseñados bajo el nuevo paradigma: **Un Centro de Control de Inventario Inteligente impulsado por IA.**
La aplicación prioriza el control de stock, uso intensivo del escáner y la interacción con MIGO, dejando Ventas y Compras en un plano secundario.

Regla general UX: Máximo 3 toques, mínima escritura manual, escáner predominante.

---

## Nueva Jerarquía de Navegación (Bottom Tab / Menú)
`[🏠 Panel] [📦 Inventario] [📷 Escáner] [🔄 Movs] [🤖 MIGO] [⚙️ Más]`

---

## 1. Login

**Objetivo:** Ingreso rápido y seguro, offline-first.

```text
+-------------------------------------------------+
|                                                 |
|               [ LOGO MIGO ]                     |
|           Inventario Inteligente                |
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
+-------------------------------------------------+
```

---

## 2. Dashboard (Centro de Control)

**Objetivo:** Control absoluto de la bodega. Alertas, MIGO y accesos rápidos a operaciones de inventario, no de ventas.

```text
+-------------------------------------------------+
| [Foto]   Hola, María!         [☁️ Sync] [🔔 2]   |
|                                                 |
|  +-------------------+   +-------------------+  |
|  |   [📷 Escáner]    |   |    [🔄 Movimiento]|  |
|  |   ESCANEAR        |   |   REGISTRAR       |  |
|  +-------------------+   +-------------------+  |
|  +-------------------+   +-------------------+  |
|  |   [📦 Inventario] |   |    [🤖 MIGO]      |  |
|  |   CONSULTAR       |   |   PREGUNTAR IA    |  |
|  +-------------------+   +-------------------+  |
|                                                 |
|  🚨 Alertas Inteligentes (MIGO):               |
|  [!] Coca Cola 600ml está a punto de agotarse.  |
|  [!] 3 discrepancias en stock detectadas hoy.   |
|                                                 |
|  Última Actividad:                              |
|  > Entrada: 50x Cajas Cartón      [Hace 5m]     |
|  > Salida: 2x Cinta Adhesiva      [Hace 10m]    |
|                                                 |
|-------------------------------------------------|
| [🏠 Panel] [📦 Inv] [📷 Escan] [🔄 Movs] [🤖 MIGO]|
+-------------------------------------------------+
```

---

## 3. Inventario (Módulo Principal)

**Objetivo:** Búsqueda instantánea, filtros ágiles e indicadores visuales de salud de stock.

```text
+-------------------------------------------------+
|  [< Atrás]       INVENTARIO       [🔍 Buscar]   |
|                                                 |
|  [ Filtros: Todo | Favoritos | Bajo Stock ▾ ]   |
|                                                 |
|  +-------------------------------------------+  |
|  | ➕ NUEVO PRODUCTO                         |  |
|  +-------------------------------------------+  |
|                                                 |
|  [🥑 Aguacate Hass] (⭐) [Foto]                 |
|  Stock: 150 u. | Bodega A, Estante 2        [>] |
|  ---------------------------------------------  |
|  [🔴] [🥤 Coca Cola 600ml] [Foto]               |
|  Stock: 3 u. (CRÍTICO) | Bodega Principal   [>] |
|  ---------------------------------------------  |
|  [🟢] [🥖 Pan Francés] [Foto]                   |
|  Stock: 500 u. | Mostrador Frontal          [>] |
|  ---------------------------------------------  |
|                                                 |
|-------------------------------------------------|
| [🏠 Panel] [📦 Inv] [📷 Escan] [🔄 Movs] [🤖 MIGO]|
+-------------------------------------------------+
```

---

## 4. Producto (Detalle Expandido)

**Objetivo:** Mostrar información extensa y preparada para crecer, con énfasis en Insights de IA.

```text
+-------------------------------------------------+
|  [< Atrás]    DETALLE DE PRODUCTO      [✏️ Editar] |
|                                                 |
|  [ 📷 Foto del Producto ]                       |
|  Coca Cola 600ml                                |
|  SKU: CC-600 | Cód Barras: 7501055...           |
|                                                 |
|  Stock Actual:                                  |
|  [ - ]        3         [ + ]    (BODEGA A)     |
|                                                 |
|  🤖 MIGO Insights:                              |
|  "Rotación alta. Sugiero comprar 50 unidades    |
|  para cubrir el fin de semana."                 |
|                                                 |
|  Datos Financieros (Plegable ▾):                |
|  - Precio Venta: $1.50 | Costo Promedio: $0.90  |
|  - Margen: 40%                                  |
|                                                 |
|  Logística y Trazabilidad (Plegable ▾):         |
|  - Lotes / Fechas de Caducidad                  |
|  - Proveedor Principal: Distribuidora XYZ       |
|                                                 |
|  [ Ver Historial de Movimientos de este item ]  |
|                                                 |
|-------------------------------------------------|
| [🏠 Panel] [📦 Inv] [📷 Escan] [🔄 Movs] [🤖 MIGO]|
+-------------------------------------------------+
```

---

## 5. Escáner (Módulo Principal)

**Objetivo:** Flujo ultra rápido para operar usando códigos de barras o QR.

```text
+-------------------------------------------------+
|  [< Atrás]        ESCÁNER                       |
|                                                 |
|                                                 |
|          [ VISOR DE CÁMARA ACTIVO ]             |
|          [     --- LÍNEA ---      ]             |
|          [                        ]             |
|                                                 |
|                                                 |
|  [ 🔦 Linterna ]            [ ⌨️ Ingreso Manual ] |
|                                                 |
|  ---------------------------------------------  |
|  ¿Qué deseas hacer al escanear?                 |
|  ( ) Solo buscar y abrir detalle                |
|  ( ) Entrada rápida (+1)                        |
|  ( ) Salida rápida (-1)                         |
|                                                 |
|-------------------------------------------------|
| [🏠 Panel] [📦 Inv] [📷 Escan] [🔄 Movs] [🤖 MIGO]|
+-------------------------------------------------+
```

---

## 6. Movimientos (Pantalla Específica)

**Objetivo:** Registrar entradas, salidas o transferencias sin pasar por "Compras/Ventas".

```text
+-------------------------------------------------+
|  [< Atrás]    NUEVO MOVIMIENTO                  |
|                                                 |
|  Tipo de Movimiento:                            |
|  [ Entrada ] [ Salida ] [ Ajuste ] [ Traslado ] |
|                                                 |
|  Item a mover:                                  |
|  +-------------------------------------------+  |
|  | 🔍 Buscar o [📷 Escanear]                 |  |
|  +-------------------------------------------+  |
|                                                 |
|  [🥤 Coca Cola 600ml]                           |
|  Cantidad a retirar:                            |
|  [ - ]       10        [ + ]                    |
|                                                 |
|  Motivo (Opcional):                             |
|  [ Daño / Merma / Venta / Consumo interno ]     |
|                                                 |
|  +-------------------------------------------+  |
|  |       ✅ CONFIRMAR MOVIMIENTO             |  |
|  +-------------------------------------------+  |
|                                                 |
+-------------------------------------------------+
```

---

## 7. MIGO (Asistente de IA Avanzado)

**Objetivo:** Sentirse como un empleado experto en inventario, no solo un chatbot.

```text
+-------------------------------------------------+
|  [< Atrás]         MIGO IA            [ℹ️ Info] |
|                                                 |
|  [Mensaje MIGO]:                                |
|  ¡Hola! Soy MIGO. Puedo registrar inventario,   |
|  analizar tu stock y sugerir compras.           |
|                                                 |
|            +----------------------------------+ |
|            | "¿Cuáles son los 3 productos con | |
|            | menor rotación?"                 | |
|            +----------------------------------+ |
|                                                 |
|  [Mensaje MIGO]:                                |
|  Analizando... Los productos son:               |
|  1. Botella Plástica 1L (0 movs en 30 días)     |
|  2. Taza Blanca (2 movs en 30 días)             |
|  [ Ver Reporte Completo ]                       |
|                                                 |
|            +----------------------------------+ |
|            | [ 📷 Envía foto de factura ]     | |
|            +----------------------------------+ |
|                                                 |
|  +-------------------------------------------+  |
|  | [📷] [⌨️ Pide un ajuste o reporte...] [🎙️] |  |
|  +-------------------------------------------+  |
|                                                 |
|-------------------------------------------------|
| [🏠 Panel] [📦 Inv] [📷 Escan] [🔄 Movs] [🤖 MIGO]|
+-------------------------------------------------+
```

---

## Módulos Secundarios (Prioridad Reducida)

Las siguientes pantallas existen pero se acceden desde un menú secundario (`[⚙️ Más]`).

### 8. Compras & Ventas (Reducidos)
Estructuralmente similares a "Movimientos", pero catalogan la transacción financieramente. Han sido removidos de la navegación principal.

### 9. Reportes
```text
+-------------------------------------------------+
|  [< Atrás]        REPORTES                      |
|                                                 |
|  [📈 Valorización del Inventario]               |
|  [📊 Movimientos por Bodega]                    |
|  [📉 Rotación y Rentabilidad]                   |
|                                                 |
|  * MIGO puede generar reportes personalizados.  |
+-------------------------------------------------+
```

### 10. Configuración (Expandida)
```text
+-------------------------------------------------+
|  [< Atrás]      CONFIGURACIÓN                   |
|                                                 |
|  PERFIL: 🏢 Mi Tiendita                         |
|  👤 Usuario: Administrador                      |
|                                                 |
|  SISTEMA Y HARDWARE:                            |
|  [☁️] Sincronización: Activa (Offline First)    |
|  [📱] Dispositivos Conectados: 2                |
|  [🖨️] Impresoras y Escáneres Bluetooth          |
|                                                 |
|  GESTIÓN:                                       |
|  [🏢] Empresas y Bodegas                        |
|  [👥] Usuarios y Permisos                       |
|  [🤖] Configuración del Comportamiento de IA    |
|                                                 |
|  +-------------------------------------------+  |
|  |             CERRAR SESIÓN                 |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+
```
