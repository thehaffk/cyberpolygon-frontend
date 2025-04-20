import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { login, logout, getCurrentUser } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (email: string, password: string) => {
    try {
      await dispatch(login()).unwrap();
    } catch (err) {
      console.error('Failed to login:', err);
      throw err;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const checkAuth = async () => {
    try {
      await dispatch(getCurrentUser()).unwrap();
    } catch (err) {
      console.error('Failed to get current user:', err);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login: handleLogin,
    logout: handleLogout,
    checkAuth
  };
}; 