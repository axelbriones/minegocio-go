import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  barcode?: string;
  priceBuy: number;
  priceSell: number;
  stock: number;
  category?: string;
  image?: string;
  sku?: string;
  warehouse?: string;
  location?: string;
}

interface InventoryState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  lastSync: string | null;
  setLastSync: (date: string) => void;
}

export const useInventoryStore = create<InventoryState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  updateProduct: (product) => set((state) => ({
    products: state.products.map(p => p.id === product.id ? product : p)
  })),
  lastSync: null,
  setLastSync: (date) => set({ lastSync: date }),
}));
