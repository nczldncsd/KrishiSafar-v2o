import React from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_ROUTES } from '../../utils/routes.js';

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">K</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up for KrishiSafar
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join our community of agri-tourism enthusiasts
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">Demo Application</h3>
          <p className="text-gray-600 mb-6">
            This is a demo application. User registration is not implemented in this version.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Use Demo Accounts</h4>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>User Account:</strong> user@demo.com / any password</p>
              <p><strong>Host Account:</strong> host@demo.com / any password</p>
            </div>
          </div>

          <Link
            to={PUBLIC_ROUTES.LOGIN}
            className="w-full btn-primary py-3 px-4 text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            Sign In Instead
          </Link>

          <div className="mt-6">
            <Link
              to={PUBLIC_ROUTES.HOME}
              className="text-sm text-primary-600 hover:text-primary-500"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;