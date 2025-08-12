import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Heart, 
  Calendar,
  ArrowRight,
  Eye
} from 'lucide-react';
import { PUBLIC_ROUTES } from '../../utils/routes.js';
import AnimatedButton from '../components/shared/AnimatedButton';

const ExperienceCard = ({ experience, onWishlistToggle, isInWishlist = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const {
    id,
    title,
    description,
    location,
    price,
    duration,
    maxGuests,
    images,
    host,
    activities,
    category,
    rating,
    reviews
  } = experience;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const truncateDescription = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onWishlistToggle) {
      onWishlistToggle(experience.id);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Farming': 'from-green-500 to-emerald-500',
      'Dairy': 'from-blue-500 to-cyan-500',
      'Vineyard': 'from-purple-500 to-pink-500',
      'Spices': 'from-red-500 to-rose-500',
      'Beekeeping': 'from-yellow-500 to-orange-500',
      'Aquaculture': 'from-teal-500 to-cyan-500'
    };
    return colors[category] || 'from-slate-500 to-gray-500';
  };

  return (
    <Link to={`${PUBLIC_ROUTES.EXPERIENCES}/${id}`} className="block">
      <motion.div
        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02, y: -5 }}
      >
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className={`inline-block px-3 py-1 bg-gradient-to-r ${getCategoryColor(category)} text-white text-xs font-medium rounded-full shadow-lg`}>
              {category}
            </span>
          </div>
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-4 right-4 p-2 rounded-full shadow-lg transition-all duration-300 ${
              isInWishlist 
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                : 'bg-white/90 backdrop-blur-sm text-slate-600 hover:text-pink-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
          
          {/* Rating Badge */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center space-x-1 shadow-lg">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold text-slate-800">{rating}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title and Location */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200 mb-2 line-clamp-2">
              {title}
            </h3>
            <div className="flex items-center text-slate-600">
              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm font-medium">{location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-2">
            {truncateDescription(description)}
          </p>

          {/* Activities */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {activities.slice(0, 3).map((activity, index) => (
                <span
                  key={index}
                  className="inline-block bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 text-xs px-3 py-1 rounded-full font-medium"
                >
                  {activity}
                </span>
              ))}
              {activities.length > 3 && (
                <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                  +{activities.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Host Info */}
          <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">
                  {host.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Hosted by {host.name}</p>
                <p className="text-xs text-slate-600">{host.experience} experience</p>
              </div>
            </div>
          </div>

          {/* Details and Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-slate-600">
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="font-medium">{duration}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-purple-500" />
                <span className="font-medium">Max {maxGuests}</span>
              </span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {formatPrice(price)}
              </p>
              <p className="text-xs text-slate-500">per person</p>
            </div>
          </div>

          {/* Reviews */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-semibold text-slate-800">{rating}</span>
              <span className="text-slate-500">({reviews} reviews)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <div className="flex-1">
              <AnimatedButton
                variant="outline"
                fullWidth
                icon={<Eye className="w-4 h-4" />}
                className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 shadow-sm hover:shadow-md"
              >
                View Details
              </AnimatedButton>
            </div>
            
            <AnimatedButton
              variant="primary"
              icon={<Calendar className="w-4 h-4" />}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Book Now
            </AnimatedButton>
          </div>
        </div>

        {/* Hover Effect Border */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none"
          animate={{
            borderColor: isHovered ? ['#3b82f6', '#8b5cf6', '#3b82f6'] : 'transparent'
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        />
      </motion.div>
    </Link>
  );
};

export default ExperienceCard;