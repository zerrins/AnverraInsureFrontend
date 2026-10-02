import apiClient from './apiClient';
import type { User } from '../types/user';

export const profileApi = {
  getMe: async () => {
    const response = await apiClient.get<{ success: boolean; data: User }>('/profile/me');
    return response.data.data;
  },
  updateProfile: async (data: Partial<User>) => {
    const response = await apiClient.put<{ success: boolean; data: User }>('/profile/me', data);
    return response.data.data;
  },
};
