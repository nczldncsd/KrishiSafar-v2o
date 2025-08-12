import React from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_ROUTES } from '../../utils/routes.js';

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">K</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-800">
          Sign up for KrishiSafar
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Join our community of agri-tourism enthusiasts
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 backdrop-blur-md py-8 px-4 shadow-xl rounded-2xl sm:px-10 text-center border border-white/20">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h3 className="text-lg font-medium text-slate-800 mb-2">Demo Application</h3>
          <p className="text-slate-600 mb-6">
            This is a demo application. User registration is not implemented in this version.
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 mb-6">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Use Demo Accounts</h4>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>User Account:</strong> user@demo.com / any password</p>
              <p><strong>Host Account:</strong> host@demo.com / any password</p>
            </div>
          </div>

          <Link
            to={PUBLIC_ROUTES.LOGIN}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-4 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
          >
            Sign In Instead
          </Link>

          <div className="mt-6">
            <Link
              to={PUBLIC_ROUTES.HOME}
              className="text-sm text-blue-600 hover:text-blue-500 transition-colors duration-200"
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