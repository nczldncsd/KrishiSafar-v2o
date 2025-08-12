import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { PUBLIC_ROUTES } from '../../utils/routes.js';

const RoleGuard = ({ children, requiredRole, fallback = PUBLIC_ROUTES.HOME }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // If not authenticated, redirect to fallback
  if (!isAuthenticated) {
    return <Navigate to={fallback} state={{ from: location }} replace />;
  }

  // If role is required and user doesn't have it, redirect to fallback
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={fallback} state={{ from: location }} replace />;
  }

  // User is authenticated and has required role (if specified)
  return children;
};

export default RoleGuard;