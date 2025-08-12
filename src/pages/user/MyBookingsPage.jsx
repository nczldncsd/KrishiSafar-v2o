import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Clock, 
  Star,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  Filter,
  Search,
  Download,
  Eye,
  MessageCircle
} from 'lucide-react';
import AnimatedButton from '../../components/shared/AnimatedButton';

const MyBookingsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Mock data - replace with API call
  const bookings = [
    {
      id: 1,
      experience: {
        title: "Organic Farm Experience",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
        location: "Pune, Maharashtra",
        category: "Farming"
      },
      date: "2024-02-15",
      time: "09:00 AM",
      guests: 3,
      totalAmount: 4500,
      status: "confirmed",
      host: "Rajesh Kumar",
      rating: 4.8,
      review: "Amazing experience! The farm was beautiful and the host was very knowledgeable."
    },
    {
      id: 2,
      experience: {
        title: "Dairy Farm Adventure",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop",
        location: "Nashik, Maharashtra",
        category: "Dairy"
      },
      date: "2024-02-18",
      time: "10:00 AM",
      guests: 2,
      totalAmount: 4000,
      status: "upcoming",
      host: "Priya Sharma",
      rating: null,
      review: null
    },
    {
      id: 3,
      experience: {
        title: "Vineyard & Wine Tasting",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
        location: "Nashik, Maharashtra",
        category: "Vineyard"
      },
      date: "2024-01-20",
      time: "02:00 PM",
      guests: 4,
      totalAmount: 14000,
      status: "completed",
      host: "Vikram Singh",
      rating: 5.0,
      review: "Exceptional wine tasting experience. The vineyard was stunning!"
    },
    {
      id: 4,
      experience: {
        title: "Spice Garden Tour",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        location: "Kerala",
        category: "Spices"
      },
      date: "2024-01-10",
      time: "11:00 AM",
      guests: 2,
      totalAmount: 2400,
      status: "cancelled",
      host: "Lakshmi Nair",
      rating: null,
      review: null
    }
  ];

  const filters = [
    { id: 'all', label: 'All Bookings', count: bookings.length },
    { id: 'upcoming', label: 'Upcoming', count: bookings.filter(b => b.status === 'upcoming').length },
    { id: 'confirmed', label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length },
    { id: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'from-green-500 to-emerald-500';
      case 'upcoming': return 'from-blue-500 to-cyan-500';
      case 'completed': return 'from-purple-500 to-pink-500';
      case 'cancelled': return 'from-red-500 to-rose-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-5 h-5" />;
      case 'upcoming': return <ClockIcon className="w-5 h-5" />;
      case 'completed': return <CheckCircle className="w-5 h-5" />;
      case 'cancelled': return <XCircle className="w-5 h-5" />;
      default: return <ClockIcon className="w-5 h-5" />;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = activeFilter === 'all' || booking.status === activeFilter;
    const matchesSearch = searchQuery === '' || 
      booking.experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.experience.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              My Bookings
            </h1>
            <p className="text-slate-600 mt-2">Track and manage your agri-tourism experiences</p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Bookings', value: bookings.length, color: 'from-blue-500 to-cyan-500' },
              { label: 'Upcoming', value: bookings.filter(b => b.status === 'upcoming').length, color: 'from-green-500 to-emerald-500' },
              { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, color: 'from-purple-500 to-pink-500' },
              { label: 'Total Spent', value: `₹${bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}`, color: 'from-yellow-500 to-orange-500' }
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
                    placeholder="Search bookings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bookings List */}
          <motion.div variants={itemVariants} className="space-y-6">
            {filteredBookings.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="text-center py-16 bg-white rounded-2xl shadow-lg"
              >
                <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No bookings found</h3>
                <p className="text-slate-600 mb-6">
                  {searchQuery || activeFilter !== 'all' 
                    ? 'Try adjusting your search criteria or filters.'
                    : 'Start exploring amazing agri-tourism experiences!'
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
                {filteredBookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Experience Image */}
                        <div className="lg:w-48 lg:flex-shrink-0">
                          <div className="relative rounded-xl overflow-hidden">
                            <img
                              src={booking.experience.image}
                              alt={booking.experience.title}
                              className="w-full h-32 object-cover"
                            />
                            <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getStatusColor(booking.status)}`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </div>
                          </div>
                        </div>

                        {/* Booking Details */}
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                                {booking.experience.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{booking.experience.location}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(booking.date).toLocaleDateString('en-IN', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                  })}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{booking.time}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="w-4 h-4" />
                                  <span>{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</span>
                                </div>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-2xl font-bold text-slate-800 mb-1">
                                ₹{booking.totalAmount.toLocaleString()}
                              </div>
                              <div className="flex items-center justify-end space-x-1 mb-2">
                                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(booking.status)} text-white`}>
                                  {getStatusIcon(booking.status)}
                                  <span>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                                </div>
                              </div>
                              {booking.rating && (
                                <div className="flex items-center justify-end space-x-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="text-sm text-slate-600">{booking.rating}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Host Info */}
                          <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                {booking.host.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-slate-800">Hosted by {booking.host}</p>
                                <p className="text-sm text-slate-600">{booking.experience.category}</p>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap gap-3">
                            <AnimatedButton
                              variant="outline"
                              size="sm"
                              icon={<Eye className="w-4 h-4" />}
                              onClick={() => setSelectedBooking(booking)}
                            >
                              View Details
                            </AnimatedButton>
                            
                            {booking.status === 'upcoming' && (
                              <AnimatedButton
                                variant="outline"
                                size="sm"
                                icon={<MessageCircle className="w-4 h-4" />}
                                className="border-green-200 text-green-700 hover:bg-green-50"
                              >
                                Contact Host
                              </AnimatedButton>
                            )}
                            
                            {booking.status === 'completed' && !booking.review && (
                              <AnimatedButton
                                variant="primary"
                                size="sm"
                                icon={<Star className="w-4 h-4" />}
                              >
                                Write Review
                              </AnimatedButton>
                            )}
                            
                            <AnimatedButton
                              variant="ghost"
                              size="sm"
                              icon={<Download className="w-4 h-4" />}
                            >
                              Download Receipt
                            </AnimatedButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Booking Detail Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBooking(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">Booking Details</h2>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <XCircle className="w-6 h-6 text-slate-500" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <img
                    src={selectedBooking.experience.image}
                    alt={selectedBooking.experience.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-800">
                      {selectedBooking.experience.title}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600">Date & Time</p>
                        <p className="font-medium text-slate-800">
                          {new Date(selectedBooking.date).toLocaleDateString('en-IN')} at {selectedBooking.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600">Guests</p>
                        <p className="font-medium text-slate-800">{selectedBooking.guests}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Total Amount</p>
                        <p className="font-medium text-slate-800">₹{selectedBooking.totalAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Status</p>
                        <p className="font-medium text-slate-800 capitalize">{selectedBooking.status}</p>
                      </div>
                    </div>
                    
                    {selectedBooking.review && (
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <p className="text-sm text-slate-600 mb-2">Your Review</p>
                        <p className="text-slate-800">{selectedBooking.review}</p>
                        <div className="flex items-center space-x-1 mt-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-slate-600">{selectedBooking.rating}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyBookingsPage;