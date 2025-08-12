import React, { useState, useEffect } from 'react';
import { getExperiences, searchExperiences } from '../../services/api.js';
import ExperienceCard from '../../components/experience/ExperienceCard.jsx';

const ExperienceListingPage = () => {
  const [experiences, setExperiences] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  const categories = ['All', 'Farming', 'Dairy', 'Vineyard', 'Spices'];

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
      if (!searchQuery && selectedCategory === '' && priceRange === 'all') {
        setFilteredExperiences(experiences);
        return;
      }

      let filtered = experiences;

      // Filter by category
      if (selectedCategory && selectedCategory !== 'All') {
        filtered = filtered.filter(exp => exp.category === selectedCategory);
      }

      // Filter by price range
      if (priceRange !== 'all') {
        switch (priceRange) {
          case 'low':
            filtered = filtered.filter(exp => exp.price <= 1500);
            break;
          case 'medium':
            filtered = filtered.filter(exp => exp.price > 1500 && exp.price <= 3000);
            break;
          case 'high':
            filtered = filtered.filter(exp => exp.price > 3000);
            break;
          default:
            break;
        }
      }

      // Filter by search query
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
  }, [searchQuery, selectedCategory, priceRange, experiences]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange('all');
  };

  const formatPriceRange = (range) => {
    switch (range) {
      case 'low':
        return '₹0 - ₹1,500';
      case 'medium':
        return '₹1,500 - ₹3,000';
      case 'high':
        return '₹3,000+';
      default:
        return 'All Prices';
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Agri-Tourism Experiences
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover authentic rural experiences across India. From organic farming to dairy adventures, 
            find the perfect agricultural experience for your next trip.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  className="input-field pl-10"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="input-field"
              >
                {categories.map((category) => (
                  <option key={category} value={category === 'All' ? '' : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select
                id="priceRange"
                value={priceRange}
                onChange={handlePriceRangeChange}
                className="input-field"
              >
                <option value="all">All Prices</option>
                <option value="low">₹0 - ₹1,500</option>
                <option value="medium">₹1,500 - ₹3,000</option>
                <option value="high">₹3,000+</option>
              </select>
            </div>
          </div>

          {/* Active Filters and Clear Button */}
          {(searchQuery || selectedCategory || priceRange !== 'all') && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {searchQuery && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                    Search: {searchQuery}
                    <button
                      onClick={() => setSearchQuery('')}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                    Category: {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {priceRange !== 'all' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                    Price: {formatPriceRange(priceRange)}
                    <button
                      onClick={() => setPriceRange('all')}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-primary-600 underline"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredExperiences.length} of {experiences.length} experiences
          </p>
        </div>

        {/* Experiences Grid */}
        {filteredExperiences.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No experiences found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters to find more experiences.
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceListingPage;