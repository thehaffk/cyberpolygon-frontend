import axiosInstance from './axiosInstance';

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  id?: number;
  username?: string;
  email?: string;
}

interface UserProfile {
  id: number;
  username: string;
  email: string;
  telegram_id?: string;
  roles?: string[];
  teams?: {
    id: number;
    name: string;
    role: string;
  }[];
  bio?: string;
}

const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/cyberpolygon/v1/auth/login/', credentials);
    const data = response.data;
    
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  },
  
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/cyberpolygon/v1/auth/signup/', userData);
    const data = response.data;
    
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  },
  
  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post('/cyberpolygon/v1/auth/logout/');
    } finally {
      localStorage.removeItem('token');
    }
  },
  
  isAuthenticated: (): boolean => {
    return localStorage.getItem('token') !== null;
  },
  
  getCurrentUser: async (): Promise<UserProfile | null> => {
    try {
      const response = await axiosInstance.get('/cyberpolygon/v1/profile/');
      return response.data;
    } catch (error) {
      return null;
    }
  },
  
  updateProfile: async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await axiosInstance.patch('/cyberpolygon/v1/profile/', profileData);
    return response.data;
  }
};

export default authApi; 