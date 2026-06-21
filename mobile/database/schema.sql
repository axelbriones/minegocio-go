CREATE TABLE IF NOT EXISTS User (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'USER',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Product (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  stock INTEGER DEFAULT 0,
  barcode TEXT,
  imageUrl TEXT,
  category TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE INDEX IF NOT EXISTS idx_product_userId ON Product(userId);
CREATE INDEX IF NOT EXISTS idx_product_barcode ON Product(barcode);
CREATE INDEX IF NOT EXISTS idx_product_name ON Product(name);

CREATE TABLE IF NOT EXISTS Sale (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  total REAL NOT NULL,
  paymentMethod TEXT DEFAULT 'CASH',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE INDEX IF NOT EXISTS idx_sale_userId ON Sale(userId);
CREATE INDEX IF NOT EXISTS idx_sale_createdAt ON Sale(createdAt);

CREATE TABLE IF NOT EXISTS SaleItem (
  id TEXT PRIMARY KEY,
  saleId TEXT NOT NULL,
  productId TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL,
  FOREIGN KEY (saleId) REFERENCES Sale(id),
  FOREIGN KEY (productId) REFERENCES Product(id)
);

CREATE INDEX IF NOT EXISTS idx_saleItem_saleId ON SaleItem(saleId);
CREATE INDEX IF NOT EXISTS idx_saleItem_productId ON SaleItem(productId);

CREATE TABLE IF NOT EXISTS Purchase (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  total REAL NOT NULL,
  supplier TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE INDEX IF NOT EXISTS idx_purchase_userId ON Purchase(userId);
CREATE INDEX IF NOT EXISTS idx_purchase_createdAt ON Purchase(createdAt);

CREATE TABLE IF NOT EXISTS PurchaseItem (
  id TEXT PRIMARY KEY,
  purchaseId TEXT NOT NULL,
  productId TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  cost REAL NOT NULL,
  FOREIGN KEY (purchaseId) REFERENCES Purchase(id),
  FOREIGN KEY (productId) REFERENCES Product(id)
);

CREATE INDEX IF NOT EXISTS idx_purchaseItem_purchaseId ON PurchaseItem(purchaseId);
CREATE INDEX IF NOT EXISTS idx_purchaseItem_productId ON PurchaseItem(productId);

CREATE TABLE IF NOT EXISTS StockMovement (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  productId TEXT NOT NULL,
  type TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  reason TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES User(id),
  FOREIGN KEY (productId) REFERENCES Product(id)
);

CREATE INDEX IF NOT EXISTS idx_stockMovement_userId ON StockMovement(userId);
CREATE INDEX IF NOT EXISTS idx_stockMovement_productId ON StockMovement(productId);
CREATE INDEX IF NOT EXISTS idx_stockMovement_createdAt ON StockMovement(createdAt);

-- Sync Queue Table
CREATE TABLE IF NOT EXISTS SyncQueue (
  id TEXT PRIMARY KEY,
  entityId TEXT NOT NULL,
  entityType TEXT NOT NULL,
  operation TEXT NOT NULL, -- CREATE, UPDATE, DELETE
  payload TEXT NOT NULL,
  status TEXT DEFAULT 'PENDING',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_syncQueue_status ON SyncQueue(status);
