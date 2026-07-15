import apiClient from './apiClient';
import type { AuthResponse, OtpPurpose, OtpResponse } from '../types/auth';

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post<{ success: boolean; data: AuthResponse; message: string }>('/auth/login', credentials);
    return response.data.data;
  },

  loginWithOtp: async (data: { phone: string; otp: string; purpose: OtpPurpose }) => {
    const response = await apiClient.post<{ success: boolean; data: AuthResponse; message: string }>('/auth/login/otp', data);
    return response.data.data;
  },

  signup: async (data: any) => {
    const response = await apiClient.post<{ success: boolean; data: AuthResponse; message: string }>('/auth/signup', data);
    return response.data.data;
  },

  sendOtp: async (data: { phone: string; purpose: OtpPurpose }) => {
    const response = await apiClient.post<OtpResponse>('/auth/otp/send', data);
    return response.data;
  },

  verifyOtp: async (data: { phone: string; otp: string; purpose: OtpPurpose }) => {
    const response = await apiClient.post<{ success: boolean; message: string }>('/auth/otp/verify', data);
    return response.data;
  },

  refresh: async (refreshToken: string) => {
    // using raw axios or skipping interceptors to prevent infinite loops on 401
    const response = await apiClient.post<{ success: boolean; data: AuthResponse; message: string }>('/auth/refresh', { refreshToken });
    return response.data.data;
  },

  logout: async () => {
    const response = await apiClient.post<{ success: boolean; message: string }>('/auth/logout');
    return response.data;
  }
};
