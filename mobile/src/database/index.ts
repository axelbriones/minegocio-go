import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const getDatabase = async () => {
  if (db) return db;
  db = await SQLite.openDatabaseAsync('minegociogo.db');
  return db;
};

export const initDatabase = async () => {
  const database = await getDatabase();

  await database.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      barcode TEXT,
      priceBuy REAL NOT NULL,
      priceSell REAL NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      category TEXT,
      image TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      version INTEGER NOT NULL DEFAULT 1,
      isDeleted INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS sales (
      id TEXT PRIMARY KEY NOT NULL,
      total REAL NOT NULL,
      paymentType TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      version INTEGER NOT NULL DEFAULT 1,
      isDeleted INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS sale_items (
      id TEXT PRIMARY KEY NOT NULL,
      saleId TEXT NOT NULL,
      productId TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (saleId) REFERENCES sales (id) ON DELETE CASCADE,
      FOREIGN KEY (productId) REFERENCES products (id)
    );

    CREATE TABLE IF NOT EXISTS purchases (
      id TEXT PRIMARY KEY NOT NULL,
      supplier TEXT,
      total REAL NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      version INTEGER NOT NULL DEFAULT 1,
      isDeleted INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS purchase_items (
      id TEXT PRIMARY KEY NOT NULL,
      purchaseId TEXT NOT NULL,
      productId TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (purchaseId) REFERENCES purchases (id) ON DELETE CASCADE,
      FOREIGN KEY (productId) REFERENCES products (id)
    );

    CREATE TABLE IF NOT EXISTS stock_movements (
      id TEXT PRIMARY KEY NOT NULL,
      type TEXT NOT NULL, -- 'IN' or 'OUT'
      productId TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      reason TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      version INTEGER NOT NULL DEFAULT 1,
      isDeleted INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (productId) REFERENCES products (id)
    );

    CREATE TABLE IF NOT EXISTS sync_queue (
      id TEXT PRIMARY KEY NOT NULL,
      operation TEXT NOT NULL, -- 'CREATE', 'UPDATE', 'DELETE'
      entity TEXT NOT NULL,
      entityId TEXT NOT NULL,
      payload TEXT,
      status TEXT NOT NULL DEFAULT 'PENDING', -- 'PENDING', 'ERROR'
      error TEXT,
      retryCount INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
};
