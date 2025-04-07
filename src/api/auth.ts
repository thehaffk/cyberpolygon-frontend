import axiosInstance from './axiosInstance';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: number;
    username: string;
    email: string;
  };
  token: string;
}

const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/api/auth/login/', credentials);
    const data = response.data;
    
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  },
  
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/api/auth/register/', userData);
    const data = response.data;
    
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  },
  
  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post('/api/auth/logout/');
    } finally {
      localStorage.removeItem('token');
    }
  },
  
  isAuthenticated: (): boolean => {
    return localStorage.getItem('token') !== null;
  },
  
  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get('/api/auth/user/');
      return response.data;
    } catch (error) {
      return null;
    }
  }
};

export default authApi; 