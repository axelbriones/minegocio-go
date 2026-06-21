# 📐 Diseño de Pantallas y Flujos - MI NEGOCIO GO

## 📱 Wireframes (Mobile App - Android First)

### 1. Home Screen (Inicio)
El centro de operaciones. Botones grandes y claros.

```text
+-----------------------------------+
|  [☰]       MI NEGOCIO GO     [⚙️]  |
|-----------------------------------|
|                                   |
|   +---------------------------+   |
|   |         + VENTA           |   |
|   |  (Registrar nueva venta)  |   |
|   +---------------------------+   |
|                                   |
|   +---------------------------+   |
|   |         + COMPRA          |   |
|   |  (Registrar nueva compra) |   |
|   +---------------------------+   |
|                                   |
|   [ 📦 INVENTARIO ] [ 💰 GANANCIAS] |
|                                   |
|-----------------------------------|
|          [ 🎙️ MIGO IA ]          |
|    (Toca para hablar o foto)      |
+-----------------------------------+
```

### 2. Flujo de Venta (Máximo 3 toques)
Diseñado para la rapidez en el mostrador.

**Pantalla: Nueva Venta**
```text
+-----------------------------------+
|  [←]        NUEVA VENTA           |
|-----------------------------------|
|                                   |
|  [ 📷 Escanear ]   [ 🎙️ Hablar ]   |
|                                   |
|  🔍 Buscar producto...            |
|                                   |
|  Productos Rápidos (Más vendidos) |
|  [ Coca Cola 3L ] [ Pan Integral ]|
|  [ Leche 1L     ] [ Huevos (12)  ]|
|                                   |
|-----------------------------------|
|  Carrito (2): $ 15.00             |
|                                   |
|      [ ✅ COBRAR $ 15.00 ]        |
+-----------------------------------+
```

### 3. Pantalla de Cobro
```text
+-----------------------------------+
|  [←]          COBRAR              |
|-----------------------------------|
|                                   |
|  Total a cobrar:                  |
|          $ 15.00                  |
|                                   |
|  Método de pago:                  |
|                                   |
|  [ 💵 Efectivo ]  [ 💳 Tarjeta ]   |
|  [ 📱 Transf.  ]  [ 📒 Fiado   ]   |
|                                   |
|                                   |
|      [ ✅ CONFIRMAR VENTA ]       |
+-----------------------------------+
```

### 4. Flujo de Inventario (Gestión y Creación)

**Pantalla: Inventario**
```text
+-----------------------------------+
|  [←]        INVENTARIO            |
|-----------------------------------|
|                                   |
|  🔍 Buscar / Escanear...          |
|                                   |
|  Filtros: [ Todos ] [ Bajo Stock ]|
|                                   |
|  Coca Cola 3L                     |
|  Stock: 15 | Precio: $3.00        |
|                                   |
|  Leche Deslactosada 1L            |
|  Stock: 2  | Precio: $1.50   [⚠️] |
|                                   |
|-----------------------------------|
|     [ + NUEVO PRODUCTO ]          |
+-----------------------------------+
```

**Pantalla: Nuevo Producto (Interacción IA vs Manual)**
```text
+-----------------------------------+
|  [←]      NUEVO PRODUCTO          |
|-----------------------------------|
|                                   |
|  [ 📷 Tomar Foto del Producto ]   |
|   (MIGO completará los datos)     |
|                                   |
|  -- o ingreso manual --           |
|                                   |
|  Nombre:                          |
|  [______________________________] |
|  Precio Venta:                    |
|  [$_____________________________] |
|  Stock inicial:                   |
|  [______________________________] |
|                                   |
|      [ 💾 GUARDAR PRODUCTO ]      |
+-----------------------------------+
```

---

## 🔄 Flujos Operativos (Paso a Paso)

### Flujo de Registro de Venta (Cumpliendo la regla de 3 toques)
1. **Toque 1:** En el Home, presionar `[ + VENTA ]`.
2. **Toque 2:** Seleccionar producto rápido, escanear código de barras o dictar por voz. (El carrito se actualiza automáticamente).
3. **Toque 3:** Presionar `[ ✅ COBRAR ]` (asume efectivo por defecto si no se cambia) y confirmar.
*Resultado:* La venta se guarda localmente (offline) y se encola para sincronización. El inventario se descuenta.

### Flujo de Creación de Producto (Usando MIGO IA)
1. El usuario está en Inventario y presiona `[ + NUEVO PRODUCTO ]`.
2. Presiona `[ 📷 Tomar Foto ]` y captura una imagen de una botella de jugo.
3. **Intervención de MIGO (IA Invisible):**
   - Procesa la imagen en background.
   - Identifica "Jugo del Valle Durazno 1L".
   - Rellena automáticamente el campo de "Nombre" y sugiere una categoría.
4. El usuario solo ingresa el precio y cantidad, y presiona `[ 💾 GUARDAR PRODUCTO ]`.

### Flujo de Sincronización (Offline a Online)
1. El usuario registra 10 ventas durante un corte de internet.
2. La app móvil almacena los registros en la base de datos local SQLite (Tabla `Queue`).
3. El celular detecta conexión a Wi-Fi o Datos Móviles.
4. El proceso en *background* ejecuta un push de los eventos al Backend (Node.js).
5. El Backend valida, guarda en PostgreSQL, y devuelve un "Sync OK".
6. La app marca los registros locales como sincronizados.

---

## 🎯 Conclusión del Diseño
- **Simpleza Extrema:** Sin menús hamburguesa complejos. Todo está a la vista.
- **Acciones Primarias:** Los botones de "Venta" y "Compra" dominan la pantalla.
- **IA Opcional pero Poderosa:** MIGO está siempre disponible mediante el botón de voz o iconos de cámara, pero no bloquea el flujo manual si el usuario lo prefiere.