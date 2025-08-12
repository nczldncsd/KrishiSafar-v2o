import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Users, 
  DollarSign, 
  Camera, 
  Plus,
  X,
  Save,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import AnimatedButton from '../../components/shared/AnimatedButton';
import { useNavigate } from 'react-router-dom';

const CreateExperiencePage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    title: '',
    description: '',
    category: '',
    location: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Experience Details
    duration: '',
    maxGuests: '',
    minAge: '',
    difficulty: 'easy',
    languages: ['English'],
    
    // Pricing & Availability
    price: '',
    priceType: 'per_person',
    currency: 'INR',
    availability: {
      monday: { available: true, startTime: '09:00', endTime: '17:00' },
      tuesday: { available: true, startTime: '09:00', endTime: '17:00' },
      wednesday: { available: true, startTime: '09:00', endTime: '17:00' },
      thursday: { available: true, startTime: '09:00', endTime: '17:00' },
      friday: { available: true, startTime: '09:00', endTime: '17:00' },
      saturday: { available: true, startTime: '09:00', endTime: '17:00' },
      sunday: { available: false, startTime: '09:00', endTime: '17:00' }
    },
    
    // Activities & Features
    activities: [''],
    highlights: [''],
    included: [''],
    notIncluded: [''],
    
    // Images & Media
    images: [],
    
    // Host Information
    hostBio: '',
    hostExperience: '',
    hostSpecialties: [''],
    
    // Safety & Guidelines
    safetyGuidelines: '',
    cancellationPolicy: 'flexible',
    insurance: false,
    firstAid: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Farming', 'Dairy', 'Vineyard', 'Spices', 'Horticulture', 'Aquaculture', 
    'Beekeeping', 'Poultry', 'Organic', 'Permaculture', 'Hydroponics', 'Other'
  ];

  const difficulties = [
    { value: 'easy', label: 'Easy', description: 'Suitable for all ages and fitness levels' },
    { value: 'moderate', label: 'Moderate', description: 'Some physical activity required' },
    { value: 'challenging', label: 'Challenging', description: 'Good fitness level recommended' }
  ];

  const priceTypes = [
    { value: 'per_person', label: 'Per Person', description: 'Fixed price per guest' },
    { value: 'per_group', label: 'Per Group', description: 'Fixed price for entire group' },
    { value: 'per_hour', label: 'Per Hour', description: 'Price based on duration' }
  ];

  const cancellationPolicies = [
    { value: 'flexible', label: 'Flexible', description: 'Free cancellation up to 24 hours before' },
    { value: 'moderate', label: 'Moderate', description: 'Free cancellation up to 7 days before' },
    { value: 'strict', label: 'Strict', description: 'Free cancellation up to 30 days before' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        break;
      case 2:
        if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
        if (!formData.maxGuests.trim()) newErrors.maxGuests = 'Maximum guests is required';
        if (!formData.price.trim()) newErrors.price = 'Price is required';
        break;
      case 3:
        if (formData.activities.length === 0 || !formData.activities[0].trim()) {
          newErrors.activities = 'At least one activity is required';
        }
        break;
      case 4:
        if (formData.images.length === 0) newErrors.images = 'At least one image is required';
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    try {
      // TODO: Implement API call to create experience
      console.log('Creating experience:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to host dashboard on success
      navigate('/host/dashboard');
    } catch (error) {
      console.error('Error creating experience:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Basic Information', description: 'Experience details and location' },
    { number: 2, title: 'Pricing & Duration', description: 'Cost, timing, and capacity' },
    { number: 3, title: 'Activities & Features', description: 'What guests will experience' },
    { number: 4, title: 'Images & Media', description: 'Visual content for your listing' },
    { number: 5, title: 'Review & Publish', description: 'Final review and submission' }
  ];

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
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <AnimatedButton
                variant="ghost"
                size="sm"
                icon={<ArrowLeft className="w-4 h-4" />}
                onClick={() => navigate('/host/dashboard')}
              >
                Back to Dashboard
              </AnimatedButton>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Create New Experience
                </h1>
                <p className="text-slate-600 mt-1">Share your farm with travelers</p>
              </div>
            </div>
          </motion.div>

          {/* Progress Steps */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                    currentStep >= step.number
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white'
                      : 'border-slate-300 text-slate-500'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-slate-900' : 'text-slate-500'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 transition-all duration-200 ${
                      currentStep > step.number ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Content */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Basic Information</h2>
                    <p className="text-slate-600">Tell travelers about your experience</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Experience Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.title ? 'border-red-300' : 'border-slate-200'
                        }`}
                        placeholder="e.g., Organic Farm Tour & Lunch"
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.category ? 'border-red-300' : 'border-slate-200'
                        }`}
                      >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.description ? 'border-red-300' : 'border-slate-200'
                        }`}
                        placeholder="Describe what visitors will experience..."
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="e.g., Pune"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="e.g., Maharashtra"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Address
                      </label>
                      <textarea
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        rows={2}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Detailed address for GPS navigation"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Pricing & Duration */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Pricing & Duration</h2>
                    <p className="text-slate-600">Set your rates and experience timing</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Duration *
                      </label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.duration ? 'border-red-300' : 'border-slate-200'
                        }`}
                        placeholder="e.g., 4 hours"
                      />
                      {errors.duration && (
                        <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Maximum Guests *
                      </label>
                      <input
                        type="number"
                        value={formData.maxGuests}
                        onChange={(e) => handleInputChange('maxGuests', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.maxGuests ? 'border-red-300' : 'border-slate-200'
                        }`}
                        placeholder="e.g., 15"
                        min="1"
                      />
                      {errors.maxGuests && (
                        <p className="text-red-500 text-sm mt-1">{errors.maxGuests}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Price *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">₹</span>
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                          className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            errors.price ? 'border-red-300' : 'border-slate-200'
                          }`}
                          placeholder="0"
                          min="0"
                        />
                      </div>
                      {errors.price && (
                        <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Price Type
                      </label>
                      <select
                        value={formData.priceType}
                        onChange={(e) => handleInputChange('priceType', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        {priceTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Difficulty Level
                      </label>
                      <select
                        value={formData.difficulty}
                        onChange={(e) => handleInputChange('difficulty', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        {difficulties.map(difficulty => (
                          <option key={difficulty.value} value={difficulty.value}>{difficulty.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Minimum Age
                      </label>
                      <input
                        type="number"
                        value={formData.minAge}
                        onChange={(e) => handleInputChange('minAge', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="e.g., 5"
                        min="0"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Activities & Features */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Activities & Features</h2>
                    <p className="text-slate-600">What will guests do and experience?</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Activities *
                      </label>
                      {formData.activities.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                          <input
                            type="text"
                            value={activity}
                            onChange={(e) => handleArrayChange('activities', index, e.target.value)}
                            className={`flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              errors.activities && index === 0 ? 'border-red-300' : 'border-slate-200'
                            }`}
                            placeholder="e.g., Farm tour, Harvesting, Cooking class"
                          />
                          {formData.activities.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayItem('activities', index)}
                              className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem('activities')}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Activity</span>
                      </button>
                      {errors.activities && (
                        <p className="text-red-500 text-sm mt-1">{errors.activities}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Highlights
                      </label>
                      {formData.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                          <input
                            type="text"
                            value={highlight}
                            onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                            className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="e.g., Organic produce, Family-friendly, Educational"
                          />
                          {formData.highlights.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayItem('highlights', index)}
                              className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem('highlights')}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Highlight</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          What's Included
                        </label>
                        {formData.included.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => handleArrayChange('included', index, e.target.value)}
                              className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              placeholder="e.g., Lunch, Equipment, Guide"
                            />
                            {formData.included.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeArrayItem('included', index)}
                                className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addArrayItem('included')}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Item</span>
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          What's Not Included
                        </label>
                        {formData.notIncluded.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => handleArrayChange('notIncluded', index, e.target.value)}
                              className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              placeholder="e.g., Transportation, Personal items"
                            />
                            {formData.notIncluded.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeArrayItem('notIncluded', index)}
                                className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addArrayItem('notIncluded')}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Item</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Images & Media */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Images & Media</h2>
                    <p className="text-slate-600">High-quality photos will attract more guests</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Upload Images *
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                      <Camera className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600 mb-2">Drop images here or click to browse</p>
                      <p className="text-sm text-slate-500 mb-4">PNG, JPG up to 10MB each</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg cursor-pointer hover:from-blue-600 to-purple-700 transition-all duration-200"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Choose Images
                      </label>
                    </div>
                    {errors.images && (
                      <p className="text-red-500 text-sm mt-1">{errors.images}</p>
                    )}
                  </div>

                  {formData.images.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-slate-800 mb-4">Uploaded Images</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image.preview}
                              alt={image.name}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <p className="text-xs text-slate-600 mt-1 truncate">{image.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 5: Review & Publish */}
              {currentStep === 5 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Review & Publish</h2>
                    <p className="text-slate-600">Review your experience details before publishing</p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-slate-800 mb-2">Basic Information</h3>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Title:</span> {formData.title}</p>
                          <p><span className="font-medium">Category:</span> {formData.category}</p>
                          <p><span className="font-medium">Location:</span> {formData.city}, {formData.state}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800 mb-2">Experience Details</h3>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Duration:</span> {formData.duration}</p>
                          <p><span className="font-medium">Max Guests:</span> {formData.maxGuests}</p>
                          <p><span className="font-medium">Price:</span> ₹{formData.price} per person</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-slate-800 mb-2">Description</h3>
                      <p className="text-sm text-slate-600">{formData.description}</p>
                    </div>

                    <div>
                      <h3 className="font-medium text-slate-800 mb-2">Activities</h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.activities.map((activity, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-slate-800 mb-2">Images</h3>
                      <p className="text-sm text-slate-600">{formData.images.length} images uploaded</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">Ready to Publish?</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Your experience will be reviewed by our team and published within 24-48 hours. 
                          You can edit it anytime from your dashboard.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="bg-slate-50 px-8 py-6 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  {currentStep > 1 && (
                    <AnimatedButton
                      variant="outline"
                      onClick={prevStep}
                      icon={<ArrowLeft className="w-4 h-4" />}
                    >
                      Previous
                    </AnimatedButton>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  {currentStep < 5 ? (
                    <AnimatedButton
                      variant="primary"
                      onClick={nextStep}
                      icon={<ArrowLeft className="w-4 h-4 rotate-180" />}
                    >
                      Next Step
                    </AnimatedButton>
                  ) : (
                    <AnimatedButton
                      variant="primary"
                      onClick={handleSubmit}
                      loading={isSubmitting}
                      icon={<Save className="w-4 h-4" />}
                    >
                      {isSubmitting ? 'Creating...' : 'Create Experience'}
                    </AnimatedButton>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateExperiencePage;