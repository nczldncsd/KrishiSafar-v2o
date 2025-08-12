import React from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_ROUTES } from '../../utils/routes.js';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved. 
          Let's get you back on track to discovering amazing agri-tourism experiences.
        </p>
        
        <div className="space-y-4">
          <Link
            to={PUBLIC_ROUTES.HOME}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
          >
            Go to Homepage
          </Link>
          
          <Link
            to={PUBLIC_ROUTES.EXPERIENCES}
            className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 py-3 px-6 text-base font-medium transition-all duration-200 rounded-xl"
          >
            Browse Experiences
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>If you believe this is an error, please contact our support team.</p>
          <p className="mt-1">
            <a href="mailto:support@krishisafar.com" className="text-primary-600 hover:text-primary-700">
              support@krishisafar.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;