import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ redirectPath = '/login' }) => {
  // Проверка на наличие токена в localStorage для имитации авторизации
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  if (!isAuthenticated) {
    // Если пользователь не авторизован, перенаправляем на страницу логина
    return <Navigate to={redirectPath} replace />;
  }

  // Если пользователь авторизован, рендерим вложенные маршруты
  return <Outlet />;
};

export default PrivateRoute; 