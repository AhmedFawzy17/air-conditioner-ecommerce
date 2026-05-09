import { apiClient } from './apiClient';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  address?: string;
  phone?: string;
}

export const UserService = {
  async getProfile(): Promise<UserProfile> {
    return apiClient.get('/auth/profile');
  },

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    return apiClient.post('/auth/update-profile', data);
  }
};
