import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
};

export const fetchSales = async () => {
    const response = await axios.get(`${API_URL}/sales`);
    return response.data;
};

export const fetchPurchases = async () => {
    const response = await axios.get(`${API_URL}/purchases`);
    return response.data;
};

// Polling function for the web dashboard to keep it "live"
export const pollData = async (callback: (data: any) => void) => {
    const interval = setInterval(async () => {
        try {
            const [products, sales, purchases] = await Promise.all([
                fetchProducts(),
                fetchSales(),
                fetchPurchases()
            ]);
            callback({ products, sales, purchases });
        } catch (error) {
            console.error("Polling error:", error);
        }
    }, 5000); // Poll every 5 seconds for dashboard freshness
    return () => clearInterval(interval);
};
