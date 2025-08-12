import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { createBooking } from '../../services/api.js';

const BookingForm = () => {
  const { experienceId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    date: '',
    guests: 1,
    name: user?.name || '',
    phone: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const payload = {
        experienceId: parseInt(experienceId),
        ...formData,
        guests: parseInt(formData.guests)
      };

      const response = await createBooking(payload);
      
      if (response.success) {
        setSuccess(true);
        // Redirect to success page or show success message
        setTimeout(() => {
          navigate('/my-bookings');
        }, 2000);
      } else {
        setError('Booking failed. Please try again.');
      }
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">Booking Confirmed!</h3>
        <p className="text-green-700">Your agri-tourism experience has been successfully booked.</p>
        <p className="text-sm text-green-600 mt-2">Redirecting to your bookings...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Date Selection */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Date *
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          min={getMinDate()}
          required
          className="input-field"
        />
        <p className="mt-1 text-xs text-gray-500">
          Please select a date at least 1 day in advance
        </p>
      </div>

      {/* Number of Guests */}
      <div>
        <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
          Number of Guests *
        </label>
        <select
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleInputChange}
          required
          className="input-field"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'Guest' : 'Guests'}
            </option>
          ))}
        </select>
      </div>

      {/* Contact Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Contact Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          placeholder="Enter your full name"
          className="input-field"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          placeholder="Enter your phone number"
          pattern="[0-9]{10}"
          className="input-field"
        />
        <p className="mt-1 text-xs text-gray-500">
          Enter a 10-digit phone number
        </p>
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="terms"
          required
          className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label htmlFor="terms" className="text-sm text-gray-700">
          I agree to the{' '}
          <a href="#" className="text-primary-600 hover:text-primary-700 underline">
            terms and conditions
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary-600 hover:text-primary-700 underline">
            cancellation policy
          </a>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full btn-primary py-3 px-6 rounded-lg font-medium transition-colors ${
          isSubmitting
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-primary-700'
        }`}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Processing...</span>
          </div>
        ) : (
          'Confirm Booking'
        )}
      </button>

      {/* Additional Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-800 mb-1">Important Information</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• You will receive a confirmation email with booking details</li>
              <li>• Please arrive 15 minutes before your scheduled time</li>
              <li>• Cancellations must be made 24 hours in advance</li>
              <li>• Bring comfortable clothing and closed-toe shoes</li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;