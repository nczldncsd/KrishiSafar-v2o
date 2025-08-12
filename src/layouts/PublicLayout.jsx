import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { PUBLIC_ROUTES, NAVIGATION_STRUCTURE, HOST_ROUTES } from '../utils/routes.js';
import { 
  Home, 
  Map, 
  Info, 
  Mail, 
  User, 
  LogOut, 
  Menu, 
  X,
  ChevronDown,
  BarChart3,
  Calendar,
  Heart,
  Plus,
  DollarSign,
  Users
} from 'lucide-react';
import AnimatedButton from '../components/shared/AnimatedButton';
import { motion } from 'framer-motion';

const PublicLayout = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const isActiveRoute = (path) => {
    if (path === PUBLIC_ROUTES.HOME) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate(PUBLIC_ROUTES.HOME);
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

  const getIconForRoute = (iconName) => {
    const iconMap = {
      'home': Home,
      'map': Map,
      'info': Info,
      'mail': Mail,
      'user': User,
      'dashboard': BarChart3,
      'calendar': Calendar,
      'heart': Heart,
      'dollar-sign': DollarSign,
      'bar-chart': BarChart3,
      'users': Users
    };
    return iconMap[iconName] || Home;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to={PUBLIC_ROUTES.HOME} className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                KrishiSafar
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {navigationItems.map((item) => {
                const Icon = getIconForRoute(item.icon);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                      isActiveRoute(item.path)
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Auth Actions */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {/* Host Dashboard Link */}
                  {user?.role === 'host' && (
                    <Link
                      to={HOST_ROUTES.DASHBOARD}
                      className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>Host Dashboard</span>
                    </Link>
                  )}
                  
                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-3 p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-sm font-medium border border-white/30">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs opacity-80 capitalize">{user?.role}</p>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* User Dropdown */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 opacity-100 visible transition-all duration-200 z-50">
                        <div className="p-4">
                          {/* User Info */}
                          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl mb-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800">{user?.name}</p>
                              <p className="text-sm text-slate-600 capitalize">{user?.role}</p>
                            </div>
                          </div>

                          {/* Navigation Links */}
                          <div className="space-y-1">
                            {navigationItems.map((item) => {
                              const Icon = getIconForRoute(item.icon);
                              return (
                                <Link
                                  key={item.path}
                                  to={item.path}
                                  onClick={() => setIsUserMenuOpen(false)}
                                  className="flex items-center space-x-3 px-3 py-2 rounded-xl text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-200"
                                >
                                  <Icon className="w-4 h-4" />
                                  <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                              );
                            })}
                          </div>

                          <div className="border-t border-slate-200 my-3"></div>

                          {/* Logout */}
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm font-medium">Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to={PUBLIC_ROUTES.LOGIN}>
                    <AnimatedButton
                      variant="outline"
                      size="sm"
                      className="border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                      Login
                    </AnimatedButton>
                  </Link>
                  <Link to={PUBLIC_ROUTES.SIGNUP}>
                    <AnimatedButton
                      variant="primary"
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                    >
                      Sign Up
                    </AnimatedButton>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-blue-100 hover:to-purple-100 hover:text-blue-600 transition-all duration-300"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden py-4 border-t border-slate-200"
            >
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = getIconForRoute(item.icon);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-3 ${
                        isActiveRoute(item.path)
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">K</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  KrishiSafar
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Connecting urban travelers with authentic rural experiences. 
                Discover the beauty of agriculture and rural life through 
                carefully curated agri-tourism experiences across India.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C9.901 2.013 10.256 2 12.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to={PUBLIC_ROUTES.HOME} className="text-slate-300 hover:text-blue-400 text-sm transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={PUBLIC_ROUTES.EXPERIENCES} className="text-slate-300 hover:text-blue-400 text-sm transition-colors duration-200">
                    Explore Farms
                  </Link>
                </li>
                <li>
                  <Link to={PUBLIC_ROUTES.ABOUT} className="text-slate-300 hover:text-blue-400 text-sm transition-colors duration-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to={PUBLIC_ROUTES.CONTACT} className="text-slate-300 hover:text-blue-400 text-sm transition-colors duration-200">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to={PUBLIC_ROUTES.BECOME_HOST} className="text-slate-300 hover:text-blue-400 text-sm transition-colors duration-200">
                    Become a Host
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Support & Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to={PUBLIC_ROUTES.FAQ} className="text-slate-300 hover:text-blue-400 text-sm transition-colors duration-200">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to={PUBLIC_ROUTES.TERMS} className="text-slate-300 hover:text-blue-400 text-sm transition-colors duration-200">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to={PUBLIC_ROUTES.PRIVACY} className="text-slate-300 hover:text-blue-400 text-sm transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-slate-300 hover:text-blue-400 text-sm transition-colors duration-200">
                    Safety Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-300 hover:text-blue-400 text-sm transition-colors duration-200">
                    Cancellation Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-slate-400 text-sm">
              © 2024 KrishiSafar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Backdrops for dropdowns */}
      {(isUserMenuOpen || isMobileMenuOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsMobileMenuOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default PublicLayout;