# KrishiSafar Frontend Handoff Document

This document provides comprehensive information for backend developers to understand the frontend implementation and integrate their APIs effectively.

## 🏗️ Application Architecture

### Technology Stack
- **Frontend Framework**: React 18 with functional components and hooks
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom component classes
- **Routing**: React Router v6 with nested layouts
- **State Management**: React Context API for global state
- **Authentication**: JWT-based with localStorage persistence

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── booking/        # BookingForm, BookButton
│   ├── experience/     # ExperienceCard
│   └── shared/         # RoleGuard, AuthRedirect
├── context/            # AuthContext for authentication
├── hooks/              # useAuth hook wrapper
├── layouts/            # PublicLayout, AppLayout
├── pages/              # All page components
├── services/           # API service functions (currently mocked)
├── utils/              # Routes configuration and utilities
└── App.jsx             # Main routing component
```

## 🛣️ Routing Structure

### Public Routes (No Authentication Required)
- `/` - HomePage (landing page with featured experiences)
- `/experiences` - ExperienceListingPage (browse all experiences)
- `/experiences/:id` - ExperienceDetailPage (experience details)
- `/login` - LoginPage (user authentication)
- `/signup` - SignupPage (user registration - currently stub)

### Protected Routes (Authentication Required)
- `/booking/:experienceId` - BookingPage (create new booking)
- `/profile` - ProfilePage (user profile management - TODO)
- `/my-bookings` - MyBookingsPage (booking history - TODO)

### Layouts
- **PublicLayout**: Used for public pages (header, footer, basic navigation)
- **AppLayout**: Used for authenticated users (additional user menu, role-based navigation)

## 🔐 Authentication & Authorization

### Current Implementation
- **AuthContext**: Manages user state, login/logout, token storage
- **useAuth Hook**: Provides convenient access to auth state and methods
- **RoleGuard**: Protects routes based on user roles
- **AuthRedirect**: Prevents authenticated users from accessing auth pages

### User Roles
- **user**: Can browse experiences and make bookings
- **host**: Can browse experiences but cannot make bookings
- **admin**: Platform administrator (not implemented in frontend)

### Authentication Flow
1. User submits login form
2. Frontend calls `/auth/login` endpoint
3. JWT token stored in localStorage
4. User state updated in AuthContext
5. Redirect to intended page or home

### Storage Keys
- `krishisafar_token` - JWT authentication token
- `krishisafar_user` - User profile data

## 🎨 UI Components

### Core Components

#### ExperienceCard
- **Purpose**: Displays experience information in listing pages
- **Props**: `experience` object with all experience data
- **Features**: Clickable card, image gallery, rating display, price formatting
- **Usage**: Used in HomePage and ExperienceListingPage

#### BookButton
- **Purpose**: Context-aware booking button
- **States**:
  - Guest: "Login to Book" (redirects to login)
  - User: "Book Now" (redirects to booking page)
  - Host: "Host Account" (disabled)
- **Props**: `experienceId`, `className`

#### BookingForm
- **Purpose**: Complete booking form for authenticated users
- **Fields**: Date, guests, name, phone, terms acceptance
- **Validation**: Client-side validation with error handling
- **API Call**: Calls `createBooking` service function

#### RoleGuard
- **Purpose**: Protects routes based on authentication and role requirements
- **Props**: `requiredRole` (optional), `children`, `fallback`
- **Behavior**: Redirects unauthorized users to fallback route

#### AuthRedirect
- **Purpose**: Redirects authenticated users away from auth pages
- **Usage**: Wraps LoginPage and SignupPage
- **Behavior**: Redirects to intended page or home if already logged in

### Layout Components

#### PublicLayout
- **Features**: Header with navigation, footer, responsive design
- **Navigation**: Home, Experiences, Login/Signup buttons
- **User Menu**: Shows user info and logout when authenticated

#### AppLayout
- **Features**: Enhanced navigation for authenticated users
- **User Menu**: Profile dropdown with user info and navigation
- **Role-Based Nav**: Different navigation items for users vs hosts

## 🔌 API Integration

### Current Mock Implementation
The frontend currently uses mock API functions in `src/services/api.js`:

```javascript
// Mock functions that need to be replaced
export const getExperiences = async () => { ... }
export const getExperience = async (id) => { ... }
export const login = async ({ email, password }) => { ... }
export const createBooking = async (payload) => { ... }
export const searchExperiences = async (query) => { ... }
```

### Required API Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration (future)
- `POST /auth/logout` - User logout

#### Experiences
- `GET /experiences` - List all experiences with filtering
- `GET /experiences/:id` - Get experience details
- `GET /experiences/search` - Search experiences

#### Bookings
- `POST /bookings` - Create new booking
- `GET /bookings` - Get user's booking history
- `GET /bookings/:id` - Get booking details
- `PUT /bookings/:id/cancel` - Cancel booking

#### User Profile
- `GET /user/profile` - Get current user profile
- `PUT /user/profile` - Update user profile

### API Response Format
All API responses should follow this structure:

```json
{
  "success": true,
  "data": { ... },
  "pagination": { ... } // for list endpoints
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (single column, stacked navigation)
- **Tablet**: 768px - 1024px (two-column layouts)
- **Desktop**: > 1024px (multi-column with sidebars)

### Key Responsive Features
- Mobile-first design approach
- Collapsible navigation menu
- Responsive grid layouts
- Touch-friendly buttons and forms
- Optimized images for different screen sizes

## 🎯 Component Dependencies

### Data Flow
```
API Response → Service Function → Component State → UI Rendering
```

### State Management
- **Local State**: Component-specific state (forms, loading, errors)
- **Global State**: User authentication, app-wide settings
- **Context**: AuthContext for user state management

### Props Drilling
Minimal props drilling due to Context usage. Components receive only necessary props:
- `experience` - Experience data for display components
- `experienceId` - ID for booking components
- `className` - Styling customization

## 🚧 Implementation TODOs

### High Priority
1. **Replace Mock APIs**: Update `src/services/api.js` with real API calls
2. **Error Handling**: Implement comprehensive error handling for API failures
3. **Loading States**: Add loading indicators for all async operations
4. **Form Validation**: Enhance client-side validation with better error messages

### Medium Priority
1. **Profile Management**: Implement ProfilePage component
2. **Booking History**: Implement MyBookingsPage component
3. **Search Enhancement**: Add advanced search filters and sorting
4. **Image Optimization**: Implement lazy loading and image optimization

### Low Priority
1. **Notifications**: Add toast notifications for user actions
2. **Offline Support**: Implement service worker for offline functionality
3. **Analytics**: Add user behavior tracking
4. **Internationalization**: Support for multiple languages

## 🔧 Configuration

### Environment Variables
The frontend expects these environment variables:

```bash
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=KrishiSafar
VITE_ENABLE_MOCK_API=false  # Set to false for production
```

### Build Configuration
- **Development**: Hot reload, source maps, mock APIs
- **Production**: Optimized bundles, real APIs, error tracking

## 🧪 Testing Considerations

### Component Testing
- All components are pure functions for easy testing
- Props interfaces are well-defined
- State management is centralized in Context

### API Testing
- Mock data structure matches expected API responses
- Error scenarios are handled gracefully
- Loading states are properly managed

## 🚀 Deployment

### Build Process
```bash
npm run build  # Creates optimized dist folder
npm run preview  # Preview production build locally
```

### Deployment Requirements
- Static file hosting (Vercel, Netlify, AWS S3)
- Environment variables configuration
- API endpoint configuration
- CORS configuration for API calls

## 📋 Integration Checklist

### Backend Developer Tasks
- [ ] Implement all required API endpoints
- [ ] Ensure CORS is properly configured
- [ ] Implement JWT authentication
- [ ] Add proper error handling and status codes
- [ ] Implement pagination for list endpoints
- [ ] Add input validation and sanitization
- [ ] Set up rate limiting
- [ ] Implement proper logging

### Frontend Developer Tasks
- [ ] Replace mock API calls with real endpoints
- [ ] Update API base URL configuration
- [ ] Test all API integrations
- [ ] Implement proper error handling
- [ ] Add loading states for all async operations
- [ ] Test authentication flow end-to-end
- [ ] Verify responsive design on all devices
- [ ] Test booking flow with real API

## 🆘 Support & Communication

### Frontend Team
- **Lead Developer**: [Name]
- **UI/UX Designer**: [Name]
- **Contact**: frontend@krishisafar.com

### Backend Team
- **Lead Developer**: [Name]
- **API Specialist**: [Name]
- **Contact**: backend@krishisafar.com

### Communication Channels
- **Slack**: #krishisafar-dev
- **Email**: dev@krishisafar.com
- **GitHub**: Issues and pull requests
- **Weekly Sync**: Every Monday at 10 AM

## 📚 Additional Resources

- **API Documentation**: `api-contract.md`
- **Component Library**: Storybook (future implementation)
- **Design System**: Figma design files
- **GitHub Repository**: [Repository URL]
- **Deployment**: [Deployment URL]

---

**Last Updated**: January 2024
**Version**: 1.0.0
**Status**: Ready for Backend Integration