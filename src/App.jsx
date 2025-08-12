import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.js';
import { PUBLIC_ROUTES, PROTECTED_ROUTES, SYSTEM_ROUTES } from './utils/routes.js';

// Layouts
import PublicLayout from './layouts/PublicLayout.jsx';
import AppLayout from './layouts/AppLayout.jsx';

// Public Pages
import HomePage from './pages/public/HomePage.jsx';
import ExperienceListingPage from './pages/public/ExperienceListingPage.jsx';
import ExperienceDetailPage from './pages/public/ExperienceDetailPage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import SignupPage from './pages/auth/SignupPage.jsx';

// Protected Pages
import BookingPage from './pages/user/BookingPage.jsx';

// System Pages
import NotFoundPage from './pages/system/NotFoundPage.jsx';

const App = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes with PublicLayout */}
      <Route path={PUBLIC_ROUTES.HOME} element={
        <PublicLayout>
          <HomePage />
        </PublicLayout>
      } />
      
      <Route path={PUBLIC_ROUTES.EXPERIENCES} element={
        <PublicLayout>
          <ExperienceListingPage />
        </PublicLayout>
      } />
      
      <Route path={PUBLIC_ROUTES.EXPERIENCE_DETAIL} element={
        <PublicLayout>
          <ExperienceDetailPage />
        </PublicLayout>
      } />
      
      <Route path={PUBLIC_ROUTES.LOGIN} element={
        <PublicLayout>
          <LoginPage />
        </PublicLayout>
      } />
      
      <Route path={PUBLIC_ROUTES.SIGNUP} element={
        <PublicLayout>
          <SignupPage />
        </PublicLayout>
      } />

      {/* Protected Routes with AppLayout */}
      {isAuthenticated && (
        <>
          <Route path={PROTECTED_ROUTES.BOOKING} element={
            <AppLayout>
              <BookingPage />
            </AppLayout>
          } />
          
          {/* Add more protected routes here as needed */}
          {/* <Route path={PROTECTED_ROUTES.PROFILE} element={
            <AppLayout>
              <ProfilePage />
            </AppLayout>
          } /> */}
          
          {/* <Route path={PROTECTED_ROUTES.MY_BOOKINGS} element={
            <AppLayout>
              <MyBookingsPage />
            </AppLayout>
          } /> */}
        </>
      )}

      {/* 404 Fallback */}
      <Route path={SYSTEM_ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;