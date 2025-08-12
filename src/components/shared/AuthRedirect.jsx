import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { PUBLIC_ROUTES } from '../../utils/routes.js';

const AuthRedirect = ({ children, redirectTo = PUBLIC_ROUTES.HOME }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // If authenticated, redirect to specified route or home
  if (isAuthenticated) {
    // If there's a redirect state from previous navigation, use that
    const from = location.state?.from?.pathname;
    return <Navigate to={from || redirectTo} replace />;
  }

  // User is not authenticated, show the component (login/signup forms)
  return children;
};

export default AuthRedirect;