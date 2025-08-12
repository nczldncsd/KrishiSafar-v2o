import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Search,
  Filter,
  Eye,
  MessageCircle,
  Download,
  Star,
  MapPin,
  Phone,
  Mail,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import AnimatedButton from '../../components/shared/AnimatedButton';

const HostBookingsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Mock data - replace with API call
  const bookings = [
    {
      id: 1,
      experience: {
        title: "Organic Farm Experience",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
        location: "Pune, Maharashtra"
      },
      guest: {
        name: "Priya Sharma",
        email: "priya@example.com",
        phone: "+91 98765 43210",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      date: "2024-02-15",
      time: "09:00 AM",
      guests: 3,
      totalAmount: 4500,
      status: "confirmed",
      paymentStatus: "paid",
      bookingDate: "2024-02-10",
      specialRequests: "Vegetarian lunch preferred"
    },
    {
      id: 2,
      experience: {
        title: "Dairy Farm Adventure",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop",
        location: "Nashik, Maharashtra"
      },
      guest: {
        name: "Rajesh Kumar",
        email: "rajesh@example.com",
        phone: "+91 87654 32109",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      date: "2024-02-18",
      time: "10:00 AM",
      guests: 2,
      totalAmount: 4000,
      status: "pending",
      paymentStatus: "pending",
      bookingDate: "2024-02-12",
      specialRequests: "Early morning preferred"
    },
    {
      id: 3,
      experience: {
        title: "Vineyard & Wine Tasting",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
        location: "Nashik, Maharashtra"
      },
      guest: {
        name: "Anita Patel",
        email: "anita@example.com",
        phone: "+91 76543 21098",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      date: "2024-02-20",
      time: "02:00 PM",
      guests: 4,
      totalAmount: 14000,
      status: "confirmed",
      paymentStatus: "paid",
      bookingDate: "2024-02-08",
      specialRequests: "Wine tasting for beginners"
    },
    {
      id: 4,
      experience: {
        title: "Spice Garden Tour",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        location: "Kerala"
      },
      guest: {
        name: "Vikram Singh",
        email: "vikram@example.com",
        phone: "+91 65432 10987",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      date: "2024-02-12",
      time: "11:00 AM",
      guests: 2,
      totalAmount: 2400,
      status: "cancelled",
      paymentStatus: "refunded",
      bookingDate: "2024-02-05",
      specialRequests: "Photography allowed"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Bookings', count: bookings.length },
    { id: 'confirmed', label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length },
    { id: 'pending', label: 'Pending', count: bookings.filter(b => b.status === 'pending').length },
    { id: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'from-green-500 to-emerald-500';
      case 'pending': return 'from-yellow-500 to-orange-500';
      case 'cancelled': return 'from-red-500 to-rose-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-5 h-5" />;
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'cancelled': return <XCircle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'from-emerald-500 to-teal-500';
      case 'pending': return 'from-amber-500 to-orange-500';
      case 'refunded': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = activeFilter === 'all' || booking.status === activeFilter;
    const matchesSearch = searchQuery === '' || 
      booking.guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.experience.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalRevenue = bookings.filter(b => b.status === 'confirmed' && b.paymentStatus === 'paid').reduce((sum, b) => sum + b.totalAmount, 0);
  const totalBookings = bookings.filter(b => b.status === 'confirmed').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const avgGuests = bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.guests, 0) / Math.max(bookings.filter(b => b.status === 'confirmed').length, 1);

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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-6">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Host Bookings
            </h1>
            <p className="text-slate-600 mt-2">Manage incoming bookings and guest requests</p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Bookings', value: totalBookings, color: 'from-blue-500 to-indigo-500' },
              { label: 'Pending Bookings', value: pendingBookings, color: 'from-yellow-500 to-orange-500' },
              { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, color: 'from-emerald-500 to-teal-500' },
              { label: 'Avg Guests', value: avgGuests.toFixed(1), color: 'from-purple-500 to-pink-500' }
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
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
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
                    : 'No bookings have been made yet.'
                  }
                </p>
                <AnimatedButton
                  variant="primary"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('all');
                  }}
                >
                  {searchQuery || activeFilter !== 'all' ? 'Clear Filters' : 'View All Bookings'}
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
                            <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getStatusColor(booking.status)}`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </div>
                            <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getPaymentStatusColor(booking.paymentStatus)}`}>
                              {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                            </div>
                          </div>
                        </div>

                        {/* Booking Details */}
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                                {booking.experience.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-3">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{booking.experience.location}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(booking.date).toLocaleDateString('en-IN')} at {booking.time}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="w-4 h-4" />
                                  <span>{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <DollarSign className="w-4 h-4" />
                                  <span>₹{booking.totalAmount.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-2xl font-bold text-slate-800 mb-2">
                                ₹{booking.totalAmount.toLocaleString()}
                              </div>
                              <div className="flex items-center justify-end space-x-1 mb-2">
                                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(booking.status)} text-white`}>
                                  {getStatusIcon(booking.status)}
                                  <span>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                                </div>
                              </div>
                              <div className="text-sm text-slate-500">
                                Booked on {new Date(booking.bookingDate).toLocaleDateString('en-IN')}
                              </div>
                            </div>
                          </div>

                          {/* Guest Information */}
                          <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden">
                                <img
                                  src={booking.guest.avatar}
                                  alt={booking.guest.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-slate-800">{booking.guest.name}</p>
                                <div className="flex items-center space-x-4 text-sm text-slate-600">
                                  <span className="flex items-center space-x-1">
                                    <Mail className="w-3 h-3" />
                                    <span>{booking.guest.email}</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <Phone className="w-3 h-3" />
                                    <span>{booking.guest.phone}</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Special Requests */}
                          {booking.specialRequests && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <p className="text-sm text-blue-800">
                                <strong>Special Requests:</strong> {booking.specialRequests}
                              </p>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex flex-wrap gap-3">
                            <AnimatedButton
                              variant="outline"
                              size="sm"
                              icon={<Eye className="w-4 h-4" />}
                              onClick={() => setSelectedBooking(booking)}
                              className="border-blue-200 text-blue-700 hover:bg-blue-50"
                            >
                              View Details
                            </AnimatedButton>
                            
                            {booking.status === 'pending' && (
                              <>
                                <AnimatedButton
                                  variant="primary"
                                  size="sm"
                                  icon={<CheckCircle className="w-4 h-4" />}
                                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                                >
                                  Confirm
                                </AnimatedButton>
                                <AnimatedButton
                                  variant="outline"
                                  size="sm"
                                  icon={<XCircle className="w-4 h-4" />}
                                  className="border-red-200 text-red-700 hover:bg-red-50"
                                >
                                  Decline
                                </AnimatedButton>
                              </>
                            )}
                            
                            <AnimatedButton
                              variant="outline"
                              size="sm"
                              icon={<MessageCircle className="w-4 h-4" />}
                              className="border-purple-200 text-purple-700 hover:bg-purple-50"
                            >
                              Message Guest
                            </AnimatedButton>
                            
                            <AnimatedButton
                              variant="ghost"
                              size="sm"
                              icon={<Download className="w-4 h-4" />}
                              className="text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                            >
                              Download
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
                    
                    {selectedBooking.specialRequests && (
                      <div className="bg-blue-50 p-4 rounded-xl">
                        <p className="text-sm text-blue-800">
                          <strong>Special Requests:</strong> {selectedBooking.specialRequests}
                        </p>
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

export default HostBookingsPage;