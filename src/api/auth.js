import axiosInstance from './axiosInstance';
import { mockService, shouldUseMocks } from '../services/mockService';

const AUTH_URL = '/cyberpolygon/v1/auth';

export const login = async (email, password) => {
  if (shouldUseMocks()) {
    return mockService.auth.login(email, password);
  }
  
  const response = await axiosInstance.post('/token/', { email, password });
  
  if (response.data.access) {
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
  }
  
  return response.data;
};

export const register = async (username, email, password) => {
  if (shouldUseMocks()) {
    return mockService.auth.register(username, email, password);
  }
  
  const response = await axiosInstance.post('/auth/signup/', { username, email, password });
  
  if (response.data.access) {
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
  }
  
  return response.data;
};

export const logout = async () => {
  if (shouldUseMocks()) {
    return mockService.auth.logout();
  }
  
  try {
    const response = await axiosInstance.post('/auth/logout/');
    return response.data;
  } finally {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};

export const getCurrentUser = async () => {
  if (shouldUseMocks()) {
    return mockService.auth.getCurrentUser();
  }
  
  const response = await axiosInstance.get('/auth/user/');
  return response.data;
};

export const updateProfile = async (data) => {
  if (shouldUseMocks()) {
    return mockService.auth.updateProfile(data);
  }
  
  const response = await axiosInstance.patch('/auth/me/', data);
  return response.data;
};

export const changePassword = async (currentPassword, newPassword) => {
  if (shouldUseMocks()) {
    return mockService.auth.changePassword(currentPassword, newPassword);
  }
  
  const response = await axiosInstance.post('/auth/change-password/', {
    current_password: currentPassword,
    new_password: newPassword
  });
  return response.data;
};

/**
 * Get OAuth authorization URL
 * @param {string} provider - Provider name: 'google', 'github', 'yandex'
 * @returns {Promise<string>} Authorization URL
 */
export const getOAuthUrl = async (provider) => {
  if (shouldUseMocks()) {
    return mockService.auth.getOAuthUrl(provider);
  }
  
  const response = await axiosInstance.get(`/auth/oauth/${provider}/`);
  return response.data.authorization_url;
};

/**
 * Handle OAuth callback with authorization code
 * @param {string} provider - Provider name
 * @param {string} code - Authorization code from OAuth provider
 * @returns {Promise<Object>} Auth response with token and user info
 */
export const handleOAuthCallback = async (provider, code, state) => {
  if (shouldUseMocks()) {
    return mockService.auth.handleOAuthCallback();
  }
  
  const response = await axiosInstance.post(`/auth/oauth/${provider}/callback/`, {
    code,
    state
  });
  
  if (response.data && response.data.access) {
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
  }
  
  return response.data;
};

/**
 * Check if user is authenticated based on token presence
 * @returns {boolean} Authentication status
 */
export const isAuthenticated = () => {
  return localStorage.getItem('access_token') !== null;
};

const authApi = {
  login,
  register,
  logout,
  getCurrentUser,
  updateProfile,
  changePassword,
  getOAuthUrl,
  handleOAuthCallback,
  isAuthenticated
};

export default authApi;