import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Clock, DollarSign, Users, Star } from 'lucide-react';
import { getExperiences, searchExperiences } from '../../services/api.js';
import ExperienceCard from '../../components/experience/ExperienceCard.jsx';
import AdvancedFilters from '../../components/experience/AdvancedFilters.jsx';
import AnimatedButton from '../../components/shared/AnimatedButton';

const ExperienceListingPage = () => {
  const [experiences, setExperiences] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h1 variants={itemVariants} className="text-4xl font-bold text-gray-900 mb-4">
            Explore Agri-Tourism Experiences
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover authentic rural experiences across India. From organic farming to dairy adventures, 
            find the perfect agricultural experience for your next trip.
          </motion.p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Experiences
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search by title, location, or category..."
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
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
          className="flex items-center justify-between mb-6"
        >
          <p className="text-gray-600">
            Showing {filteredExperiences.length} of {experiences.length} experiences
          </p>
          
          {(searchQuery || Object.keys(filters).length > 0) && (
            <AnimatedButton
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-red-600 hover:text-red-700"
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
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No experiences found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or filters to find more experiences.
              </p>
              <AnimatedButton
                variant="outline"
                onClick={clearAllFilters}
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
                  <ExperienceCard experience={experience} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExperienceListingPage;