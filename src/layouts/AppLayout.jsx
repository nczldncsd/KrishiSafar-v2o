import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { PUBLIC_ROUTES, PROTECTED_ROUTES, HOST_ROUTES } from '../utils/routes.js';
import { 
  Home, 
  Map, 
  Calendar, 
  User, 
  LogOut, 
  ChevronDown, 
  Settings,
  BarChart3,
  DollarSign,
  Plus,
  Heart,
  CreditCard,
  Bell
} from 'lucide-react';

const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getNavigationItems = () => {
    if (user?.role === 'host') {
      return [
        { path: HOST_ROUTES.DASHBOARD, label: 'Dashboard', icon: BarChart3 },
        { path: HOST_ROUTES.EXPERIENCES, label: 'My Experiences', icon: Map },
        { path: HOST_ROUTES.BOOKINGS, label: 'Bookings', icon: Calendar },
        { path: HOST_ROUTES.CREATE_EXPERIENCE, label: 'Create Experience', icon: Plus },
      ];
    } else {
      return [
        { path: PUBLIC_ROUTES.HOME, label: 'Home', icon: Home },
        { path: PUBLIC_ROUTES.EXPERIENCES, label: 'Explore Farms', icon: Map },
        { path: PROTECTED_ROUTES.MY_BOOKINGS, label: 'My Bookings', icon: Calendar },
        { path: PROTECTED_ROUTES.WISHLIST, label: 'Wishlist', icon: Heart },
      ];
    }
  };

  const getQuickActions = () => {
    if (user?.role === 'host') {
      return [
        { path: PROTECTED_ROUTES.PROFILE, label: 'Profile', icon: User },
        { path: HOST_ROUTES.CREATE_EXPERIENCE, label: 'Create Experience', icon: Plus },
      ];
    } else {
      return [
        { path: PROTECTED_ROUTES.PROFILE, label: 'Profile', icon: User },
        { path: PROTECTED_ROUTES.PAYMENTS, label: 'Payments', icon: CreditCard },
        { path: PROTECTED_ROUTES.NOTIFICATIONS, label: 'Notifications', icon: Bell },
      ];
    }
  };

  const navigationItems = getNavigationItems();
  const quickActions = getQuickActions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
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

            {/* Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
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

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* Quick Actions */}
              <div className="hidden md:flex space-x-2">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.path}
                      to={action.path}
                      className="p-2 rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-blue-100 hover:to-purple-100 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  );
                })}
              </div>

              {/* User Profile */}
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-sm font-medium border border-white/30">
                    {getUserInitials(user?.name || 'User')}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs opacity-80 capitalize">{user?.role}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 opacity-100 visible transition-all duration-200 z-50">
                    <div className="p-4">
                      {/* User Info */}
                      <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {getUserInitials(user?.name || 'User')}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{user?.name}</p>
                          <p className="text-sm text-slate-600 capitalize">{user?.role}</p>
                        </div>
                      </div>

                      {/* Navigation Links */}
                      <div className="space-y-1">
                        {quickActions.map((action) => {
                          const Icon = action.icon;
                          return (
                            <Link
                              key={action.path}
                              to={action.path}
                              onClick={() => setIsProfileOpen(false)}
                              className="flex items-center space-x-3 px-3 py-2 rounded-xl text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-200"
                            >
                              <Icon className="w-4 h-4" />
                              <span className="text-sm font-medium">{action.label}</span>
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
          </div>
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
              <p className="text-slate-300 text-sm leading-relaxed">
                Connecting urban travelers with authentic rural experiences. 
                Discover the beauty of agriculture and rural life through 
                carefully curated agri-tourism experiences across India.
              </p>
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
                    Experiences
                  </Link>
                </li>
                {user?.role === 'user' && (
                  <li>
                    <Link to={PROTECTED_ROUTES.MY_BOOKINGS} className="text-slate-300 hover:text-blue-400 text-sm transition-colors duration-200">
                      My Bookings
                    </Link>
                  </li>
                )}
                {user?.role === 'host' && (
                  <li>
                    <Link to={HOST_ROUTES.DASHBOARD} className="text-slate-300 hover:text-blue-400 text-sm transition-colors duration-200">
                      Host Dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <p>Email: info@krishisafar.com</p>
                <p>Phone: +91 98765 43210</p>
                <p>Address: Mumbai, Maharashtra</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-slate-400 text-sm">
              © 2024 KrishiSafar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Backdrop for dropdown */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </div>
  );
};

export default AppLayout;