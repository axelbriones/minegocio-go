import { getDatabase } from '../database';
import { addToSyncQueue } from '../sync';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export interface Sale {
    id: string;
    total: number;
    paymentType: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    isDeleted: number;
}

export interface SaleItem {
    id: string;
    saleId: string;
    productId: string;
    quantity: number;
    price: number;
}

export const createSale = async (total: number, paymentType: string, items: Omit<SaleItem, 'id' | 'saleId'>[]) => {
    const db = await getDatabase();
    const saleId = uuidv4();
    const now = new Date().toISOString();

    const sale: Sale = {
        id: saleId,
        total,
        paymentType,
        createdAt: now,
        updatedAt: now,
        version: 1,
        isDeleted: 0,
    };

    await db.withTransactionAsync(async () => {
        // 1. Insert Sale
        await db.runAsync(
            `INSERT INTO sales (id, total, paymentType, createdAt, updatedAt, version, isDeleted)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [sale.id, sale.total, sale.paymentType, sale.createdAt, sale.updatedAt, sale.version, sale.isDeleted]
        );

        // 2. Insert Items & Update Stock
        for (const item of items) {
            const itemId = uuidv4();
            await db.runAsync(
                `INSERT INTO sale_items (id, saleId, productId, quantity, price) VALUES (?, ?, ?, ?, ?)`,
                [itemId, saleId, item.productId, item.quantity, item.price]
            );

            // Deduct stock (simplified logic, should ideally use movements)
            await db.runAsync(
                `UPDATE products SET stock = stock - ?, updatedAt = ?, version = version + 1 WHERE id = ?`,
                [item.quantity, now, item.productId]
            );
        }
    });

    // We queue the sale with items attached for a simpler backend API,
    // or as individual operations. Assuming backend takes a nested payload.
    const fullPayload = { ...sale, items };
    await addToSyncQueue(uuidv4(), 'CREATE', 'sales', saleId, fullPayload);

    return sale;
};
