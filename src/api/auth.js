import axiosInstance from './axiosInstance';

const AUTH_URL = '/cyberpolygon/v1/auth';

export const login = async (credentials) => {
  const response = await axiosInstance.post(`${AUTH_URL}/login/`, credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const register = async (userData) => {
  const response = await axiosInstance.post(`${AUTH_URL}/register/`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get(`${AUTH_URL}/me/`);
  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await axiosInstance.patch(`${AUTH_URL}/me/`, userData);
  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await axiosInstance.post(`${AUTH_URL}/change-password/`, passwordData);
  return response.data;
}; 