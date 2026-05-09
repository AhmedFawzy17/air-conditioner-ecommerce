import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminGuard: React.FC = () => {
  const { isLoggedIn, user } = useAuth();
  
  const isAdmin = user.roles.includes('Admin');

  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminGuard;
