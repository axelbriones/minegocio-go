import { getDatabase } from '../database';
import { apiPushToBackend, apiFetchRemoteChanges } from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SyncOperation = 'CREATE' | 'UPDATE' | 'DELETE';
export type SyncEntity = 'products' | 'sales' | 'purchases' | 'stock_movements';

export interface SyncQueueItem {
  id: string;
  operation: SyncOperation;
  entity: SyncEntity;
  entityId: string;
  payload: string | null;
  status: 'PENDING' | 'ERROR';
  error: string | null;
  retryCount: number;
  createdAt: string;
}

export const addToSyncQueue = async (
  id: string,
  operation: SyncOperation,
  entity: SyncEntity,
  entityId: string,
  payload: any = null
) => {
  const db = await getDatabase();
  const payloadStr = payload ? JSON.stringify(payload) : null;

  await db.runAsync(
    `INSERT INTO sync_queue (id, operation, entity, entityId, payload) VALUES (?, ?, ?, ?, ?)`,
    [id, operation, entity, entityId, payloadStr]
  );
};

export const getPendingSyncItems = async (): Promise<SyncQueueItem[]> => {
  const db = await getDatabase();
  return await db.getAllAsync<SyncQueueItem>(
    `SELECT * FROM sync_queue WHERE (status = 'PENDING' OR status = 'ERROR') AND retryCount < 3 ORDER BY createdAt ASC`
  );
};

export const markSyncItemError = async (id: string, errorMsg: string, retryCount: number) => {
  const db = await getDatabase();
  const newRetryCount = retryCount + 1;

  await db.runAsync(
    `UPDATE sync_queue SET status = 'ERROR', error = ?, retryCount = ? WHERE id = ?`,
    [errorMsg, newRetryCount, id]
  );
};

export const removeSyncItem = async (id: string) => {
  const db = await getDatabase();
  await db.runAsync(`DELETE FROM sync_queue WHERE id = ?`, [id]);
};

let isSyncing = false;
const SYNC_CURSOR_KEY = '@last_sync_timestamp';

const getLastSyncTimestamp = async () => {
    try {
        const val = await AsyncStorage.getItem(SYNC_CURSOR_KEY);
        return val || new Date(0).toISOString();
    } catch {
        return new Date(0).toISOString();
    }
}

const setLastSyncTimestamp = async (ts: string) => {
    try {
        await AsyncStorage.setItem(SYNC_CURSOR_KEY, ts);
    } catch (e) {
        console.error("Failed to save sync cursor", e);
    }
}

export const processSyncQueue = async () => {
  if (isSyncing) return;
  isSyncing = true;

  try {
      console.log("Processing sync queue...");
      const items = await getPendingSyncItems();

      if (items.length > 0) {
          for (const item of items) {
            try {
              console.log(`Pushing to backend: ${item.operation} ${item.entity} ${item.entityId}`);

              if (item.retryCount > 0) {
                  const backoffDelay = Math.pow(2, item.retryCount) * 1000;
                  console.log(`Backoff delay for ${item.id}: ${backoffDelay}ms`);
                  await new Promise(resolve => setTimeout(resolve, backoffDelay));
              }

              await apiPushToBackend(item);
              await removeSyncItem(item.id);
              console.log(`Successfully synced item ${item.id}`);
            } catch (error: any) {
              console.error(`Failed to sync item ${item.id}: ${error.message}`);
              await markSyncItemError(item.id, error.message, item.retryCount);
            }
          }
      } else {
         console.log("No pending items in sync queue.");
      }

      // --- Download Remote Changes (PULL) ---
      let lastSyncTimestamp = await getLastSyncTimestamp();
      console.log(`Fetching remote changes since ${lastSyncTimestamp}...`);

      const entities: SyncEntity[] = ['products', 'sales', 'purchases'];
      let maxUpdatedAtFetched = lastSyncTimestamp;

      for (const entity of entities) {
          try {
              const remoteItems = await apiFetchRemoteChanges(entity, lastSyncTimestamp);
              for (const rItem of remoteItems) {
                  await mergeRemoteItemSafely(entity, rItem);

                  if (new Date(rItem.updatedAt) > new Date(maxUpdatedAtFetched)) {
                      maxUpdatedAtFetched = rItem.updatedAt;
                  }
              }
          } catch (error: any) {
              console.error(`Error pulling ${entity}:`, error.message);
          }
      }

      await setLastSyncTimestamp(maxUpdatedAtFetched);

  } finally {
      isSyncing = false;
  }
};

interface SyncableEntity {
  id: string;
  version: number;
  updatedAt: string;
  isDeleted: number;
  [key: string]: any;
}

export const resolveConflict = (localItem: SyncableEntity, remoteItem: SyncableEntity): SyncableEntity => {
    if (remoteItem.version > localItem.version) return remoteItem;
    if (localItem.version > remoteItem.version) return localItem;

    const localDate = new Date(localItem.updatedAt).getTime();
    const remoteDate = new Date(remoteItem.updatedAt).getTime();

    return remoteDate > localDate ? remoteItem : localItem;
};

// Merging a remote item safely without dynamic Object.keys that crash SQLite
export const mergeRemoteItemSafely = async (entity: SyncEntity, remoteItem: SyncableEntity) => {
    const db = await getDatabase();

    const localItem = await db.getFirstAsync<SyncableEntity>(
        `SELECT * FROM ${entity} WHERE id = ?`,
        [remoteItem.id]
    );

    // Whitelist columns to avoid SQLite crash from unexpected JSON properties like 'items'
    const getEntityColumns = (ent: string) => {
        if (ent === 'products') return ['id', 'name', 'barcode', 'priceBuy', 'priceSell', 'stock', 'category', 'image', 'createdAt', 'updatedAt', 'version', 'isDeleted'];
        if (ent === 'sales') return ['id', 'total', 'paymentType', 'createdAt', 'updatedAt', 'version', 'isDeleted'];
        if (ent === 'purchases') return ['id', 'supplier', 'total', 'createdAt', 'updatedAt', 'version', 'isDeleted'];
        return [];
    };

    const allowedColumns = getEntityColumns(entity);
    if (allowedColumns.length === 0) return;

    if (!localItem) {
        const keys = allowedColumns;
        const values = keys.map(k => remoteItem[k] ?? null);
        const placeholders = keys.map(() => '?').join(', ');

        await db.runAsync(
            `INSERT INTO ${entity} (${keys.join(', ')}) VALUES (${placeholders})`,
            values
        );
        console.log(`Merged new remote item into ${entity}`);
        return;
    }

    const winningItem = resolveConflict(localItem, remoteItem);

    if (winningItem === remoteItem) {
        const keysToUpdate = allowedColumns.filter(k => k !== 'id');
        const setClause = keysToUpdate.map(k => `${k} = ?`).join(', ');
        const values = keysToUpdate.map(k => remoteItem[k] ?? null);

        await db.runAsync(
            `UPDATE ${entity} SET ${setClause} WHERE id = ?`,
            [...values, remoteItem.id]
        );
        console.log(`Updated local item ${remoteItem.id} in ${entity}`);
    }
};
