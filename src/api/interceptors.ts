import axiosClient from './axiosClient';

export const setupInterceptors = () => {
  axiosClient.interceptors.request.use(
    (config) => {
      // Placeholder for authentication token
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized (e.g., redirect to login or refresh token)
        console.error('Unauthorized access');
      }
      return Promise.reject(error);
    }
  );
};
