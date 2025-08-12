import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Search, 
  Filter,
  Trash2,
  Calendar,
  Share2,
  Eye,
  Plus,
  X
} from 'lucide-react';
import AnimatedButton from '../../components/shared/AnimatedButton';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('added');

  // Mock data - replace with API call
  const wishlistItems = [
    {
      id: 1,
      experience: {
        id: 101,
        title: "Organic Farm Experience",
        description: "Experience the joy of organic farming with hands-on activities like planting, harvesting, and learning sustainable agricultural practices.",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
        location: "Pune, Maharashtra",
        price: 1500,
        duration: "4 hours",
        maxGuests: 15,
        category: "Farming",
        rating: 4.7,
        reviews: 124,
        host: "Rajesh Kumar"
      },
      addedDate: "2024-02-01",
      notes: "Perfect for family outing"
    },
    {
      id: 2,
      experience: {
        id: 102,
        title: "Dairy Farm Adventure",
        description: "Learn about dairy farming, milk cows, make fresh cheese, and understand the complete dairy production process.",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop",
        location: "Nashik, Maharashtra",
        price: 2000,
        duration: "6 hours",
        maxGuests: 12,
        category: "Dairy",
        rating: 4.8,
        reviews: 89,
        host: "Priya Sharma"
      },
      addedDate: "2024-01-28",
      notes: "Great for kids to learn about dairy"
    },
    {
      id: 3,
      experience: {
        id: 103,
        title: "Vineyard & Wine Tasting",
        description: "Explore beautiful vineyards, learn about grape cultivation, and enjoy wine tasting sessions with expert sommeliers.",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
        location: "Nashik, Maharashtra",
        price: 3500,
        duration: "8 hours",
        maxGuests: 20,
        category: "Vineyard",
        rating: 4.6,
        reviews: 156,
        host: "Vikram Singh"
      },
      addedDate: "2024-01-20",
      notes: "Romantic getaway option"
    },
    {
      id: 4,
      experience: {
        id: 104,
        title: "Spice Garden Tour",
        description: "Discover the aromatic world of spices, learn about their cultivation, and participate in traditional spice processing.",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        location: "Kerala",
        price: 1200,
        duration: "3 hours",
        maxGuests: 18,
        category: "Spices",
        rating: 4.5,
        reviews: 78,
        host: "Lakshmi Nair"
      },
      addedDate: "2024-01-15",
      notes: "Educational and aromatic experience"
    },
    {
      id: 5,
      experience: {
        id: 105,
        title: "Honey Farm & Beekeeping",
        description: "Learn about beekeeping, honey production, and the importance of bees in agriculture. Taste different varieties of honey.",
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop",
        location: "Coorg, Karnataka",
        price: 1800,
        duration: "5 hours",
        maxGuests: 10,
        category: "Beekeeping",
        rating: 4.9,
        reviews: 45,
        host: "Arun Kumar"
      },
      addedDate: "2024-01-10",
      notes: "Unique experience for nature lovers"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories', count: wishlistItems.length },
    { id: 'Farming', label: 'Farming', count: wishlistItems.filter(item => item.experience.category === 'Farming').length },
    { id: 'Dairy', label: 'Dairy', count: wishlistItems.filter(item => item.experience.category === 'Dairy').length },
    { id: 'Vineyard', label: 'Vineyard', count: wishlistItems.filter(item => item.experience.category === 'Vineyard').length },
    { id: 'Spices', label: 'Spices', count: wishlistItems.filter(item => item.experience.category === 'Spices').length },
    { id: 'Beekeeping', label: 'Beekeeping', count: wishlistItems.filter(item => item.experience.category === 'Beekeeping').length }
  ];

  const sortOptions = [
    { value: 'added', label: 'Recently Added' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name A-Z' }
  ];

  const filteredItems = wishlistItems.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.experience.category === activeFilter;
    const matchesSearch = searchQuery === '' || 
      item.experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.experience.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'added':
        return new Date(b.addedDate) - new Date(a.addedDate);
      case 'price-low':
        return a.experience.price - b.experience.price;
      case 'price-high':
        return b.experience.price - a.experience.price;
      case 'rating':
        return b.experience.rating - a.experience.rating;
      case 'name':
        return a.experience.title.localeCompare(b.experience.title);
      default:
        return 0;
    }
  });

  const removeFromWishlist = (id) => {
    // TODO: Implement API call to remove from wishlist
    console.log('Remove from wishlist:', id);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mb-6">
              <Heart className="w-10 h-10 text-white fill-current" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              My Wishlist
            </h1>
            <p className="text-slate-600 mt-2">Your saved agri-tourism experiences</p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Items', value: wishlistItems.length, color: 'from-pink-500 to-rose-500' },
              { label: 'Categories', value: categories.length - 1, color: 'from-purple-500 to-pink-500' },
              { label: 'Total Value', value: `₹${wishlistItems.reduce((sum, item) => sum + item.experience.price, 0).toLocaleString()}`, color: 'from-blue-500 to-cyan-500' },
              { label: 'Avg Rating', value: (wishlistItems.reduce((sum, item) => sum + item.experience.rating, 0) / wishlistItems.length).toFixed(1), color: 'from-yellow-500 to-orange-500' }
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

          {/* Filters, Search, and Sort */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search your wishlist..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="lg:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Filters */}
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeFilter === category.id
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Wishlist Items */}
          <motion.div variants={itemVariants} className="space-y-6">
            {sortedItems.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="text-center py-16 bg-white rounded-2xl shadow-lg"
              >
                <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Your wishlist is empty</h3>
                <p className="text-slate-600 mb-6">
                  {searchQuery || activeFilter !== 'all' 
                    ? 'No items match your current filters.'
                    : 'Start adding experiences you love to your wishlist!'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <AnimatedButton
                    variant="primary"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilter('all');
                    }}
                  >
                    {searchQuery || activeFilter !== 'all' ? 'Clear Filters' : 'Explore Experiences'}
                  </AnimatedButton>
                  {searchQuery || activeFilter !== 'all' ? null : (
                    <AnimatedButton
                      variant="outline"
                      icon={<Plus className="w-4 h-4" />}
                    >
                      Add First Item
                    </AnimatedButton>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="grid gap-6">
                {sortedItems.map((item) => (
                  <motion.div
                    key={item.id}
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
                              src={item.experience.image}
                              alt={item.experience.title}
                              className="w-full h-40 object-cover"
                            />
                            <div className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-pink-500 to-rose-500">
                              {item.experience.category}
                            </div>
                            <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500">
                              ₹{item.experience.price.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        {/* Experience Details */}
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                                {item.experience.title}
                              </h3>
                              <p className="text-slate-600 mb-3 line-clamp-2">
                                {item.experience.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{item.experience.location}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{item.experience.duration}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="w-4 h-4" />
                                  <span>Max {item.experience.maxGuests} guests</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span>{item.experience.rating} ({item.experience.reviews} reviews)</span>
                                </div>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-2xl font-bold text-slate-800 mb-2">
                                ₹{item.experience.price.toLocaleString()}
                              </div>
                              <div className="text-sm text-slate-500 mb-3">
                                Added {new Date(item.addedDate).toLocaleDateString('en-IN')}
                              </div>
                              {item.notes && (
                                <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 mb-3">
                                  <p className="text-sm text-pink-800">
                                    <strong>Note:</strong> {item.notes}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Host Info */}
                          <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                {item.experience.host.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-slate-800">Hosted by {item.experience.host}</p>
                                <p className="text-sm text-slate-600">{item.experience.category} Expert</p>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap gap-3">
                            <Link to={`/experiences/${item.experience.id}`}>
                              <AnimatedButton
                                variant="primary"
                                size="sm"
                                icon={<Eye className="w-4 h-4" />}
                              >
                                View Details
                              </AnimatedButton>
                            </Link>
                            
                            <AnimatedButton
                              variant="outline"
                              size="sm"
                              icon={<Calendar className="w-4 h-4" />}
                              className="border-green-200 text-green-700 hover:bg-green-50"
                            >
                              Book Now
                            </AnimatedButton>
                            
                            <AnimatedButton
                              variant="outline"
                              size="sm"
                              icon={<Share2 className="w-4 h-4" />}
                              className="border-blue-200 text-blue-700 hover:bg-blue-50"
                            >
                              Share
                            </AnimatedButton>
                            
                            <AnimatedButton
                              variant="ghost"
                              size="sm"
                              icon={<Trash2 className="w-4 h-4" />}
                              onClick={() => removeFromWishlist(item.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              Remove
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

export default WishlistPage;