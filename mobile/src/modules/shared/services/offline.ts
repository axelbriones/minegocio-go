import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const getPendingSyncCount = async () => {
  const database = await getDatabase();
  const result = await database.getFirstAsync<{ count: number }>("SELECT COUNT(*) as count FROM sync_queue WHERE synced = 0");
  return result ? result.count : 0;
};

export const getDatabase = async () => {
  if (db) return db;
  db = await SQLite.openDatabaseAsync('minegociogo.db');
  return db;
};

export const initOfflineDatabase = async () => {
  const database = await getDatabase();
  await database.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS sync_queue (
      id TEXT PRIMARY KEY NOT NULL,
      entity TEXT NOT NULL,
      action TEXT NOT NULL,
      payload TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      synced INTEGER DEFAULT 0
    );
  `);
};

export const enqueueSync = async (entity: string, action: string, payload: any) => {
  const database = await getDatabase();
  const id = Date.now().toString(); // simple ID generator for now
  await database.runAsync(
    'INSERT INTO sync_queue (id, entity, action, payload, createdAt) VALUES (?, ?, ?, ?, ?)',
    [id, entity, action, JSON.stringify(payload), new Date().toISOString()]
  );
};
