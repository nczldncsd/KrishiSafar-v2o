import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { PUBLIC_ROUTES } from '../../utils/routes.js';

const BookButton = ({ experienceId, className = '' }) => {
  const { isAuthenticated, user } = useAuth();

  // If user is a host, disable booking
  if (isAuthenticated && user?.role === 'host') {
    return (
      <button
        disabled
        className={`w-full bg-gray-300 text-gray-500 cursor-not-allowed py-3 px-6 rounded-lg font-medium ${className}`}
        title="Hosts cannot book experiences"
      >
        Host Account
      </button>
    );
  }

  // If user is authenticated and has user role, show booking button
  if (isAuthenticated && user?.role === 'user') {
    return (
      <Link
        to={`/booking/${experienceId}`}
        className={`w-full btn-primary text-center py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors ${className}`}
      >
        Book Now
      </Link>
    );
  }

  // If not authenticated, show login to book button
  return (
    <Link
      to={PUBLIC_ROUTES.LOGIN}
      className={`w-full btn-outline text-center py-3 px-6 rounded-lg font-medium hover:bg-primary-50 transition-colors ${className}`}
    >
      Login to Book
    </Link>
  );
};

export default BookButton;