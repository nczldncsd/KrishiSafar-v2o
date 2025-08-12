import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Filter, X, MapPin, Clock, DollarSign, Users, Star } from 'lucide-react';
import AnimatedButton from '../shared/AnimatedButton';

const AdvancedFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  const filterOptions = {
    category: [
      { value: 'Farming', label: 'Farming', icon: '🌾' },
      { value: 'Dairy', label: 'Dairy', icon: '🥛' },
      { value: 'Vineyard', label: 'Vineyard', icon: '🍇' },
      { value: 'Spices', label: 'Spices', icon: '🌶️' },
      { value: 'Horticulture', label: 'Horticulture', icon: '🌺' },
      { value: 'Aquaculture', label: 'Aquaculture', icon: '🐟' }
    ],
    priceRange: [
      { value: 'low', label: '₹0 - ₹1,500', min: 0, max: 1500 },
      { value: 'medium', label: '₹1,500 - ₹3,000', min: 1500, max: 3000 },
      { value: 'high', label: '₹3,000+', min: 3000, max: null }
    ],
    duration: [
      { value: '2-4', label: '2-4 hours' },
      { value: '4-6', label: '4-6 hours' },
      { value: '6-8', label: '6-8 hours' },
      { value: '8+', label: '8+ hours' }
    ],
    maxGuests: [
      { value: '1-5', label: '1-5 guests' },
      { value: '6-10', label: '6-10 guests' },
      { value: '11-15', label: '11-15 guests' },
      { value: '15+', label: '15+ guests' }
    ],
    rating: [
      { value: '4.5+', label: '4.5+ stars' },
      { value: '4.0+', label: '4.0+ stars' },
      { value: '3.5+', label: '3.5+ stars' }
    ]
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters };
    
    if (filterType === 'priceRange') {
      const selectedRange = filterOptions.priceRange.find(opt => opt.value === value);
      newFilters.priceMin = selectedRange.min;
      newFilters.priceMax = selectedRange.max;
      delete newFilters.priceRange;
    } else {
      newFilters[filterType] = value;
    }
    
    onFilterChange(newFilters);
  };

  const handleClearFilter = (filterType) => {
    const newFilters = { ...filters };
    delete newFilters[filterType];
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    onClearFilters();
  };

  // Count active filters
  React.useEffect(() => {
    const count = Object.keys(filters).length;
    setActiveFilters(count);
  }, [filters]);

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}>
      {/* Filter Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
            {activeFilters > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded-full"
              >
                {activeFilters}
              </motion.span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {activeFilters > 0 && (
              <AnimatedButton
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-red-600 hover:text-red-700"
              >
                Clear All
              </AnimatedButton>
            )}
            
            <AnimatedButton
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              icon={<ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />}
            >
              {isExpanded ? 'Hide' : 'Show'} Filters
            </AnimatedButton>
          </div>
        </div>
      </div>

      {/* Filter Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-6">
              {/* Category Filter */}
              <FilterSection
                title="Category"
                icon={<MapPin className="w-4 h-4" />}
                options={filterOptions.category}
                selectedValue={filters.category}
                onChange={(value) => handleFilterChange('category', value)}
                onClear={() => handleClearFilter('category')}
                showClear={!!filters.category}
              />

              {/* Price Range Filter */}
              <FilterSection
                title="Price Range"
                icon={<DollarSign className="w-4 h-4" />}
                options={filterOptions.priceRange}
                selectedValue={filters.priceRange}
                onChange={(value) => handleFilterChange('priceRange', value)}
                onClear={() => handleClearFilter('priceRange')}
                showClear={!!filters.priceRange}
              />

              {/* Duration Filter */}
              <FilterSection
                title="Duration"
                icon={<Clock className="w-4 h-4" />}
                options={filterOptions.duration}
                selectedValue={filters.duration}
                onChange={(value) => handleFilterChange('duration', value)}
                onClear={() => handleClearFilter('duration')}
                showClear={!!filters.duration}
              />

              {/* Max Guests Filter */}
              <FilterSection
                title="Max Guests"
                icon={<Users className="w-4 h-4" />}
                options={filterOptions.maxGuests}
                selectedValue={filters.maxGuests}
                onChange={(value) => handleFilterChange('maxGuests', value)}
                onClear={() => handleClearFilter('maxGuests')}
                showClear={!!filters.maxGuests}
              />

              {/* Rating Filter */}
              <FilterSection
                title="Rating"
                icon={<Star className="w-4 h-4" />}
                options={filterOptions.rating}
                selectedValue={filters.rating}
                onChange={(value) => handleFilterChange('rating', value)}
                onClear={() => handleClearFilter('rating')}
                showClear={!!filters.rating}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterSection = ({ title, icon, options, selectedValue, onChange, onClear, showClear }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <h4 className="font-medium text-gray-900">{title}</h4>
        </div>
        {showClear && (
          <AnimatedButton
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </AnimatedButton>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <motion.button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`p-3 text-left rounded-lg border transition-all duration-200 ${
              selectedValue === option.value
                ? 'border-primary-600 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-2">
              {option.icon && <span className="text-lg">{option.icon}</span>}
              <span className="text-sm font-medium">{option.label}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default AdvancedFilters;