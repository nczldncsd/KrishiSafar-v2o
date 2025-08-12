import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Edit3, 
  Save, 
  X,
  Shield,
  Bell,
  CreditCard,
  Heart,
  Calendar,
  Star
} from 'lucide-react';
import AnimatedButton from '../../components/shared/AnimatedButton';
import { useAuth } from '../../hooks/useAuth';

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    bio: 'Passionate agri-tourism enthusiast who loves exploring rural experiences and connecting with nature.',
    preferences: {
      notifications: true,
      marketing: false,
      bookingUpdates: true,
      newExperiences: true
    }
  });

  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (key) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences[key]
      }
    }));
  };

  const handleSave = () => {
    // TODO: Implement API call to save profile
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const stats = [
    { label: 'Experiences Booked', value: '12', icon: Calendar, color: 'from-blue-500 to-cyan-500' },
    { label: 'Reviews Written', value: '8', icon: Star, color: 'from-yellow-500 to-orange-500' },
    { label: 'Wishlist Items', value: '15', icon: Heart, color: 'from-pink-500 to-rose-500' },
    { label: 'Total Spent', value: '₹25,000', icon: CreditCard, color: 'from-green-500 to-emerald-500' }
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
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Profile Settings
            </h1>
            <p className="text-slate-600 mt-2">Manage your account and preferences</p>
          </motion.div>

          {/* Profile Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`} />
                <div className="relative p-6">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white mb-4`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</h3>
                  <p className="text-slate-600 text-sm">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Personal Information</h2>
                    {!isEditing ? (
                      <AnimatedButton
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        icon={<Edit3 className="w-4 h-4" />}
                        className="border-white text-white hover:bg-white hover:text-slate-800"
                      >
                        Edit
                      </AnimatedButton>
                    ) : (
                      <div className="flex space-x-2">
                        <AnimatedButton
                          variant="outline"
                          size="sm"
                          onClick={handleSave}
                          icon={<Save className="w-4 h-4" />}
                          className="border-white text-white hover:bg-white hover:text-slate-800"
                        >
                          Save
                        </AnimatedButton>
                        <AnimatedButton
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(false)}
                          icon={<X className="w-4 h-4" />}
                          className="border-white text-white hover:bg-white hover:text-slate-800"
                        >
                          Cancel
                        </AnimatedButton>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-slate-200">
                        <img 
                          src={avatar} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {isEditing && (
                        <label className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200">
                          <Camera className="w-4 h-4 text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">
                        {formData.firstName} {formData.lastName}
                      </h3>
                      <p className="text-slate-600">{user?.role === 'host' ? 'Farm Host' : 'Traveler'}</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500 transition-all duration-200"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500 transition-all duration-200"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500 transition-all duration-200 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Preferences & Quick Actions */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Preferences */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                  <h2 className="text-xl font-semibold text-white">Preferences</h2>
                </div>
                <div className="p-6 space-y-4">
                  {Object.entries(formData.preferences).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                        <span className="text-sm text-slate-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </span>
                      </div>
                      <button
                        onClick={() => handlePreferenceChange(key)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                          value ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-slate-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
                  <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
                </div>
                <div className="p-6 space-y-3">
                  <AnimatedButton
                    variant="outline"
                    fullWidth
                    icon={<Calendar className="w-4 h-4" />}
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  >
                    View Bookings
                  </AnimatedButton>
                  <AnimatedButton
                    variant="outline"
                    fullWidth
                    icon={<Heart className="w-4 h-4" />}
                    className="border-pink-200 text-pink-700 hover:bg-pink-50"
                  >
                    My Wishlist
                  </AnimatedButton>
                  <AnimatedButton
                    variant="outline"
                    fullWidth
                    icon={<CreditCard className="w-4 h-4" />}
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    Payment History
                  </AnimatedButton>
                  <AnimatedButton
                    variant="outline"
                    fullWidth
                    icon={<Shield className="w-4 h-4" />}
                    className="border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    Privacy Settings
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;