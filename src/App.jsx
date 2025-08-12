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

// Protected User Pages
import BookingPage from './pages/user/BookingPage.jsx';
import ProfilePage from './pages/user/ProfilePage.jsx';
import MyBookingsPage from './pages/user/MyBookingsPage.jsx';
import WishlistPage from './pages/user/WishlistPage.jsx';
import PaymentsPage from './pages/user/PaymentsPage.jsx';
import NotificationsPage from './pages/user/NotificationsPage.jsx';

// Host Pages
import HostDashboardPage from './pages/host/HostDashboardPage.jsx';
import HostExperiencesPage from './pages/host/HostExperiencesPage.jsx';
import CreateExperiencePage from './pages/host/CreateExperiencePage.jsx';
import HostBookingsPage from './pages/host/HostBookingsPage.jsx';

// System Pages
import NotFoundPage from './pages/system/NotFoundPage.jsx';

const App = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading KrishiSafar...</p>
        </div>
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

      {/* Protected User Routes with AppLayout */}
      {isAuthenticated && (
        <>
          <Route path={PROTECTED_ROUTES.BOOKING} element={
            <AppLayout>
              <BookingPage />
            </AppLayout>
          } />
          
          <Route path={PROTECTED_ROUTES.PROFILE} element={
            <AppLayout>
              <ProfilePage />
            </AppLayout>
          } />
          
          <Route path={PROTECTED_ROUTES.MY_BOOKINGS} element={
            <AppLayout>
              <MyBookingsPage />
            </AppLayout>
          } />

          <Route path={PROTECTED_ROUTES.WISHLIST} element={
            <AppLayout>
              <WishlistPage />
            </AppLayout>
          } />

          <Route path={PROTECTED_ROUTES.PAYMENTS} element={
            <AppLayout>
              <PaymentsPage />
            </AppLayout>
          } />

          <Route path={PROTECTED_ROUTES.NOTIFICATIONS} element={
            <AppLayout>
              <NotificationsPage />
            </AppLayout>
          } />
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
          
          <Route path={HOST_ROUTES.EXPERIENCES} element={
            <AppLayout>
              <HostExperiencesPage />
            </AppLayout>
          } />
          
          <Route path={HOST_ROUTES.CREATE_EXPERIENCE} element={
            <AppLayout>
              <CreateExperiencePage />
            </AppLayout>
          } />
          
          <Route path={HOST_ROUTES.BOOKINGS} element={
            <AppLayout>
              <HostBookingsPage />
            </AppLayout>
          } />
          
          {/* Add more host routes here as needed */}
          {/* <Route path={HOST_ROUTES.EDIT_EXPERIENCE} element={
            <AppLayout>
              <EditExperiencePage />
            </AppLayout>
          } /> */}
          
          {/* <Route path={HOST_ROUTES.EARNINGS} element={
            <AppLayout>
              <HostEarningsPage />
            </AppLayout>
          } /> */}
          
          {/* <Route path={HOST_ROUTES.ANALYTICS} element={
            <AppLayout>
              <HostAnalyticsPage />
            </AppLayout>
          } /> */}
          
          {/* <Route path={HOST_ROUTES.SETTINGS} element={
            <AppLayout>
              <HostSettingsPage />
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