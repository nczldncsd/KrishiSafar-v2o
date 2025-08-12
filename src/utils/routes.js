// Public routes - accessible to everyone
export const PUBLIC_ROUTES = {
  HOME: '/',
  EXPERIENCES: '/experiences',
  EXPERIENCE_DETAIL: '/experiences/:id',
  LOGIN: '/login',
  SIGNUP: '/signup'
};

// Protected routes - require authentication
export const PROTECTED_ROUTES = {
  BOOKING: '/booking/:experienceId',
  PROFILE: '/profile',
  MY_BOOKINGS: '/my-bookings'
};

// System routes
export const SYSTEM_ROUTES = {
  NOT_FOUND: '*'
};

// Route metadata for navigation
export const ROUTE_META = {
  [PUBLIC_ROUTES.HOME]: {
    title: 'Home',
    description: 'Discover amazing agri-tourism experiences',
    requiresAuth: false
  },
  [PUBLIC_ROUTES.EXPERIENCES]: {
    title: 'Experiences',
    description: 'Browse all available agri-tourism experiences',
    requiresAuth: false
  },
  [PUBLIC_ROUTES.EXPERIENCE_DETAIL]: {
    title: 'Experience Details',
    description: 'Learn more about this agri-tourism experience',
    requiresAuth: false
  },
  [PUBLIC_ROUTES.LOGIN]: {
    title: 'Login',
    description: 'Sign in to your KrishiSafar account',
    requiresAuth: false
  },
  [PUBLIC_ROUTES.SIGNUP]: {
    title: 'Sign Up',
    description: 'Create your KrishiSafar account',
    requiresAuth: false
  },
  [PROTECTED_ROUTES.BOOKING]: {
    title: 'Book Experience',
    description: 'Book your agri-tourism experience',
    requiresAuth: true,
    requiredRole: 'user'
  },
  [PROTECTED_ROUTES.PROFILE]: {
    title: 'Profile',
    description: 'Manage your account settings',
    requiresAuth: true
  },
  [PROTECTED_ROUTES.MY_BOOKINGS]: {
    title: 'My Bookings',
    description: 'View your booking history',
    requiresAuth: true
  }
};

// Helper function to get route metadata
export const getRouteMeta = (path) => {
  // Find matching route by comparing path patterns
  for (const [route, meta] of Object.entries(ROUTE_META)) {
    if (route.includes(':')) {
      // Handle dynamic routes
      const routePattern = route.replace(/:[^/]+/g, '[^/]+');
      const regex = new RegExp(`^${routePattern}$`);
      if (regex.test(path)) {
        return meta;
      }
    } else if (route === path) {
      return meta;
    }
  }
  
  return {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist',
    requiresAuth: false
  };
};

// Helper function to check if route requires authentication
export const isRouteProtected = (path) => {
  const meta = getRouteMeta(path);
  return meta.requiresAuth || false;
};

// Helper function to check if route requires specific role
export const getRequiredRole = (path) => {
  const meta = getRouteMeta(path);
  return meta.requiredRole || null;
};