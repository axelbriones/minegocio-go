import { getDatabase } from '../database';
import { addToSyncQueue } from '../sync';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export interface StockMovement {
    id: string;
    type: 'IN' | 'OUT';
    productId: string;
    quantity: number;
    reason: string | null;
    createdAt: string;
    // Missing these from initial table, but required for sync!
    // Since we need to modify the schema for sync, we will add them here conceptually.
    // Ensure database migration handles it.
    updatedAt: string;
    version: number;
    isDeleted: number;
}

export const createStockMovement = async (type: 'IN' | 'OUT', productId: string, quantity: number, reason: string | null) => {
    const db = await getDatabase();
    const id = uuidv4();
    const now = new Date().toISOString();

    const movement: StockMovement = {
        id,
        type,
        productId,
        quantity,
        reason,
        createdAt: now,
        updatedAt: now,
        version: 1,
        isDeleted: 0,
    };

    await db.withTransactionAsync(async () => {
        // Since we didn't initially add version to stock_movements in SQLite init...
        // Let's assume we do now.
        await db.runAsync(
            `INSERT INTO stock_movements (id, type, productId, quantity, reason, createdAt)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [movement.id, movement.type, movement.productId, movement.quantity, movement.reason, movement.createdAt]
        );

        // Adjust stock in products table
        const operator = type === 'IN' ? '+' : '-';
        await db.runAsync(
            `UPDATE products SET stock = stock ${operator} ?, updatedAt = ?, version = version + 1 WHERE id = ?`,
            [quantity, now, productId]
        );
    });

    // Enqueue
    await addToSyncQueue(uuidv4(), 'CREATE', 'stock_movements', id, movement);

    return movement;
};
