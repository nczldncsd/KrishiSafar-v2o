// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth.js';
// import { PUBLIC_ROUTES } from '../../utils/routes.js';

// const BookButton = ({ experienceId, className = '' }) => {
//   const { isAuthenticated, user } = useAuth();

//   // If user is a host, disable booking
//   if (isAuthenticated && user?.role === 'host') {
//     return (
//       <button
//         disabled
//         className={`w-full bg-slate-300 text-slate-500 cursor-not-allowed py-3 px-6 rounded-xl font-medium ${className}`}
//         title="Hosts cannot book experiences"
//       >
//         Host Account
//       </button>
//     );
//   }

//   // If user is authenticated and has user role, show booking button
//   if (isAuthenticated && user?.role === 'user') {
//     return (
//       <Link
//         to={`/booking/${experienceId}`}
//         className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white  text-center py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 ${className}`}
//       >
//         Book Now
//       </Link>
//     );
//   }

//   // If not authenticated, show login to book button
//   return (
//     <Link
//       to={PUBLIC_ROUTES.LOGIN}
//       className={`w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 text-center py-3 px-6 rounded-xl font-medium transition-all duration-200 ${className}`}
//     >
//       Login to Book
//     </Link>
//   );
// };

// export default BookButton;

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { PUBLIC_ROUTES } from '../../utils/routes.js';

const BookButton = ({ experienceId, className = '' }) => {
  const { isAuthenticated, user } = useAuth();

  // If user is a host, disable booking
  if (isAuthenticated && user?.role === 'host') {
    return (
      <div className="flex justify-center">
        <button
          disabled
          className={`bg-slate-300 text-slate-500 cursor-not-allowed py-3 px-6 rounded-xl font-medium ${className}`}
          title="Hosts cannot book experiences"
        >
          Host Account
        </button>
      </div>
    );
  }

  // If user is authenticated and has user role, show booking button
  if (isAuthenticated && user?.role === 'user') {
    return (
      <div className="flex justify-center">
        <Link
          to={`/booking/${experienceId}`}
          className={`bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-center py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 ${className}`}
        >
          Book Now
        </Link>
      </div>
    );
  }

  // If not authenticated, show login to book button
  return (
    <div className="flex justify-center">
      <Link
        to={PUBLIC_ROUTES.LOGIN}
        className={`border-2 border-blue-500 text-blue-600 hover:bg-blue-50 text-center py-3 px-6 rounded-xl font-medium transition-all duration-200 ${className}`}
      >
        Login to Book
      </Link>
    </div>
  );
};

export default BookButton;
