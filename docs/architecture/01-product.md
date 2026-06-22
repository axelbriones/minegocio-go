# Arquitectura de Dominio: Product (Producto)

Este documento detalla la estructura y el diseño del dominio `Product` bajo los principios de **Domain-Driven Design (DDD)** y **Clean Architecture** dentro de nuestro monorepo.

El objetivo del dominio `Product` es gestionar los artículos que se pueden vender o comprar en la aplicación.

---

## 1. Capa de Dominio (`packages/domain`)

La capa más interna de la aplicación. No tiene dependencias externas y define las reglas de negocio, las entidades y las interfaces que las capas exteriores deberán implementar.

### 1.1 Entidades (Entities)

La entidad principal es `Product`. Representa un artículo en el inventario.

**Atributos de `Product`:**
- `id` (UUID): Identificador único del producto.
- `name` (String): Nombre del producto (Ej: "Coca Cola 600ml").
- `barcode` (String, Opcional): Código de barras para escaneo rápido.
- `price` (Number): Precio de venta al público.
- `cost` (Number): Costo de adquisición.
- `stock` (Number): Cantidad actual disponible en el inventario.
- `createdAt` (Date): Fecha de creación.
- `updatedAt` (Date): Fecha de la última modificación.

### 1.2 Value Objects (Objetos de Valor)

Para encapsular reglas de validación sin identidad propia:
- `Price`: Garantiza que el precio no pueda ser negativo o tener más de 2 decimales.
- `StockQuantity`: Garantiza que la cantidad de stock sea un número entero y maneja la lógica para saber si un producto está agotado.

### 1.3 Interfaces de Repositorio (Repository Interfaces)

Contratos que dictan cómo interactuar con el almacenamiento persistente de productos. La implementación real vivirá en la capa de infraestructura.

```typescript
interface ProductRepository {
  findById(id: string): Promise<Product | null>;
  findByBarcode(barcode: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  save(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
  updateStock(id: string, quantity: number): Promise<void>;
}
```

---

## 2. Capa de Aplicación (`packages/application`)

Esta capa contiene los **Casos de Uso (Use Cases)**. Define el flujo de las operaciones de la aplicación y orquesta la comunicación entre las entidades del dominio y los repositorios. Depende exclusivamente de `packages/domain`.

### 2.1 Casos de Uso del Producto

- **`CreateProductUseCase`**: Recibe datos crudos, valida mediante objetos de valor y usa el repositorio para guardar un nuevo `Product`.
- **`UpdateProductUseCase`**: Permite modificar detalles del producto, como nombre o precio.
- **`GetProductByIdUseCase`**: Retorna la información de un producto específico.
- **`ListProductsUseCase`**: Devuelve el inventario completo.
- **`AdjustProductStockUseCase`**: Lógica vital para incrementar o decrementar el stock tras una venta, compra o ajuste manual, asegurando que las reglas del objeto `StockQuantity` se cumplan.

---

## 3. Capa de Infraestructura (`packages/infrastructure`)

Aquí es donde interactuamos con el mundo exterior: bases de datos, APIs de terceros, sistema de archivos local, etc. Depende de `packages/domain` (para implementar interfaces) y `packages/application` (para ejecutar casos de uso a través de controladores).

### 3.1 Implementación de Repositorios

- **`SQLiteProductRepository`**: Implementa `ProductRepository` utilizando Expo SQLite para persistencia local offline (First priority).
- **`PostgresProductRepository`**: Implementa `ProductRepository` para el entorno de backend (`apps/api`) usando PostgreSQL.

### 3.2 Sincronización y Eventos

- Cuando se crea o actualiza un producto en el modo offline, la infraestructura emite un evento (ej: `ProductCreatedEvent`).
- **Sync Engine**: Un proceso en background (dentro de infrastructure) toma estos eventos de una cola local y los sincroniza con la API remota cuando haya conexión a internet.

---

## 4. Capas de Presentación (Apps)

Las aplicaciones consumen la capa de `application` y `infrastructure` (para la inyección de dependencias).

- **`apps/mobile`**: Interfaz de React Native. Construye los repositorios locales (`SQLiteProductRepository`), inyecta en los casos de uso (`ListProductsUseCase`) y los invoca al presionar botones (Ej: "Crear Producto"). Maneja el estado UI con `Zustand`.
- **`apps/web`**: Panel administrativo de Next.js, consume APIs para mostrar y reportar sobre el catálogo de productos.
- **`apps/api`**: Expone endpoints REST/GraphQL, inyecta `PostgresProductRepository` en los casos de uso de la aplicación, aplica la validación JWT, y actualiza la base de datos central.

---

## 5. Resumen del Flujo de Creación de Producto (Ejemplo)

1. El usuario llena el formulario en `apps/mobile` y presiona "Guardar".
2. `apps/mobile` llama a `CreateProductUseCase.execute(datos)`.
3. El caso de uso crea la entidad `Product` y la valida usando `Price` y `StockQuantity`.
4. El caso de uso llama a `productRepository.save(product)`.
5. La instancia de `SQLiteProductRepository` inserta la fila en la tabla local.
6. El UI se actualiza inmediatamente sin esperar la red. La sincronización subirá el registro en background.