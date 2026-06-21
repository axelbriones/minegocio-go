import { getDatabase } from '../database';
import { addToSyncQueue } from '../sync';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export interface Purchase {
    id: string;
    supplier: string | null;
    total: number;
    createdAt: string;
    updatedAt: string;
    version: number;
    isDeleted: number;
}

export interface PurchaseItem {
    id: string;
    purchaseId: string;
    productId: string;
    quantity: number;
    price: number;
}

export const createPurchase = async (supplier: string | null, total: number, items: Omit<PurchaseItem, 'id' | 'purchaseId'>[]) => {
    const db = await getDatabase();
    const purchaseId = uuidv4();
    const now = new Date().toISOString();

    const purchase: Purchase = {
        id: purchaseId,
        supplier,
        total,
        createdAt: now,
        updatedAt: now,
        version: 1,
        isDeleted: 0,
    };

    await db.withTransactionAsync(async () => {
        // 1. Insert Purchase
        await db.runAsync(
            `INSERT INTO purchases (id, supplier, total, createdAt, updatedAt, version, isDeleted)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [purchase.id, purchase.supplier, purchase.total, purchase.createdAt, purchase.updatedAt, purchase.version, purchase.isDeleted]
        );

        // 2. Insert Items & Update Stock
        for (const item of items) {
            const itemId = uuidv4();
            await db.runAsync(
                `INSERT INTO purchase_items (id, purchaseId, productId, quantity, price) VALUES (?, ?, ?, ?, ?)`,
                [itemId, purchaseId, item.productId, item.quantity, item.price]
            );

            // Add to stock
            await db.runAsync(
                `UPDATE products SET stock = stock + ?, updatedAt = ?, version = version + 1 WHERE id = ?`,
                [item.quantity, now, item.productId]
            );
        }
    });

    const fullPayload = { ...purchase, items };
    await addToSyncQueue(uuidv4(), 'CREATE', 'purchases', purchaseId, fullPayload);

    return purchase;
};
