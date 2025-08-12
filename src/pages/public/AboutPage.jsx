import React from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Award, Heart, Globe, Target, TrendingUp, Shield } from 'lucide-react';
import AnimatedButton from '../../components/shared/AnimatedButton';
import { PUBLIC_ROUTES } from '../../utils/routes';

const AboutPage = () => {
  const stats = [
    { number: '500+', label: 'Farm Experiences', icon: MapPin },
    { number: '50+', label: 'Cities Covered', icon: Globe },
    { number: '10,000+', label: 'Happy Travelers', icon: Users },
    { number: '4.8', label: 'Average Rating', icon: Award }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Community First',
      description: 'We prioritize the well-being of farming communities and ensure fair compensation for their hospitality.'
    },
    {
      icon: Shield,
      title: 'Sustainable Tourism',
      description: 'Promoting eco-friendly practices and responsible tourism that benefits both travelers and local ecosystems.'
    },
    {
      icon: Target,
      title: 'Authentic Experiences',
      description: 'Connecting urban travelers with genuine rural life, not staged tourist attractions.'
    },
    {
      icon: TrendingUp,
      title: 'Economic Growth',
      description: 'Supporting rural economies and creating sustainable income sources for farming families.'
    }
  ];

  const team = [
    {
      name: 'Priya Sharma',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      bio: 'Former agricultural scientist with 15+ years in sustainable farming and rural development.'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'Expert in tourism operations and community partnerships across rural India.'
    },
    {
      name: 'Meera Patel',
      role: 'Head of Technology',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      bio: 'Tech enthusiast passionate about bridging the digital divide in rural areas.'
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              About KrishiSafar
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-primary-100 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Connecting urban travelers with authentic rural experiences, promoting sustainable tourism, 
              and supporting farming communities across India.
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <AnimatedButton
                size="lg"
                variant="secondary"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Our Story
              </AnimatedButton>
              <AnimatedButton
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-600"
                onClick={() => window.location.href = PUBLIC_ROUTES.CONTACT}
              >
                Get in Touch
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
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
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To bridge the gap between urban and rural India by creating authentic, 
                sustainable agri-tourism experiences that benefit both travelers and farming communities.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that every farm has a story to tell, and every traveler has 
                something to learn from the wisdom of the land.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 mb-6">
                  To become India's leading platform for authentic rural experiences, 
                  fostering cultural exchange and economic growth in farming communities.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">Preserve traditional farming practices</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">Create sustainable income for farmers</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">Promote rural-urban cultural exchange</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at KrishiSafar
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-50 rounded-xl p-6 text-center hover:bg-primary-50 transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate individuals working together to revolutionize agri-tourism in India
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">
              Join the KrishiSafar Movement
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Whether you're a traveler seeking authentic experiences or a farmer wanting to share your story, 
              we'd love to have you on board.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton
                size="lg"
                variant="secondary"
                onClick={() => window.location.href = PUBLIC_ROUTES.EXPERIENCES}
              >
                Explore Experiences
              </AnimatedButton>
              <AnimatedButton
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-600"
                onClick={() => window.location.href = PUBLIC_ROUTES.BECOME_HOST}
              >
                Become a Host
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;