import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Clock, DollarSign, Users, Star, Heart, X } from 'lucide-react';
import { getExperiences, searchExperiences } from '../../services/api.js';
import ExperienceCard from '../../components/experience/ExperienceCard.jsx';
import AdvancedFilters from '../../components/experience/AdvancedFilters.jsx';
import AnimatedButton from '../../components/shared/AnimatedButton';
import { useAuth } from '../../hooks/useAuth.js';

const ExperienceListingPage = () => {
  const { user } = useAuth();
  const [experiences, setExperiences] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const response = await getExperiences();
        if (response.success) {
          setExperiences(response.data);
          setFilteredExperiences(response.data);
        }
      } catch (error) {
        console.error('Error loading experiences:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadExperiences();
  }, []);

  useEffect(() => {
    const filterExperiences = async () => {
      if (!searchQuery && Object.keys(filters).length === 0) {
        setFilteredExperiences(experiences);
        return;
      }

      let filtered = experiences;

      // Apply filters
      if (filters.category) {
        filtered = filtered.filter(exp => exp.category === filters.category);
      }

      if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
        filtered = filtered.filter(exp => {
          if (filters.priceMin !== undefined && exp.price < filters.priceMin) return false;
          if (filters.priceMax !== undefined && exp.price > filters.priceMax) return false;
          return true;
        });
      }

      if (filters.duration) {
        const [min, max] = filters.duration.split('-').map(Number);
        filtered = filtered.filter(exp => {
          const expDuration = parseInt(exp.duration);
          if (max) {
            return expDuration >= min && expDuration <= max;
          } else {
            return expDuration >= min;
          }
        });
      }

      if (filters.maxGuests) {
        const [min, max] = filters.maxGuests.split('-').map(Number);
        filtered = filtered.filter(exp => {
          if (max) {
            return exp.maxGuests >= min && exp.maxGuests <= max;
          } else {
            return exp.maxGuests >= min;
          }
        });
      }

      if (filters.rating) {
        const minRating = parseFloat(filters.rating);
        filtered = filtered.filter(exp => exp.rating >= minRating);
      }

      // Apply search query
      if (searchQuery) {
        try {
          const searchResponse = await searchExperiences(searchQuery);
          if (searchResponse.success) {
            const searchResults = searchResponse.data;
            // Intersect search results with other filters
            filtered = filtered.filter(exp => 
              searchResults.some(searchExp => searchExp.id === exp.id)
            );
          }
        } catch (error) {
          console.error('Search error:', error);
        }
      }

      setFilteredExperiences(filtered);
    };

    filterExperiences();
  }, [searchQuery, filters, experiences]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const handleWishlistToggle = (experienceId) => {
    if (!user) {
      // TODO: Show login prompt
      return;
    }
    
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(experienceId)) {
        newWishlist.delete(experienceId);
      } else {
        newWishlist.add(experienceId);
      }
      return newWishlist;
    });
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading amazing experiences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h1 
            variants={itemVariants} 
            className="text-5xl md:text-6xl font-bold text-slate-800 mb-6"
          >
            Explore
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Agri-Tourism
            </span>
            Experiences
          </motion.h1>
          <motion.p 
            variants={itemVariants} 
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Discover authentic rural experiences across India. From organic farming to dairy adventures, 
            find the perfect agricultural experience for your next unforgettable journey.
          </motion.p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-semibold text-slate-700 mb-2">
                Search Experiences
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search by title, location, or category..."
                  className="w-full px-4 py-3 pl-12 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-end">
              <AnimatedButton
                variant="outline"
                size="lg"
                fullWidth
                icon={<Filter className="w-4 h-4" />}
                onClick={() => setShowFilters(!showFilters)}
                className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 shadow-sm hover:shadow-md"
              >
                {showFilters ? 'Hide' : 'Show'} Filters
              </AnimatedButton>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden mt-6"
              >
                <AdvancedFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={clearAllFilters}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count and Clear Filters */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-white/80 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg">
              <p className="text-slate-700 font-semibold">
                <span className="text-blue-600">{filteredExperiences.length}</span> of {experiences.length} experiences
              </p>
            </div>
            
            {wishlist.size > 0 && (
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl px-4 py-2 text-white shadow-lg">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 fill-current" />
                  <span className="font-semibold">{wishlist.size} in wishlist</span>
                </div>
              </div>
            )}
          </div>
          
          {(searchQuery || Object.keys(filters).length > 0) && (
            <AnimatedButton
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Clear All Filters
            </AnimatedButton>
          )}
        </motion.div>

        {/* Experiences Grid */}
        <AnimatePresence mode="wait">
          {filteredExperiences.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">No experiences found</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Try adjusting your search criteria or filters to discover amazing agri-tourism experiences.
              </p>
              <AnimatedButton
                variant="outline"
                onClick={clearAllFilters}
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                Clear Filters
              </AnimatedButton>
            </motion.div>
          ) : (
            <motion.div
              key="experiences-grid"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredExperiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <ExperienceCard 
                    experience={experience}
                    onWishlistToggle={handleWishlistToggle}
                    isInWishlist={wishlist.has(experience.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        {filteredExperiences.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">
                Can't find what you're looking for?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Let us know your preferences and we'll help you discover the perfect agri-tourism experience.
              </p>
              <AnimatedButton
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600 shadow-lg"
              >
                Contact Us
              </AnimatedButton>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExperienceListingPage;