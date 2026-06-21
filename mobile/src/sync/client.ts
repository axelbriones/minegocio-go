import axios from 'axios';
import { SyncQueueItem } from './index';

// We use 10.0.2.2 for Android emulator to hit host's localhost, or localhost for iOS simulator.
// In a real device this would be the actual backend IP.
// For safety we will try to make this configurable, but 10.0.2.2 is safe default for Android Expo dev.
import { Platform } from 'react-native';

const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

export const apiPushToBackend = async (item: SyncQueueItem) => {
    try {
        const payload = item.payload ? JSON.parse(item.payload) : null;

        if (item.entity === 'products') {
            if (item.operation === 'CREATE') {
                await axios.post(`${API_URL}/products`, payload);
            } else if (item.operation === 'UPDATE') {
                await axios.put(`${API_URL}/products/${item.entityId}`, payload);
            } else if (item.operation === 'DELETE') {
                await axios.delete(`${API_URL}/products/${item.entityId}`);
            }
        } else if (item.entity === 'sales') {
            if (item.operation === 'CREATE') {
                await axios.post(`${API_URL}/sales`, payload);
            }
        } else if (item.entity === 'purchases') {
            if (item.operation === 'CREATE') {
                await axios.post(`${API_URL}/purchases`, payload);
            }
        } else if (item.entity === 'stock_movements') {
             if (item.operation === 'CREATE') {
                await axios.post(`${API_URL}/stock-movements`, payload);
            }
        }

        return true;
    } catch (error: any) {
        const status = error.response?.status;
        const data = error.response?.data;
        console.error(`Backend Push Error for ${item.id} [${status}]:`, data || error.message);
        throw error;
    }
};

export const apiFetchRemoteChanges = async (entity: string, lastSyncTimestamp: string) => {
    try {
        const response = await axios.get(`${API_URL}/${entity}?updatedAfter=${lastSyncTimestamp}`);
        return response.data;
    } catch (error: any) {
        console.error(`Fetch Remote Changes Error for ${entity}:`, error.message);
        throw error;
    }
};
