import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  ArrowRight, 
  Play, 
  Heart,
  Calendar,
  TrendingUp,
  Award,
  Globe,
  Shield,
  Zap
} from 'lucide-react';
import { PUBLIC_ROUTES } from '../../utils/routes.js';
import AnimatedButton from '../../components/shared/AnimatedButton';

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Dynamic hero images with beautiful gradients
  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=600&fit=crop',
      title: 'Organic Farm Adventures',
      subtitle: 'Experience the joy of sustainable farming',
      gradient: 'from-emerald-500/20 to-teal-500/20'
    },
    {
      url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&h=600&fit=crop',
      title: 'Dairy Farm Experiences',
      subtitle: 'Learn about dairy production hands-on',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&h=600&fit=crop',
      title: 'Vineyard & Wine Tours',
      subtitle: 'Discover the art of winemaking',
      gradient: 'from-purple-500/20 to-pink-500/20'
    }
  ];

  // Dynamic featured experiences
  const featuredExperiences = [
    {
      id: 1,
      title: 'Organic Farm Experience',
      location: 'Pune, Maharashtra',
      price: 1500,
      rating: 4.8,
      reviews: 124,
      duration: '4 hours',
      maxGuests: 15,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop',
      category: 'Farming',
      badge: 'Popular'
    },
    {
      id: 2,
      title: 'Dairy Farm Adventure',
      location: 'Nashik, Maharashtra',
      price: 2000,
      rating: 4.9,
      reviews: 89,
      duration: '6 hours',
      maxGuests: 12,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop',
      category: 'Dairy',
      badge: 'Trending'
    },
    {
      id: 3,
      title: 'Vineyard & Wine Tasting',
      location: 'Nashik, Maharashtra',
      price: 3500,
      rating: 4.7,
      reviews: 156,
      duration: '8 hours',
      maxGuests: 20,
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop',
      category: 'Vineyard',
      badge: 'Premium'
    }
  ];

  // Dynamic stats
  const stats = [
    { label: 'Happy Travelers', value: '10,000+', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Farm Experiences', value: '500+', icon: MapPin, color: 'from-green-500 to-emerald-500' },
    { label: 'States Covered', value: '25+', icon: Globe, color: 'from-purple-500 to-pink-500' },
    { label: 'Average Rating', value: '4.8', icon: Star, color: 'from-yellow-500 to-orange-500' }
  ];

  // Dynamic categories
  const categories = [
    { name: 'Farming', icon: '🌾', count: 150, color: 'from-green-500 to-emerald-500' },
    { name: 'Dairy', icon: '🐄', count: 80, color: 'from-blue-500 to-cyan-500' },
    { name: 'Vineyard', icon: '🍇', count: 45, color: 'from-purple-500 to-pink-500' },
    { name: 'Spices', icon: '🌶️', count: 60, color: 'from-red-500 to-rose-500' },
    { name: 'Beekeeping', icon: '🐝', count: 30, color: 'from-yellow-500 to-orange-500' },
    { name: 'Aquaculture', icon: '🐟', count: 25, color: 'from-teal-500 to-cyan-500' }
  ];

  // Dynamic testimonials
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Traveler',
      content: 'The organic farm experience was absolutely magical! My kids learned so much about sustainable farming.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Family Traveler',
      content: 'Amazing experience at the dairy farm. The hosts were incredibly knowledgeable and welcoming.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Anita Patel',
      role: 'Solo Explorer',
      content: 'The vineyard tour was perfect for a weekend getaway. Beautiful scenery and excellent wine!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ];

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images with Auto-rotation */}
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${image.gradient}`} />
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Discover the Magic of
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Rural India
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto"
            >
              Connect with authentic farm experiences, learn sustainable practices, and create unforgettable memories
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <AnimatedButton
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                Explore Experiences
              </AnimatedButton>
              
              <AnimatedButton
                variant="outline"
                size="lg"
                icon={<Play className="w-5 h-5" />}
                className="border-white text-white hover:bg-white hover:text-slate-800 shadow-xl"
                onClick={() => setIsVideoPlaying(true)}
              >
                Watch Video
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Hero Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center group"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</h3>
                  <p className="text-slate-600">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-slate-800 mb-6"
            >
              Featured
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Experiences
              </span>
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-slate-600 max-w-2xl mx-auto"
            >
              Handpicked agri-tourism experiences that will leave you with lasting memories
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium rounded-full shadow-lg">
                      {experience.badge}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-slate-600 hover:text-red-500 transition-colors duration-200 shadow-lg">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                      {experience.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-slate-700">{experience.rating}</span>
                      <span className="text-sm text-slate-500">({experience.reviews})</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {experience.title}
                  </h3>
                  
                  <div className="flex items-center space-x-1 text-slate-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{experience.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{experience.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>Max {experience.maxGuests}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-slate-800">
                      ₹{experience.price.toLocaleString()}
                    </div>
                    <AnimatedButton
                      variant="primary"
                      size="sm"
                      icon={<ArrowRight className="w-4 h-4" />}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      Book Now
                    </AnimatedButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <Link to={PUBLIC_ROUTES.EXPERIENCES}>
              <AnimatedButton
                variant="outline"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                className="border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                View All Experiences
              </AnimatedButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-slate-800 mb-6"
            >
              Explore by
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Category
              </span>
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-slate-600 max-w-2xl mx-auto"
            >
              Find the perfect agri-tourism experience that matches your interests
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group text-center cursor-pointer"
              >
                <div className={`p-6 rounded-2xl bg-gradient-to-br ${category.color} text-white mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold">{category.name}</h3>
                </div>
                <p className="text-slate-600 text-sm">{category.count} experiences</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-slate-800 mb-6"
            >
              What Our
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Travelers Say
              </span>
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-slate-600 max-w-2xl mx-auto"
            >
              Real experiences from real people who discovered the magic of rural India
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                
                <p className="text-slate-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Ready to Start Your
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Rural Adventure?
              </span>
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            >
              Join thousands of travelers who have discovered the authentic beauty of rural India through agri-tourism
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <AnimatedButton
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                Explore Experiences
              </AnimatedButton>
              
              <AnimatedButton
                variant="outline"
                size="lg"
                icon={<Calendar className="w-5 h-5" />}
                className="border-white text-white hover:bg-white hover:text-blue-600 shadow-xl"
              >
                Plan Your Trip
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;