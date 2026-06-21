import { getDatabase } from '../database';

export type SyncOperation = 'CREATE' | 'UPDATE' | 'DELETE';
export type SyncEntity = 'products' | 'sales' | 'purchases';

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
  // Fetch PENDING and ERROR items that haven't hit max retries
  return await db.getAllAsync<SyncQueueItem>(
    `SELECT * FROM sync_queue WHERE (status = 'PENDING' OR status = 'ERROR') AND retryCount < 3 ORDER BY createdAt ASC`
  );
};

export const markSyncItemError = async (id: string, errorMsg: string, retryCount: number) => {
  const db = await getDatabase();
  const newRetryCount = retryCount + 1;

  // If it hits 3 retries, we might want to mark it as permanently failed, or just keep it as ERROR
  // but it won't be picked up by getPendingSyncItems anymore due to the retryCount < 3 check.
  await db.runAsync(
    `UPDATE sync_queue SET status = 'ERROR', error = ?, retryCount = ? WHERE id = ?`,
    [errorMsg, newRetryCount, id]
  );
};

export const removeSyncItem = async (id: string) => {
  const db = await getDatabase();
  await db.runAsync(`DELETE FROM sync_queue WHERE id = ?`, [id]);
};

// Mock function for backend API call
const pushToBackend = async (item: SyncQueueItem) => {
  // In a real app, this would be a fetch call to the backend
  console.log(`Pushing to backend: ${item.operation} ${item.entity} ${item.entityId}`);
  // Simulate network request
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        // Randomly succeed or fail for demonstration
        if (Math.random() > 0.8) {
             reject(new Error("Network error simulation"));
        } else {
             resolve(true);
        }
    }, 500);
  });
};

export const processSyncQueue = async () => {
  console.log("Processing sync queue...");
  const items = await getPendingSyncItems();

  for (const item of items) {
    try {
      await pushToBackend(item);
      // If successful, remove from queue
      await removeSyncItem(item.id);
      console.log(`Successfully synced item ${item.id}`);
    } catch (error: any) {
      console.error(`Failed to sync item ${item.id}: ${error.message}`);
      await markSyncItemError(item.id, error.message, item.retryCount);
    }
  }
};

interface SyncableEntity {
  id: string;
  version: number;
  updatedAt: string;
  isDeleted: number;
  [key: string]: any;
}

// Conflict resolution and Merge
export const resolveConflict = (localItem: SyncableEntity, remoteItem: SyncableEntity): SyncableEntity => {
    // 1. If remote version is strictly greater, server wins
    if (remoteItem.version > localItem.version) {
        return remoteItem;
    }
    // 2. If local version is greater, local wins
    if (localItem.version > remoteItem.version) {
        return localItem;
    }

    // 3. Versions are equal. Fallback to updatedAt timestamp
    const localDate = new Date(localItem.updatedAt).getTime();
    const remoteDate = new Date(remoteItem.updatedAt).getTime();

    if (remoteDate > localDate) {
        return remoteItem;
    }

    return localItem;
};

// Merging a remote item into local DB
export const mergeRemoteItem = async (entity: SyncEntity, remoteItem: SyncableEntity) => {
    const db = await getDatabase();

    // Check if item exists locally
    const localItem = await db.getFirstAsync<SyncableEntity>(
        `SELECT * FROM ${entity} WHERE id = ?`,
        [remoteItem.id]
    );

    if (!localItem) {
        // Doesn't exist locally, so we insert it
        const keys = Object.keys(remoteItem);
        const values = Object.values(remoteItem);
        const placeholders = keys.map(() => '?').join(', ');

        await db.runAsync(
            `INSERT INTO ${entity} (${keys.join(', ')}) VALUES (${placeholders})`,
            values
        );
        console.log(`Merged new remote item into ${entity}`);
        return;
    }

    // Conflict resolution
    const winningItem = resolveConflict(localItem, remoteItem);

    if (winningItem === remoteItem) {
        // Remote won, update local DB
        const keys = Object.keys(remoteItem).filter(k => k !== 'id');
        const setClause = keys.map(k => `${k} = ?`).join(', ');
        const values = keys.map(k => remoteItem[k]);

        await db.runAsync(
            `UPDATE ${entity} SET ${setClause} WHERE id = ?`,
            [...values, remoteItem.id]
        );
        console.log(`Updated local item ${remoteItem.id} in ${entity} with remote version`);
    } else {
         console.log(`Local item ${localItem.id} in ${entity} is newer or same, kept local version`);
    }
};
