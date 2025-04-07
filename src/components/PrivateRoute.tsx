import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authApi from '../api/auth';

interface PrivateRouteProps {
  redirectPath?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  redirectPath = '/login' 
}) => {
  const isAuthenticated = authApi.isAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute; 