import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('role');
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (userRole !== allowedRole) {
    // If logged in but wrong role, redirect to their respective dashboard
    switch (userRole) {
      case 'admin': return <Navigate to="/admin-dashboard" replace />;
      case 'author': return <Navigate to="/author/dashboard" replace />;
      case 'reviewer': return <Navigate to="/reviewer-dashboard" replace />;
      case 'developer': return <Navigate to="/developer-dashboard" replace />;
      default: return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
