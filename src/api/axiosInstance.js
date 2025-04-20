import axios from 'axios';
import { API } from '../config/env';

const axiosInstance = axios.create({
  baseURL: API.URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Если 401 и нет флага retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (refreshToken) {
          // Попытка обновить токен
          const response = await axios.post(`${API.BASE_URL}/api/token/refresh/`, {
            refresh: refreshToken
          });
          
          if (response.data.access) {
            localStorage.setItem('access_token', response.data.access);
            
            // Обновляем заголовок и повторяем запрос
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
            
            return axiosInstance(originalRequest);
          }
        }
      } catch (refreshError) {
        // Если не удалось обновить токен, выходим
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/auth';
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;