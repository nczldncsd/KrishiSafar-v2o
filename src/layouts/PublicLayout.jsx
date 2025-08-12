import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { PUBLIC_ROUTES, NAVIGATION_STRUCTURE } from '../utils/routes.js';

const PublicLayout = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const isActiveRoute = (path) => {
    if (path === PUBLIC_ROUTES.HOME) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
  };

  // Get navigation items based on user role
  const getNavigationItems = () => {
    if (isAuthenticated) {
      if (user?.role === 'host') {
        return NAVIGATION_STRUCTURE.host;
      } else if (user?.role === 'admin') {
        return NAVIGATION_STRUCTURE.admin;
      } else {
        return NAVIGATION_STRUCTURE.user;
      }
    }
    return NAVIGATION_STRUCTURE.public;
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to={PUBLIC_ROUTES.HOME} className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-700 transition-colors duration-200">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                KrishiSafar
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActiveRoute(item.path)
                      ? 'text-primary-600 bg-primary-50 border border-primary-200'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Auth Actions */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    Welcome, {user?.name}
                  </span>
                  
                  {/* Host Dashboard Link */}
                  {user?.role === 'host' && (
                    <Link
                      to="/host/dashboard"
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                      Host Dashboard
                    </Link>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to={PUBLIC_ROUTES.LOGIN}
                    className="text-sm text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to={PUBLIC_ROUTES.SIGNUP}
                    className="btn-primary text-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <span className="text-xl font-bold">KrishiSafar</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Connecting urban travelers with authentic rural experiences. 
                Discover the beauty of agriculture and rural life through 
                carefully curated agri-tourism experiences across India.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to={PUBLIC_ROUTES.HOME} className="text-gray-300 hover:text-white text-sm transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={PUBLIC_ROUTES.EXPERIENCES} className="text-gray-300 hover:text-white text-sm transition-colors">
                    Explore Farms
                  </Link>
                </li>
                <li>
                  <Link to={PUBLIC_ROUTES.ABOUT} className="text-gray-300 hover:text-white text-sm transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to={PUBLIC_ROUTES.CONTACT} className="text-gray-300 hover:text-white text-sm transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Email: info@krishisafar.com</p>
                <p>Phone: +91 98765 43210</p>
                <p>Address: Mumbai, Maharashtra</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 KrishiSafar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;