import { getDatabase } from '../database';
import { addToSyncQueue } from '../sync';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export interface Product {
    id: string;
    name: string;
    barcode: string | null;
    priceBuy: number;
    priceSell: number;
    stock: number;
    category: string | null;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    version: number;
    isDeleted: number;
}

export const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'isDeleted'>) => {
    const db = await getDatabase();
    const id = uuidv4();
    const now = new Date().toISOString();

    const product: Product = {
        ...productData,
        id,
        createdAt: now,
        updatedAt: now,
        version: 1,
        isDeleted: 0,
    };

    await db.runAsync(
        `INSERT INTO products (id, name, barcode, priceBuy, priceSell, stock, category, image, createdAt, updatedAt, version, isDeleted)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [product.id, product.name, product.barcode, product.priceBuy, product.priceSell, product.stock, product.category, product.image, product.createdAt, product.updatedAt, product.version, product.isDeleted]
    );

    // Queue sync
    await addToSyncQueue(uuidv4(), 'CREATE', 'products', product.id, product);

    return product;
};

export const updateProduct = async (id: string, updates: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'isDeleted'>>) => {
    const db = await getDatabase();
    const now = new Date().toISOString();

    // Get existing product to increment version
    const existing = await db.getFirstAsync<Product>(`SELECT * FROM products WHERE id = ?`, [id]);
    if (!existing) throw new Error("Product not found");

    const updatedVersion = existing.version + 1;

    const keys = Object.keys(updates);
    const values = Object.values(updates);

    const setClause = keys.map(k => `${k} = ?`).join(', ');

    await db.runAsync(
        `UPDATE products SET ${setClause}, updatedAt = ?, version = ? WHERE id = ?`,
        [...values, now, updatedVersion, id]
    );

    // Fetch updated row to send in payload
    const updatedRow = await db.getFirstAsync<Product>(`SELECT * FROM products WHERE id = ?`, [id]);

    // Queue sync
    await addToSyncQueue(uuidv4(), 'UPDATE', 'products', id, updatedRow);

    return updatedRow;
};

export const deleteProduct = async (id: string) => {
    const db = await getDatabase();
    const now = new Date().toISOString();

    const existing = await db.getFirstAsync<Product>(`SELECT * FROM products WHERE id = ?`, [id]);
    if (!existing) return;

    const updatedVersion = existing.version + 1;

    // Soft delete
    await db.runAsync(
        `UPDATE products SET isDeleted = 1, updatedAt = ?, version = ? WHERE id = ?`,
        [now, updatedVersion, id]
    );

    // Queue sync
    await addToSyncQueue(uuidv4(), 'DELETE', 'products', id, { id });
};

export const getProducts = async (): Promise<Product[]> => {
    const db = await getDatabase();
    return await db.getAllAsync<Product>(`SELECT * FROM products WHERE isDeleted = 0 ORDER BY name ASC`);
};
