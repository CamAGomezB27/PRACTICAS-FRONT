import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/" replace />; //No login
  }

  console.log('user object:', user);

  let userRole = '';
  if (user.rol === 'Administrador') userRole = 'admin';
  else if (user.rol === 'Gestor de Nomina') userRole = 'nomina';
  else if (user.rol === 'Jefe de Tienda') userRole = 'jefe';

  if (!allowedRoles.includes(userRole)) {
    console.log('user role:', userRole, 'allowed roles:', allowedRoles);
    return <Navigate to="/unauthorized" replace />; //Sin permisos de rol
  }

  return <Outlet />;
};

export default ProtectedRoute;
