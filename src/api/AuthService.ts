import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';
import { apiClient } from './apiClient';

export const AuthService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    return apiClient.post('/auth/login', data);
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    return apiClient.post('/auth/register', data);
  },
};
