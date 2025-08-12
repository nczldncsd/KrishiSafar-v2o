import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  MapPin, 
  Star, 
  Eye, 
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import AnimatedButton from '../../components/shared/AnimatedButton';
import { HOST_ROUTES } from '../../utils/routes';
import RoleGuard from '../../components/shared/RoleGuard';

const HostDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with real API calls
  const dashboardStats = [
    { title: 'Total Experiences', value: '8', icon: MapPin, color: 'text-blue-600', change: '+2 this month' },
    { title: 'Active Bookings', value: '12', icon: Calendar, color: 'text-green-600', change: '+5 this week' },
    { title: 'Total Revenue', value: '₹45,000', icon: DollarSign, color: 'text-yellow-600', change: '+₹8,000 this month' },
    { title: 'Average Rating', value: '4.8', icon: Star, color: 'text-purple-600', change: '+0.2 this month' }
  ];

  const recentBookings = [
    {
      id: 1,
      guestName: 'Priya Sharma',
      experience: 'Organic Farm Experience',
      date: '2024-02-15',
      guests: 3,
      amount: '₹4,500',
      status: 'confirmed'
    },
    {
      id: 2,
      guestName: 'Rajesh Kumar',
      experience: 'Dairy Farm Adventure',
      date: '2024-02-18',
      guests: 2,
      amount: '₹4,000',
      status: 'pending'
    },
    {
      id: 3,
      guestName: 'Meera Patel',
      experience: 'Vineyard Tour',
      date: '2024-02-20',
      guests: 4,
      amount: '₹14,000',
      status: 'confirmed'
    }
  ];

  const experiences = [
    {
      id: 1,
      title: 'Organic Farm Experience',
      category: 'Farming',
      status: 'active',
      bookings: 45,
      revenue: '₹67,500',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Dairy Farm Adventure',
      category: 'Dairy',
      status: 'active',
      bookings: 32,
      revenue: '₹64,000',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Spice Garden Tour',
      category: 'Spices',
      status: 'draft',
      bookings: 0,
      revenue: '₹0',
      rating: 0,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'draft':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <RoleGuard requiredRole="host">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Host Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage your farm experiences and bookings</p>
              </div>
              <AnimatedButton
                size="lg"
                icon={<Plus className="w-4 h-4" />}
                onClick={() => window.location.href = HOST_ROUTES.CREATE_EXPERIENCE}
              >
                Add New Experience
              </AnimatedButton>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'experiences', label: 'My Experiences', icon: MapPin },
                { id: 'bookings', label: 'Bookings', icon: Calendar },
                { id: 'earnings', label: 'Earnings', icon: DollarSign },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {dashboardStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                      </div>
                      <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Bookings */}
                <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{booking.guestName}</h4>
                            <p className="text-sm text-gray-600">{booking.experience}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>{booking.date}</span>
                              <span>{booking.guests} guests</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{booking.amount}</p>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span className="ml-1 capitalize">{booking.status}</span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <AnimatedButton
                        variant="outline"
                        size="sm"
                        fullWidth
                        onClick={() => setActiveTab('bookings')}
                      >
                        View All Bookings
                      </AnimatedButton>
                    </div>
                  </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <AnimatedButton
                        variant="outline"
                        size="lg"
                        fullWidth
                        icon={<Plus className="w-4 h-4" />}
                        onClick={() => window.location.href = HOST_ROUTES.CREATE_EXPERIENCE}
                      >
                        Create New Experience
                      </AnimatedButton>
                      <AnimatedButton
                        variant="outline"
                        size="lg"
                        fullWidth
                        icon={<Calendar className="w-4 h-4" />}
                        onClick={() => setActiveTab('bookings')}
                      >
                        Manage Bookings
                      </AnimatedButton>
                      <AnimatedButton
                        variant="outline"
                        size="lg"
                        fullWidth
                        icon={<DollarSign className="w-4 h-4" />}
                        onClick={() => setActiveTab('earnings')}
                      >
                        View Earnings
                      </AnimatedButton>
                      <AnimatedButton
                        variant="outline"
                        size="lg"
                        fullWidth
                        icon={<TrendingUp className="w-4 h-4" />}
                        onClick={() => setActiveTab('analytics')}
                      >
                        View Analytics
                      </AnimatedButton>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'experiences' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">My Experiences</h3>
                    <AnimatedButton
                      size="sm"
                      icon={<Plus className="w-4 h-4" />}
                      onClick={() => window.location.href = HOST_ROUTES.CREATE_EXPERIENCE}
                    >
                      Add Experience
                    </AnimatedButton>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {experiences.map((experience) => (
                      <motion.div
                        key={experience.id}
                        variants={itemVariants}
                        className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="h-48 overflow-hidden">
                          <img
                            src={experience.image}
                            alt={experience.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(experience.status)}`}>
                              {getStatusIcon(experience.status)}
                              <span className="ml-1 capitalize">{experience.status}</span>
                            </span>
                            <span className="text-xs text-gray-500">{experience.category}</span>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">{experience.title}</h4>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center justify-between">
                              <span>Bookings:</span>
                              <span className="font-medium">{experience.bookings}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Revenue:</span>
                              <span className="font-medium">{experience.revenue}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Rating:</span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="font-medium">{experience.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 mt-4">
                            <AnimatedButton
                              variant="outline"
                              size="sm"
                              icon={<Eye className="w-4 h-4" />}
                              className="flex-1"
                            >
                              View
                            </AnimatedButton>
                            <AnimatedButton
                              variant="outline"
                              size="sm"
                              icon={<Edit className="w-4 h-4" />}
                              className="flex-1"
                              onClick={() => window.location.href = `${HOST_ROUTES.EDIT_EXPERIENCE.replace(':id', experience.id)}`}
                            >
                              Edit
                            </AnimatedButton>
                            <AnimatedButton
                              variant="outline"
                              size="sm"
                              icon={<Trash2 className="w-4 h-4" />}
                              className="text-red-600 hover:text-red-700 hover:border-red-300"
                            >
                              Delete
                            </AnimatedButton>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'bookings' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">All Bookings</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <motion.div
                        key={booking.id}
                        variants={itemVariants}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{booking.guestName}</h4>
                          <p className="text-sm text-gray-600">{booking.experience}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>{booking.date}</span>
                            <span>{booking.guests} guests</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{booking.amount}</p>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1 capitalize">{booking.status}</span>
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'earnings' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Earnings Overview</h3>
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Earnings dashboard coming soon...</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Analytics Dashboard</h3>
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Analytics dashboard coming soon...</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </RoleGuard>
  );
};

export default HostDashboardPage;