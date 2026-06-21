import { supabase } from './supabase';

export const api = {
  products: {
    list: async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      return data;
    },
    getById: async (id: string) => {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    },
    getByBarcode: async (barcode: string) => {
      const { data, error } = await supabase.from('products').select('*').eq('barcode', barcode).single();
      if (error) throw error;
      return data;
    }
  },
  movements: {
    create: async (movement: any) => {
      const { data, error } = await supabase.from('stock_movements').insert([movement]);
      if (error) throw error;
      return data;
    },
    listRecent: async (productId: string) => {
      const { data, error } = await supabase.from('stock_movements').select('*').eq('productId', productId).order('createdAt', { ascending: false }).limit(10);
      if (error) throw error;
      return data;
    }
  }
};
