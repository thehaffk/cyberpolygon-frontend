import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Для отладки состояния Redux
const preloadedState = {
  user: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }
};

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});

// Для отладки в консоли
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

export default store; 