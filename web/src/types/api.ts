// Dashboard
export interface DashboardStats {
  totalProducts: number;
  lowStockProducts: number;
  totalMovements: number;
  inputs: number;
  outputs: number;
  inventoryValue: number;
  outOfStockProducts: number;
}

// Product
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  status: 'active' | 'inactive';
  lastModified: string;
}

export type CreateProductInput = Omit<Product, 'id' | 'lastModified'>;

// Movement
export interface Movement {
  id: string;
  productId: string;
  productName: string;
  type: 'IN' | 'OUT' | 'ADJUST' | 'TRANSFER';
  quantity: number;
  date: string;
  reason?: string;
}

// Alert
export interface Alert {
  id: string;
  type: 'LOW_STOCK' | 'OUT_OF_STOCK' | 'EXPIRING_SOON' | 'AI_INSIGHT';
  message: string;
  date: string;
  severity: 'low' | 'medium' | 'high';
  relatedEntityId?: string;
}

// AI
export interface AIAnalysisResult {
  insight: string;
  confidence: number;
}

export interface AISuggestion {
  action: 'BUY' | 'SELL_FIRST' | 'DISCOUNT' | 'RESTOCK';
  productName: string;
  reason: string;
}

export interface AIHistoryItem {
  id: string;
  query: string;
  response: string;
  date: string;
}

// Customer
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalPurchases: number;
}

// Sale
export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Sale {
  id: string;
  customerId?: string;
  customerName?: string;
  date: string;
  items: SaleItem[];
  total: number;
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
  paymentMethod: string;
}

// Config
export interface Config {
  companyName: string;
  branch: string;
  currency: string;
  theme: 'light' | 'dark' | 'system';
}
