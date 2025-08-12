// Public routes - accessible to everyone
export const PUBLIC_ROUTES = {
  HOME: '/',
  EXPERIENCES: '/experiences',
  EXPERIENCE_DETAIL: '/experiences/:id',
  LOGIN: '/login',
  SIGNUP: '/signup',
  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  BECOME_HOST: '/become-host'
};

// Protected routes - require authentication
export const PROTECTED_ROUTES = {
  BOOKING: '/booking/:experienceId',
  PROFILE: '/profile',
  MY_BOOKINGS: '/my-bookings',
  WISHLIST: '/wishlist',
  PAYMENTS: '/payments',
  NOTIFICATIONS: '/notifications'
};

// Host-specific routes
export const HOST_ROUTES = {
  DASHBOARD: '/host/dashboard',
  EXPERIENCES: '/host/experiences',
  CREATE_EXPERIENCE: '/host/experiences/create',
  EDIT_EXPERIENCE: '/host/experiences/:id/edit',
  BOOKINGS: '/host/bookings',
  EARNINGS: '/host/earnings',
  ANALYTICS: '/host/analytics',
  SETTINGS: '/host/settings'
};

// Admin routes
export const ADMIN_ROUTES = {
  DASHBOARD: '/admin/dashboard',
  USERS: '/admin/users',
  EXPERIENCES: '/admin/experiences',
  BOOKINGS: '/admin/bookings',
  REPORTS: '/admin/reports',
  SETTINGS: '/admin/settings'
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
    title: 'Explore Farms',
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
  [PUBLIC_ROUTES.ABOUT]: {
    title: 'About Us',
    description: 'Learn about KrishiSafar and our mission',
    requiresAuth: false
  },
  [PUBLIC_ROUTES.CONTACT]: {
    title: 'Contact Us',
    description: 'Get in touch with the KrishiSafar team',
    requiresAuth: false
  },
  [PUBLIC_ROUTES.FAQ]: {
    title: 'FAQ',
    description: 'Frequently asked questions',
    requiresAuth: false
  },
  [PUBLIC_ROUTES.TERMS]: {
    title: 'Terms & Conditions',
    description: 'Terms of service and conditions',
    requiresAuth: false
  },
  [PUBLIC_ROUTES.PRIVACY]: {
    title: 'Privacy Policy',
    description: 'Privacy policy and data protection',
    requiresAuth: false
  },
  [PUBLIC_ROUTES.BECOME_HOST]: {
    title: 'Become a Host',
    description: 'Join as a host and list your farm',
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
  },
  [PROTECTED_ROUTES.WISHLIST]: {
    title: 'Wishlist',
    description: 'Your saved experiences',
    requiresAuth: true
  },
  [PROTECTED_ROUTES.PAYMENTS]: {
    title: 'Payments',
    description: 'Payment history and methods',
    requiresAuth: true
  },
  [PROTECTED_ROUTES.NOTIFICATIONS]: {
    title: 'Notifications',
    description: 'Your notifications',
    requiresAuth: true
  },
  [HOST_ROUTES.DASHBOARD]: {
    title: 'Host Dashboard',
    description: 'Manage your farm experiences',
    requiresAuth: true,
    requiredRole: 'host'
  },
  [HOST_ROUTES.EXPERIENCES]: {
    title: 'My Experiences',
    description: 'Manage your farm listings',
    requiresAuth: true,
    requiredRole: 'host'
  },
  [HOST_ROUTES.CREATE_EXPERIENCE]: {
    title: 'Create Experience',
    description: 'Add a new farm experience',
    requiresAuth: true,
    requiredRole: 'host'
  },
  [HOST_ROUTES.BOOKINGS]: {
    title: 'Host Bookings',
    description: 'Manage incoming bookings',
    requiresAuth: true,
    requiredRole: 'host'
  },
  [HOST_ROUTES.EARNINGS]: {
    title: 'Earnings',
    description: 'Track your income',
    requiresAuth: true,
    requiredRole: 'host'
  },
  [HOST_ROUTES.ANALYTICS]: {
    title: 'Analytics',
    description: 'Performance insights',
    requiresAuth: true,
    requiredRole: 'host'
  },
  [HOST_ROUTES.SETTINGS]: {
    title: 'Host Settings',
    description: 'Configure your host account',
    requiresAuth: true,
    requiredRole: 'host'
  },
  [ADMIN_ROUTES.DASHBOARD]: {
    title: 'Admin Dashboard',
    description: 'Platform administration',
    requiresAuth: true,
    requiredRole: 'admin'
  },
  [ADMIN_ROUTES.USERS]: {
    title: 'User Management',
    description: 'Manage platform users',
    requiresAuth: true,
    requiredRole: 'admin'
  },
  [ADMIN_ROUTES.EXPERIENCES]: {
    title: 'Experience Management',
    description: 'Manage farm experiences',
    requiresAuth: true,
    requiredRole: 'admin'
  },
  [ADMIN_ROUTES.BOOKINGS]: {
    title: 'Booking Management',
    description: 'Monitor all bookings',
    requiresAuth: true,
    requiredRole: 'admin'
  },
  [ADMIN_ROUTES.REPORTS]: {
    title: 'Reports & Analytics',
    description: 'Platform insights',
    requiresAuth: true,
    requiredRole: 'admin'
  },
  [ADMIN_ROUTES.SETTINGS]: {
    title: 'Admin Settings',
    description: 'Platform configuration',
    requiresAuth: true,
    requiredRole: 'admin'
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

// Navigation structure for different user types
export const NAVIGATION_STRUCTURE = {
  public: [
    { path: PUBLIC_ROUTES.HOME, label: 'Home', icon: 'home' },
    { path: PUBLIC_ROUTES.EXPERIENCES, label: 'Explore Farms', icon: 'map' },
    { path: PUBLIC_ROUTES.ABOUT, label: 'About', icon: 'info' },
    { path: PUBLIC_ROUTES.CONTACT, label: 'Contact', icon: 'mail' }
  ],
  user: [
    { path: PUBLIC_ROUTES.HOME, label: 'Home', icon: 'home' },
    { path: PUBLIC_ROUTES.EXPERIENCES, label: 'Explore Farms', icon: 'map' },
    { path: PROTECTED_ROUTES.MY_BOOKINGS, label: 'My Bookings', icon: 'calendar' },
    { path: PROTECTED_ROUTES.WISHLIST, label: 'Wishlist', icon: 'heart' },
    { path: PROTECTED_ROUTES.PROFILE, label: 'Profile', icon: 'user' }
  ],
  host: [
    { path: HOST_ROUTES.DASHBOARD, label: 'Dashboard', icon: 'dashboard' },
    { path: HOST_ROUTES.EXPERIENCES, label: 'My Experiences', icon: 'map' },
    { path: HOST_ROUTES.BOOKINGS, label: 'Bookings', icon: 'calendar' },
    { path: HOST_ROUTES.EARNINGS, label: 'Earnings', icon: 'dollar-sign' },
    { path: HOST_ROUTES.ANALYTICS, label: 'Analytics', icon: 'bar-chart' }
  ],
  admin: [
    { path: ADMIN_ROUTES.DASHBOARD, label: 'Dashboard', icon: 'dashboard' },
    { path: ADMIN_ROUTES.USERS, label: 'Users', icon: 'users' },
    { path: ADMIN_ROUTES.EXPERIENCES, label: 'Experiences', icon: 'map' },
    { path: ADMIN_ROUTES.BOOKINGS, label: 'Bookings', icon: 'calendar' },
    { path: ADMIN_ROUTES.REPORTS, label: 'Reports', icon: 'bar-chart' }
  ]
};