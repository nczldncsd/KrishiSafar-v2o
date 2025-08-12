import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Calendar, 
  Users, 
  Star, 
  DollarSign,
  MapPin,
  Clock,
  Search,
  Filter,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';
import AnimatedButton from '../../components/shared/AnimatedButton';
import { useNavigate } from 'react-router-dom';

const HostExperiencesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState(null);

  // Mock data - replace with API call
  const experiences = [
    {
      id: 1,
      title: "Organic Farm Experience",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
      location: "Pune, Maharashtra",
      category: "Farming",
      price: 1500,
      duration: "4 hours",
      maxGuests: 15,
      rating: 4.7,
      reviews: 124,
      status: "active",
      bookings: 45,
      revenue: 67500,
      lastUpdated: "2024-02-10"
    },
    {
      id: 2,
      title: "Dairy Farm Adventure",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop",
      location: "Nashik, Maharashtra",
      category: "Dairy",
      price: 2000,
      duration: "6 hours",
      maxGuests: 12,
      rating: 4.8,
      reviews: 89,
      status: "active",
      bookings: 32,
      revenue: 64000,
      lastUpdated: "2024-02-08"
    },
    {
      id: 3,
      title: "Vineyard & Wine Tasting",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
      location: "Nashik, Maharashtra",
      category: "Vineyard",
      price: 3500,
      duration: "8 hours",
      maxGuests: 20,
      rating: 4.6,
      reviews: 156,
      status: "draft",
      bookings: 0,
      revenue: 0,
      lastUpdated: "2024-02-05"
    },
    {
      id: 4,
      title: "Spice Garden Tour",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      location: "Kerala",
      category: "Spices",
      price: 1200,
      duration: "3 hours",
      maxGuests: 18,
      rating: 4.5,
      reviews: 78,
      status: "paused",
      bookings: 12,
      revenue: 14400,
      lastUpdated: "2024-02-01"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Experiences', count: experiences.length },
    { id: 'active', label: 'Active', count: experiences.filter(e => e.status === 'active').length },
    { id: 'draft', label: 'Draft', count: experiences.filter(e => e.status === 'draft').length },
    { id: 'paused', label: 'Paused', count: experiences.filter(e => e.status === 'paused').length }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'from-emerald-500 to-teal-500';
      case 'draft': return 'from-slate-500 to-gray-500';
      case 'paused': return 'from-amber-500 to-orange-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <Activity className="w-4 h-4" />;
      case 'draft': return <Edit3 className="w-4 h-4" />;
      case 'paused': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredExperiences = experiences.filter(experience => {
    const matchesFilter = activeFilter === 'all' || experience.status === activeFilter;
    const matchesSearch = searchQuery === '' || 
      experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      experience.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      experience.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalRevenue = experiences.filter(e => e.status === 'active').reduce((sum, e) => sum + e.revenue, 0);
  const totalBookings = experiences.filter(e => e.status === 'active').reduce((sum, e) => sum + e.bookings, 0);
  const avgRating = experiences.filter(e => e.rating).reduce((sum, e) => sum + e.rating, 0) / experiences.filter(e => e.rating).length;

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              My Experiences
            </h1>
            <p className="text-slate-600 mt-2">Manage your farm listings and track performance</p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Experiences', value: experiences.length, color: 'from-emerald-500 to-teal-500' },
              { label: 'Active Listings', value: experiences.filter(e => e.status === 'active').length, color: 'from-blue-500 to-cyan-500' },
              { label: 'Total Bookings', value: totalBookings, color: 'from-purple-500 to-pink-500' },
              { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, color: 'from-yellow-500 to-orange-500' }
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

          {/* Actions Bar */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search experiences..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
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
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>

              {/* Create Button */}
              <AnimatedButton
                variant="primary"
                onClick={() => navigate('/host/experiences/create')}
                icon={<Plus className="w-4 h-4" />}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl"
              >
                Create Experience
              </AnimatedButton>
            </div>
          </motion.div>

          {/* Experiences Grid */}
          <motion.div variants={itemVariants} className="space-y-6">
            {filteredExperiences.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="text-center py-16 bg-white rounded-2xl shadow-lg"
              >
                <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No experiences found</h3>
                <p className="text-slate-600 mb-6">
                  {searchQuery || activeFilter !== 'all' 
                    ? 'Try adjusting your search criteria or filters.'
                    : 'Start creating amazing farm experiences!'
                  }
                </p>
                <AnimatedButton
                  variant="primary"
                  onClick={() => navigate('/host/experiences/create')}
                  icon={<Plus className="w-4 h-4" />}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                >
                  Create Your First Experience
                </AnimatedButton>
              </motion.div>
            ) : (
              <div className="grid gap-6">
                {filteredExperiences.map((experience) => (
                  <motion.div
                    key={experience.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Experience Image */}
                        <div className="lg:w-64 lg:flex-shrink-0">
                          <div className="relative rounded-xl overflow-hidden">
                            <img
                              src={experience.image}
                              alt={experience.title}
                              className="w-full h-40 object-cover"
                            />
                            <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getStatusColor(experience.status)}`}>
                              {experience.status.charAt(0).toUpperCase() + experience.status.slice(1)}
                            </div>
                            <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500">
                              ₹{experience.price.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        {/* Experience Details */}
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                                {experience.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-3">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{experience.location}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{experience.duration}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="w-4 h-4" />
                                  <span>Max {experience.maxGuests} guests</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span>{experience.rating} ({experience.reviews} reviews)</span>
                                </div>
                              </div>
                              
                              {/* Performance Metrics */}
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div className="text-center p-3 bg-slate-50 rounded-lg">
                                  <div className="text-lg font-semibold text-slate-800">{experience.bookings}</div>
                                  <div className="text-slate-600">Bookings</div>
                                </div>
                                <div className="text-center p-3 bg-slate-50 rounded-lg">
                                  <div className="text-lg font-semibold text-slate-800">₹{experience.revenue.toLocaleString()}</div>
                                  <div className="text-slate-600">Revenue</div>
                                </div>
                                <div className="text-center p-3 bg-slate-50 rounded-lg">
                                  <div className="text-lg font-semibold text-slate-800">{experience.category}</div>
                                  <div className="text-slate-600">Category</div>
                                </div>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm text-slate-500 mb-2">
                                Last updated: {new Date(experience.lastUpdated).toLocaleDateString('en-IN')}
                              </div>
                              <div className="flex items-center justify-end space-x-1 mb-2">
                                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(experience.status)} text-white`}>
                                  {getStatusIcon(experience.status)}
                                  <span>{experience.status.charAt(0).toUpperCase() + experience.status.slice(1)}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap gap-3">
                            <AnimatedButton
                              variant="outline"
                              size="sm"
                              icon={<Eye className="w-4 h-4" />}
                              className="border-blue-200 text-blue-700 hover:bg-blue-50"
                            >
                              View Listing
                            </AnimatedButton>
                            
                            <AnimatedButton
                              variant="outline"
                              size="sm"
                              icon={<Edit3 className="w-4 h-4" />}
                              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                            >
                              Edit
                            </AnimatedButton>
                            
                            <AnimatedButton
                              variant="outline"
                              size="sm"
                              icon={<Calendar className="w-4 h-4" />}
                              className="border-purple-200 text-purple-700 hover:bg-purple-50"
                            >
                              View Bookings
                            </AnimatedButton>
                            
                            <AnimatedButton
                              variant="ghost"
                              size="sm"
                              icon={<MoreVertical className="w-4 h-4" />}
                              className="text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                            >
                              More
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
    </div>
  );
};

export default HostExperiencesPage;