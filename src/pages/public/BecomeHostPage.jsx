import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Users, 
  DollarSign, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Leaf,
  Heart,
  Globe,
  TrendingUp,
  Shield,
  Award
} from 'lucide-react';
import AnimatedButton from '../../components/shared/AnimatedButton';
import { useForm } from 'react-hook-form';

const BecomeHostPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const watchedValues = watch();

  const benefits = [
    {
      icon: DollarSign,
      title: 'Earn Extra Income',
      description: 'Generate additional revenue by sharing your farm with travelers',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Users,
      title: 'Connect with Travelers',
      description: 'Meet people from around the world and share your farming knowledge',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Globe,
      title: 'Promote Rural Tourism',
      description: 'Help preserve traditional farming practices and rural culture',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Award,
      title: 'Build Your Brand',
      description: 'Establish your farm as a destination for authentic experiences',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Farm Details',
      description: 'Tell us about your farm and location'
    },
    {
      number: 2,
      title: 'Experience Planning',
      description: 'Design your agri-tourism experience'
    },
    {
      number: 3,
      title: 'Review & Submit',
      description: 'Final review and application submission'
    }
  ];

  const stats = [
    { number: '₹25,000+', label: 'Average Monthly Earnings', icon: DollarSign },
    { number: '500+', label: 'Active Hosts', icon: Users },
    { number: '4.8', label: 'Average Host Rating', icon: Star },
    { number: '95%', label: 'Satisfaction Rate', icon: Heart }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const nextStep = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="w-full h-full bg-gradient-to-br from-primary-400 via-primary-600 to-primary-800 opacity-30"
            />
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 mb-6"
            >
              <Leaf className="w-5 h-5" />
              <span className="text-sm font-medium">Join 500+ Successful Hosts</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Share Your Farm's
              <span className="block text-primary-200">Story with the World</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-primary-100 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Transform your farm into a destination for authentic agri-tourism experiences. 
              Connect with travelers, earn extra income, and preserve rural traditions.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <AnimatedButton
                size="xl"
                variant="secondary"
                onClick={() => document.getElementById('host-form').scrollIntoView({ behavior: 'smooth' })}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Start Your Journey
              </AnimatedButton>
              
              <AnimatedButton
                size="xl"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-600"
                onClick={() => document.getElementById('benefits').scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-20 w-12 h-12 bg-white bg-opacity-10 rounded-full"
        />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-300"
                >
                  <stat.icon className="w-10 h-10 text-primary-600" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-3xl font-bold text-gray-900 mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Become a KrishiSafar Host?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our community of passionate farmers and create unforgettable experiences for travelers
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 ${benefit.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                >
                  <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{benefit.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Application Form */}
      <section id="host-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below and our team will get back to you within 24 hours
            </motion.p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 font-semibold text-sm transition-all duration-300 ${
                    activeStep >= step.number
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : 'bg-gray-100 border-gray-300 text-gray-500'
                  }`}>
                    {activeStep > step.number ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      step.number
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 transition-all duration-300 ${
                      activeStep > step.number ? 'bg-primary-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-4">
              {steps.map((step, index) => (
                <div key={step.number} className="text-center flex-1">
                  <h4 className={`text-sm font-medium transition-colors duration-300 ${
                    activeStep >= step.number ? 'text-primary-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">{step.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-gray-50 rounded-2xl shadow-xl p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for your interest in becoming a KrishiSafar host. 
                    Our team will review your application and contact you within 24 hours.
                  </p>
                  <AnimatedButton
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Submit Another Application
                  </AnimatedButton>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Step 1: Farm Details */}
                  <AnimatePresence mode="wait">
                    {activeStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Farm Details</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="farmName" className="block text-sm font-medium text-gray-700 mb-2">
                              Farm Name *
                            </label>
                            <input
                              type="text"
                              id="farmName"
                              {...register('farmName', { required: 'Farm name is required' })}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                                errors.farmName ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="Enter your farm name"
                            />
                            {errors.farmName && (
                              <p className="mt-1 text-sm text-red-600">{errors.farmName.message}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="farmType" className="block text-sm font-medium text-gray-700 mb-2">
                              Farm Type *
                            </label>
                            <select
                              id="farmType"
                              {...register('farmType', { required: 'Farm type is required' })}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                                errors.farmType ? 'border-red-300' : 'border-gray-300'
                              }`}
                            >
                              <option value="">Select farm type</option>
                              <option value="organic">Organic Farm</option>
                              <option value="dairy">Dairy Farm</option>
                              <option value="vineyard">Vineyard</option>
                              <option value="spices">Spice Farm</option>
                              <option value="horticulture">Horticulture</option>
                              <option value="mixed">Mixed Farming</option>
                              <option value="other">Other</option>
                            </select>
                            {errors.farmType && (
                              <p className="mt-1 text-sm text-red-600">{errors.farmType.message}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                            Farm Location *
                          </label>
                          <input
                            type="text"
                            id="location"
                            {...register('location', { required: 'Location is required' })}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                              errors.location ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="City, State"
                          />
                          {errors.location && (
                            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="farmSize" className="block text-sm font-medium text-gray-700 mb-2">
                            Farm Size (acres) *
                          </label>
                          <input
                            type="number"
                            id="farmSize"
                            {...register('farmSize', { required: 'Farm size is required' })}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                              errors.farmSize ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Enter farm size in acres"
                          />
                          {errors.farmSize && (
                            <p className="mt-1 text-sm text-red-600">{errors.farmSize.message}</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Step 2: Experience Planning */}
                  <AnimatePresence mode="wait">
                    {activeStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Experience Planning</h3>
                        
                        <div>
                          <label htmlFor="experienceTitle" className="block text-sm font-medium text-gray-700 mb-2">
                            Experience Title *
                          </label>
                          <input
                            type="text"
                            id="experienceTitle"
                            {...register('experienceTitle', { required: 'Experience title is required' })}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                              errors.experienceTitle ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="e.g., Organic Farm Tour & Lunch"
                          />
                          {errors.experienceTitle && (
                            <p className="mt-1 text-sm text-red-600">{errors.experienceTitle.message}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Experience Description *
                          </label>
                          <textarea
                            id="description"
                            rows={4}
                            {...register('description', { required: 'Description is required' })}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                              errors.description ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Describe what visitors will experience..."
                          />
                          {errors.description && (
                            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                              Duration (hours) *
                            </label>
                            <input
                              type="number"
                              id="duration"
                              {...register('duration', { required: 'Duration is required' })}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                                errors.duration ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="2-8 hours"
                            />
                            {errors.duration && (
                              <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="maxGuests" className="block text-sm font-medium text-gray-700 mb-2">
                              Max Guests *
                            </label>
                            <input
                              type="number"
                              id="maxGuests"
                              {...register('maxGuests', { required: 'Max guests is required' })}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                                errors.maxGuests ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="5-20 guests"
                            />
                            {errors.maxGuests && (
                              <p className="mt-1 text-sm text-red-600">{errors.maxGuests.message}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                              Price per Person (₹) *
                            </label>
                            <input
                              type="number"
                              id="price"
                              {...register('price', { required: 'Price is required' })}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                                errors.price ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="500-5000"
                            />
                            {errors.price && (
                              <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Step 3: Contact Information */}
                  <AnimatePresence mode="wait">
                    {activeStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                              First Name *
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              {...register('firstName', { required: 'First name is required' })}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                                errors.firstName ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="Enter your first name"
                            />
                            {errors.firstName && (
                              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              {...register('lastName', { required: 'Last name is required' })}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                                errors.lastName ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="Enter your last name"
                            />
                            {errors.lastName && (
                              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            {...register('email', { 
                              required: 'Email is required',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                              }
                            })}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                              errors.email ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Enter your email address"
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            {...register('phone', { required: 'Phone number is required' })}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                              errors.phone ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Enter your phone number"
                          />
                          {errors.phone && (
                            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                            Additional Message
                          </label>
                          <textarea
                            id="message"
                            rows={3}
                            {...register('message')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Any additional information you'd like to share..."
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-6">
                    <AnimatedButton
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={activeStep === 1}
                      className={activeStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                      Previous
                    </AnimatedButton>

                    {activeStep < 3 ? (
                      <AnimatedButton
                        type="button"
                        onClick={nextStep}
                        icon={<ArrowRight className="w-4 h-4" />}
                        iconPosition="right"
                      >
                        Next
                      </AnimatedButton>
                    ) : (
                      <AnimatedButton
                        type="submit"
                        loading={isSubmitting}
                        icon={<CheckCircle className="w-4 h-4" />}
                        iconPosition="right"
                      >
                        Submit Application
                      </AnimatedButton>
                    )}
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Farm?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Join thousands of farmers who are already earning extra income and sharing their passion 
              with travelers from around the world.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton
                size="lg"
                variant="secondary"
                onClick={() => document.getElementById('host-form').scrollIntoView({ behavior: 'smooth' })}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Apply Now
              </AnimatedButton>
              <AnimatedButton
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-600"
                onClick={() => window.location.href = '/contact'}
              >
                Contact Support
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BecomeHostPage;