import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.js';
import { PUBLIC_ROUTES, PROTECTED_ROUTES, HOST_ROUTES, ADMIN_ROUTES, SYSTEM_ROUTES } from './utils/routes.js';

// Layouts
import PublicLayout from './layouts/PublicLayout.jsx';
import AppLayout from './layouts/AppLayout.jsx';

// Public Pages
import HomePage from './pages/public/HomePage.jsx';
import ExperienceListingPage from './pages/public/ExperienceListingPage.jsx';
import ExperienceDetailPage from './pages/public/ExperienceDetailPage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import SignupPage from './pages/auth/SignupPage.jsx';
import AboutPage from './pages/public/AboutPage.jsx';
import ContactPage from './pages/public/ContactPage.jsx';
import FAQPage from './pages/public/FAQPage.jsx';
import TermsPage from './pages/public/TermsPage.jsx';
import PrivacyPage from './pages/public/PrivacyPage.jsx';
import BecomeHostPage from './pages/public/BecomeHostPage.jsx';

// Protected Pages
import BookingPage from './pages/user/BookingPage.jsx';

// Host Pages
import HostDashboardPage from './pages/host/HostDashboardPage.jsx';

// System Pages
import NotFoundPage from './pages/system/NotFoundPage.jsx';

const App = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

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

      <Route path={PUBLIC_ROUTES.ABOUT} element={
        <PublicLayout>
          <AboutPage />
        </PublicLayout>
      } />

      <Route path={PUBLIC_ROUTES.CONTACT} element={
        <PublicLayout>
          <ContactPage />
        </PublicLayout>
      } />

      <Route path={PUBLIC_ROUTES.FAQ} element={
        <PublicLayout>
          <FAQPage />
        </PublicLayout>
      } />

      <Route path={PUBLIC_ROUTES.TERMS} element={
        <PublicLayout>
          <TermsPage />
        </PublicLayout>
      } />

      <Route path={PUBLIC_ROUTES.PRIVACY} element={
        <PublicLayout>
          <PrivacyPage />
        </PublicLayout>
      } />

      <Route path={PUBLIC_ROUTES.BECOME_HOST} element={
        <PublicLayout>
          <BecomeHostPage />
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

      {/* Host Routes with AppLayout */}
      {isAuthenticated && user?.role === 'host' && (
        <>
          <Route path={HOST_ROUTES.DASHBOARD} element={
            <AppLayout>
              <HostDashboardPage />
            </AppLayout>
          } />
          
          {/* Add more host routes here as needed */}
          {/* <Route path={HOST_ROUTES.EXPERIENCES} element={
            <AppLayout>
              <HostExperiencesPage />
            </AppLayout>
          } /> */}
          
          {/* <Route path={HOST_ROUTES.CREATE_EXPERIENCE} element={
            <AppLayout>
              <CreateExperiencePage />
            </AppLayout>
          } /> */}
        </>
      )}

      {/* Admin Routes with AppLayout */}
      {isAuthenticated && user?.role === 'admin' && (
        <>
          {/* Add admin routes here as needed */}
          {/* <Route path={ADMIN_ROUTES.DASHBOARD} element={
            <AppLayout>
              <AdminDashboardPage />
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