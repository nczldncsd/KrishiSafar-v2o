import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle, 
  Info,
  Star,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Trash2,
  Settings,
  Search,
  Filter
} from 'lucide-react';
import AnimatedButton from '../../components/shared/AnimatedButton';

const NotificationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Mock data - replace with API call
  const notifications = [
    {
      id: 1,
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your booking for Organic Farm Experience on Feb 15th has been confirmed by Rajesh Kumar.',
      timestamp: '2024-02-10T10:30:00Z',
      isRead: false,
      priority: 'high',
      action: 'View Booking',
      data: {
        experience: 'Organic Farm Experience',
        date: '2024-02-15',
        host: 'Rajesh Kumar',
        amount: 4500
      }
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Upcoming Experience',
      message: 'Reminder: Your Dairy Farm Adventure is scheduled for tomorrow at 10:00 AM.',
      timestamp: '2024-02-09T15:45:00Z',
      isRead: true,
      priority: 'medium',
      action: 'View Details',
      data: {
        experience: 'Dairy Farm Adventure',
        date: '2024-02-10',
        time: '10:00 AM'
      }
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Successful',
      message: 'Payment of ₹14,000 for Vineyard & Wine Tasting has been processed successfully.',
      timestamp: '2024-02-08T14:20:00Z',
      isRead: true,
      priority: 'medium',
      action: 'Download Receipt',
      data: {
        experience: 'Vineyard & Wine Tasting',
        amount: 14000,
        transactionId: 'TXN_003_2024'
      }
    },
    {
      id: 4,
      type: 'review',
      title: 'Review Request',
      message: 'How was your Spice Garden Tour experience? Share your feedback to help other travelers.',
      timestamp: '2024-02-07T11:15:00Z',
      isRead: false,
      priority: 'low',
      action: 'Write Review',
      data: {
        experience: 'Spice Garden Tour',
        host: 'Lakshmi Nair'
      }
    },
    {
      id: 5,
      type: 'promotion',
      title: 'Special Offer',
      message: 'Get 20% off on all farming experiences this month! Book now and save big.',
      timestamp: '2024-02-06T09:00:00Z',
      isRead: true,
      priority: 'low',
      action: 'View Offers',
      data: {
        discount: '20%',
        category: 'Farming',
        validUntil: '2024-02-29'
      }
    },
    {
      id: 6,
      type: 'system',
      title: 'Welcome to KrishiSafar',
      message: 'Thank you for joining our community! Explore amazing agri-tourism experiences.',
      timestamp: '2024-02-05T08:00:00Z',
      isRead: true,
      priority: 'low',
      action: 'Get Started',
      data: {}
    }
  ];

  const filters = [
    { id: 'all', label: 'All Notifications', count: notifications.length },
    { id: 'booking', label: 'Bookings', count: notifications.filter(n => n.type === 'booking').length },
    { id: 'reminder', label: 'Reminders', count: notifications.filter(n => n.type === 'reminder').length },
    { id: 'payment', label: 'Payments', count: notifications.filter(n => n.type === 'payment').length },
    { id: 'review', label: 'Reviews', count: notifications.filter(n => n.type === 'review').length },
    { id: 'promotion', label: 'Offers', count: notifications.filter(n => n.type === 'promotion').length },
    { id: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'booking': return <Calendar className="w-5 h-5" />;
      case 'reminder': return <Clock className="w-5 h-5" />;
      case 'payment': return <DollarSign className="w-5 h-5" />;
      case 'review': return <Star className="w-5 h-5" />;
      case 'promotion': return <AlertCircle className="w-5 h-5" />;
      case 'system': return <Info className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'booking': return 'from-blue-500 to-cyan-500';
      case 'reminder': return 'from-yellow-500 to-orange-500';
      case 'payment': return 'from-green-500 to-emerald-500';
      case 'review': return 'from-purple-500 to-pink-500';
      case 'promotion': return 'from-pink-500 to-rose-500';
      case 'system': return 'from-slate-500 to-gray-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = activeFilter === 'all' || notification.type === activeFilter;
    const matchesSearch = searchQuery === '' || 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.isRead).length;

  const markAsRead = (id) => {
    // TODO: Implement API call to mark as read
    console.log('Mark as read:', id);
  };

  const deleteNotification = (id) => {
    // TODO: Implement API call to delete notification
    console.log('Delete notification:', id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-6 relative">
              <Bell className="w-10 h-10 text-white" />
              {unreadCount > 0 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </div>
              )}
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Notifications
            </h1>
            <p className="text-slate-600 mt-2">Stay updated with your agri-tourism journey</p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Notifications', value: notifications.length, color: 'from-amber-500 to-orange-500' },
              { label: 'Unread', value: unreadCount, color: 'from-red-500 to-pink-500' },
              { label: 'High Priority', value: highPriorityCount, color: 'from-purple-500 to-pink-500' },
              { label: 'This Week', value: notifications.filter(n => {
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return new Date(n.timestamp) > weekAgo;
              }).length, color: 'from-blue-500 to-cyan-500' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`} />
                <div className="relative p-6 text-center">
                  <h3 className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</h3>
                  <p className="text-slate-600 text-sm">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Filters and Search */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeFilter === filter.id
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Notifications List */}
          <motion.div variants={itemVariants} className="space-y-6">
            {filteredNotifications.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="text-center py-16 bg-white rounded-2xl shadow-lg"
              >
                <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No notifications found</h3>
                <p className="text-slate-600 mb-6">
                  {searchQuery || activeFilter !== 'all' 
                    ? 'Try adjusting your search criteria or filters.'
                    : 'You\'re all caught up! No new notifications.'
                  }
                </p>
                <AnimatedButton
                  variant="primary"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('all');
                  }}
                >
                  {searchQuery || activeFilter !== 'all' ? 'Clear Filters' : 'Explore Experiences'}
                </AnimatedButton>
              </motion.div>
            ) : (
              <div className="grid gap-6">
                {filteredNotifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                      !notification.isRead ? 'ring-2 ring-amber-200' : ''
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex gap-4">
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r ${getTypeColor(notification.type)} flex items-center justify-center text-white`}>
                          {getTypeIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-lg font-semibold text-slate-800">
                                  {notification.title}
                                </h3>
                                {!notification.isRead && (
                                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                )}
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(notification.priority)} bg-opacity-10`}>
                                  {notification.priority}
                                </span>
                              </div>
                              <p className="text-slate-600 mb-3">{notification.message}</p>
                              
                              {/* Additional Data */}
                              {Object.keys(notification.data).length > 0 && (
                                <div className="bg-slate-50 rounded-lg p-3 mb-3">
                                  <div className="flex flex-wrap gap-4 text-sm">
                                    {notification.data.experience && (
                                      <div className="flex items-center space-x-1">
                                        <MapPin className="w-4 h-4 text-slate-500" />
                                        <span className="text-slate-700">{notification.data.experience}</span>
                                      </div>
                                    )}
                                    {notification.data.date && (
                                      <div className="flex items-center space-x-1">
                                        <Calendar className="w-4 h-4 text-slate-500" />
                                        <span className="text-slate-700">{notification.data.date}</span>
                                      </div>
                                    )}
                                    {notification.data.amount && (
                                      <div className="flex items-center space-x-1">
                                        <DollarSign className="w-4 h-4 text-slate-500" />
                                        <span className="text-slate-700">₹{notification.data.amount.toLocaleString()}</span>
                                      </div>
                                    )}
                                    {notification.data.host && (
                                      <div className="flex items-center space-x-1">
                                        <Users className="w-4 h-4 text-slate-500" />
                                        <span className="text-slate-700">{notification.data.host}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-sm text-slate-500">
                                  <Clock className="w-4 h-4" />
                                  <span>
                                    {new Date(notification.timestamp).toLocaleDateString('en-IN', {
                                      month: 'short',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </span>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  <AnimatedButton
                                    variant="outline"
                                    size="sm"
                                    className="border-amber-200 text-amber-700 hover:bg-amber-50"
                                  >
                                    {notification.action}
                                  </AnimatedButton>
                                  
                                  {!notification.isRead && (
                                    <AnimatedButton
                                      variant="ghost"
                                      size="sm"
                                      icon={<CheckCircle className="w-4 h-4" />}
                                      onClick={() => markAsRead(notification.id)}
                                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                    >
                                      Mark Read
                                    </AnimatedButton>
                                  )}
                                  
                                  <AnimatedButton
                                    variant="ghost"
                                    size="sm"
                                    icon={<Trash2 className="w-4 h-4" />}
                                    onClick={() => deleteNotification(notification.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    Delete
                                  </AnimatedButton>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Notification Settings */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Notification Preferences</h2>
              <AnimatedButton
                variant="outline"
                size="sm"
                icon={<Settings className="w-4 h-4" />}
                className="border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                Manage Settings
              </AnimatedButton>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { type: 'Bookings', enabled: true, description: 'Booking confirmations and updates' },
                { type: 'Reminders', enabled: true, description: 'Experience reminders and notifications' },
                { type: 'Payments', enabled: true, description: 'Payment confirmations and receipts' },
                { type: 'Reviews', enabled: false, description: 'Review requests and feedback' },
                { type: 'Promotions', enabled: false, description: 'Special offers and discounts' },
                { type: 'System', enabled: true, description: 'Important platform updates' }
              ].map((pref, index) => (
                <div
                  key={pref.type}
                  className="border border-slate-200 rounded-xl p-4 hover:border-amber-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-slate-800">{pref.type}</span>
                    <button
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                        pref.enabled ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-slate-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          pref.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-slate-600">{pref.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotificationsPage;