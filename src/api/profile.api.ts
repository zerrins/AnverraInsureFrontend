import apiClient from './apiClient';
import type { User } from '../types/user';

export const profileApi = {
  getMe: async () => {
    const response = await apiClient.get<{ success: boolean; data: User }>('/profile/me');
    return response.data.data;
  },
};
