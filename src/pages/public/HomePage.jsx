import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getExperiences } from '../../services/api.js';
import { PUBLIC_ROUTES } from '../../utils/routes.js';
import ExperienceCard from '../../components/experience/ExperienceCard.jsx';

const HomePage = () => {
  const [featuredExperiences, setFeaturedExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedExperiences = async () => {
      try {
        const response = await getExperiences();
        if (response.success) {
          // Show first 3 experiences as featured
          setFeaturedExperiences(response.data.slice(0, 3));
        }
      } catch (error) {
        console.error('Error loading featured experiences:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedExperiences();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover the Magic of
              <span className="block text-primary-200">Agri-Tourism</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience authentic rural life, learn sustainable farming practices, and connect with nature 
              through carefully curated agricultural experiences across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={PUBLIC_ROUTES.EXPERIENCES}
                className="btn-secondary text-lg px-8 py-4 font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Explore Experiences
              </Link>
              <Link
                to={PUBLIC_ROUTES.SIGNUP}
                className="btn-outline text-lg px-8 py-4 font-semibold border-white text-white hover:bg-white hover:text-primary-600 transition-colors"
              >
                Join KrishiSafar
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose KrishiSafar?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We connect urban travelers with authentic rural experiences, promoting sustainable tourism 
              and supporting local farming communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019 9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Authentic Experiences</h3>
              <p className="text-gray-600">
                Connect with real farmers and experience genuine rural life, not staged tourist attractions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Support Local Communities</h3>
              <p className="text-gray-600">
                Your visits directly support local farmers and help preserve traditional agricultural practices.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainable Tourism</h3>
              <p className="text-gray-600">
                Learn about eco-friendly farming methods and contribute to environmental conservation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Experiences Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Experiences
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most popular agri-tourism experiences that offer unforgettable memories 
              and valuable learning opportunities.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredExperiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to={PUBLIC_ROUTES.EXPERIENCES}
              className="btn-primary text-lg px-8 py-4 font-semibold hover:bg-primary-700 transition-colors"
            >
              View All Experiences
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Experience Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from a variety of agricultural experiences that match your interests and preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Farming', icon: '🌾', description: 'Learn traditional and modern farming techniques' },
              { name: 'Dairy', icon: '🥛', description: 'Experience dairy farming and milk processing' },
              { name: 'Vineyard', icon: '🍇', description: 'Explore vineyards and wine making' },
              { name: 'Spices', icon: '🌶️', description: 'Discover spice cultivation and processing' }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Agri-Tourism Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Join thousands of travelers who have discovered the beauty of rural India through 
            authentic agricultural experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={PUBLIC_ROUTES.SIGNUP}
              className="btn-secondary text-lg px-8 py-4 font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Get Started Today
            </Link>
            <Link
              to={PUBLIC_ROUTES.EXPERIENCES}
              className="btn-outline text-lg px-8 py-4 font-semibold border-white text-white hover:bg-white hover:text-primary-600 transition-colors"
            >
              Browse Experiences
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;