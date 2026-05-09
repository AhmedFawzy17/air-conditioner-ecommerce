import { OrderRequest, OrderResponse } from '../types/products';
import { apiClient } from './apiClient';

export const OrderService = {
  async createOrder(orderData: OrderRequest): Promise<OrderResponse> {
    return apiClient.post('/orders', orderData);
  },

  async getMyOrders(): Promise<OrderResponse[]> {
    return apiClient.get('/orders/my-orders');
  }
};
