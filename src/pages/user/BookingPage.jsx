import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getExperience } from '../../services/api.js';
import { PUBLIC_ROUTES } from '../../utils/routes.js';
import BookingForm from '../../components/booking/BookingForm.jsx';
import RoleGuard from '../../components/shared/RoleGuard.jsx';

const BookingPage = () => {
  const { experienceId } = useParams();
  const [experience, setExperience] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadExperience = async () => {
      try {
        setIsLoading(true);
        const response = await getExperience(experienceId);
        if (response.success) {
          setExperience(response.data);
        }
      } catch (error) {
        setError('Experience not found or failed to load');
        console.error('Error loading experience:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadExperience();
  }, [experienceId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Experience Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The experience you are trying to book does not exist.'}</p>
          <Link to={PUBLIC_ROUTES.EXPERIENCES} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200">
            Browse All Experiences
          </Link>
        </div>
      </div>
    );
  }

  return (
    <RoleGuard requiredRole="user">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to={PUBLIC_ROUTES.HOME} className="text-gray-700 hover:text-primary-600">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link to={PUBLIC_ROUTES.EXPERIENCES} className="text-gray-700 hover:text-primary-600 ml-1">
                    Experiences
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link to={`${PUBLIC_ROUTES.EXPERIENCES}/${experienceId}`} className="text-gray-700 hover:text-primary-600 ml-1">
                    {experience.title}
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-500 ml-1">Book Experience</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Booking Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Experience</h1>
                  <p className="text-gray-600">
                    Complete your booking for "{experience.title}" by filling out the form below.
                  </p>
                </div>

                <BookingForm />
              </div>
            </div>

            {/* Sidebar - Experience Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience Summary</h2>
                
                {/* Experience Image */}
                <div className="mb-4">
                  <img
                    src={experience.images[0]}
                    alt={experience.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>

                {/* Experience Details */}
                <div className="space-y-3 mb-6">
                  <h3 className="font-semibold text-gray-900">{experience.title}</h3>
                  <div className="text-sm text-gray-600">
                    <p className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {experience.location}
                    </p>
                    <p className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {experience.duration}
                    </p>
                    <p className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Max {experience.maxGuests} guests
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Price per person</span>
                    <span className="text-2xl font-bold text-primary-600">{formatPrice(experience.price)}</span>
                  </div>
                </div>

                {/* Host Info */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Hosted by</h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 text-sm font-medium">
                        {experience.host.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{experience.host.name}</p>
                      <p className="text-sm text-gray-600">{experience.host.experience} experience</p>
                    </div>
                  </div>
                </div>

                {/* Cancellation Policy */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Cancellation Policy</h4>
                  <p className="text-sm text-gray-600">
                    Free cancellation up to 24 hours before the experience. 
                    No refunds for cancellations made less than 24 hours in advance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
};

export default BookingPage;