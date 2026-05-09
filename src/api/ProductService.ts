import { Product, AdminProduct } from '../types/products';
import { apiClient } from './apiClient';

export const ProductService = {
  async getProducts(params?: { brand?: string; search?: string }): Promise<Product[]> {
    const query = new URLSearchParams();
    if (params?.brand) query.append('brand', params.brand);
    if (params?.search) query.append('search', params.search);
    
    return apiClient.get(`/products?${query.toString()}`);
  },

  async getProductById(id: string): Promise<Product> {
    return apiClient.get(`/products/${id}`);
  },

  // Admin APIs
  async getAdminProducts(): Promise<AdminProduct[]> {
    return apiClient.get('/Product');
  },

  async createProduct(data: FormData): Promise<AdminProduct> {
    return apiClient.post('/Product', data);
  },

  async updateProduct(id: string, data: FormData): Promise<AdminProduct> {
    return apiClient.put(`/Product/${id}`, data);
  },

  async deleteProduct(id: string): Promise<boolean> {
    return apiClient.delete(`/Product/${id}`);
  }
};
