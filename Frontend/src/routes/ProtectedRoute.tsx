import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />; //No login
  }

  console.log('user object:', user);

  let userRole = '';
  if (user.esAdmin) userRole = 'admin';
  else if (user.esNomina) userRole = 'nomina';
  else if (user.esJefe) userRole = 'jefe';

  if (!allowedRoles.includes(userRole)) {
    console.log('user role:', userRole, 'allowed roles:', allowedRoles);
    return <Navigate to="/unauthorized" replace />; //Sin permisos de rol
  }

  return <Outlet />;
};

export default ProtectedRoute;
