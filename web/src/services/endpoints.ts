import { api } from './api';
import type {
  DashboardStats, Product, CreateProductInput, Movement,
  Alert, AIAnalysisResult, AISuggestion, AIHistoryItem,
  Customer, Sale, Config
} from '../types/api';

// Dashboard
export const getDashboardStats = () => api.get<DashboardStats>('/dashboard');

// Products
export const getProducts = () => api.get<Product[]>('/products');
export const getProduct = (id: string) => api.get<Product>(`/products/${id}`);
export const createProduct = (data: CreateProductInput) => api.post<Product>('/products', data);
export const updateProduct = (id: string, data: Partial<CreateProductInput>) => api.put<Product>(`/products/${id}`, data);
export const deleteProduct = (id: string) => api.delete<{ success: boolean }>(`/products/${id}`);

// Movements
export const getMovements = () => api.get<Movement[]>('/inventory/movements');
export const createMovement = (data: Omit<Movement, 'id' | 'productName' | 'date'>) => api.post<Movement>('/inventory/movements', data);

// Alerts
export const getAlerts = () => api.get<Alert[]>('/alerts');

// AI
export const analyzeInventoryAI = (data: Record<string, unknown>) => api.post<AIAnalysisResult>('/ai/analyze', data);
export const getInventoryAIPredictions = () => api.post<AIAnalysisResult>('/ai/inventory', {});
export const getAISuggestions = () => api.post<AISuggestion[]>('/ai/suggestions', {});
export const getAIHistory = () => api.get<AIHistoryItem[]>('/ai/history');

// Customers
export const getCustomers = () => api.get<Customer[]>('/customers');
export const createCustomer = (data: Omit<Customer, 'id' | 'totalPurchases'>) => api.post<Customer>('/customers', data);
export const updateCustomer = (id: string, data: Partial<Customer>) => api.put<Customer>(`/customers/${id}`, data);
export const deleteCustomer = (id: string) => api.delete<{ success: boolean }>(`/customers/${id}`);

// Sales
export const getSales = () => api.get<Sale[]>('/sales');

// Config
export const getConfig = () => api.get<Config>('/config');
export const updateConfig = (data: Partial<Config>) => api.put<Config>('/config', data);
