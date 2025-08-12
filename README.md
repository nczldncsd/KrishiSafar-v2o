# KrishiSafar - Agri-Tourism Platform Frontend

A modern React-based frontend for the KrishiSafar agri-tourism platform, built with Vite, React 18, Tailwind CSS, and React Router v6.

## 🚀 Features

- **Modern React Architecture**: Built with React 18 hooks and functional components
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Authentication System**: JWT-based authentication with role-based access control
- **Experience Management**: Browse, search, and filter agri-tourism experiences
- **Booking System**: Complete booking flow for authenticated users
- **Role-Based Access**: Different interfaces for users and hosts
- **Mock API**: Simulated backend with realistic data and latency

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context + Hooks
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js 16+ 
- npm 8+

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd krishisafar-frontend

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```bash
# Copy the example environment file
cp .env.example .env

# Edit the file with your configuration
nano .env
```

### 3. Run Development Server

```bash
# Start development server
npm run dev
```

The application will open at `http://localhost:3000`

### 4. Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🔐 Demo Accounts

For testing purposes, the following demo accounts are available:

### User Account
- **Email**: `user@demo.com`
- **Password**: Any password
- **Role**: User (can book experiences)

### Host Account
- **Email**: `host@demo.com`
- **Password**: Any password
- **Role**: Host (cannot book experiences)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── booking/        # Booking-related components
│   ├── experience/     # Experience display components
│   └── shared/         # Common components (guards, redirects)
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── layouts/            # Page layout components
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── public/         # Public pages
│   ├── system/         # System pages (404, etc.)
│   └── user/           # Protected user pages
├── services/           # API service functions
├── utils/              # Utility functions and constants
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎨 Styling

The application uses Tailwind CSS with custom component classes:

- `.btn-primary` - Primary button styling
- `.btn-secondary` - Secondary button styling
- `.btn-outline` - Outline button styling
- `.card` - Card container styling
- `.input-field` - Form input styling

## 🔌 API Integration

The frontend includes a mock API service (`src/services/api.js`) that simulates:

- Experience listing and details
- User authentication
- Booking creation
- Search and filtering

**Note**: Replace the mock functions with actual API calls when integrating with a real backend.

## 🛡️ Authentication & Authorization

### Authentication Flow
1. User submits login credentials
2. JWT token is stored in localStorage
3. User state is managed via AuthContext
4. Protected routes check authentication status

### Role-Based Access Control
- **Public Routes**: Accessible to all users
- **Protected Routes**: Require authentication
- **Role-Specific Routes**: Require specific user roles (e.g., user vs host)

### Route Guards
- `RoleGuard`: Protects routes based on user roles
- `AuthRedirect`: Redirects authenticated users away from auth pages

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Mobile**: Single column layout, stacked navigation
- **Tablet**: Two-column grid layouts
- **Desktop**: Multi-column layouts with sidebars

## 🧪 Testing

```bash
# Run linting
npm run lint

# Run type checking (if using TypeScript)
npm run type-check
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build the project
npm run build

# Deploy the dist folder to Netlify
```

### Traditional Hosting
```bash
# Build the project
npm run build

# Upload the dist folder to your web server
```

## 🔧 Configuration

### Vite Configuration
- Development server on port 3000
- Hot module replacement enabled
- Optimized build output

### Tailwind Configuration
- Custom color palette for primary and earth tones
- Inter font family
- Responsive breakpoints

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- **Email**: support@krishisafar.com
- **Documentation**: Check the `api-contract.md` and `FRONTEND_HANDOFF.md` files
- **Issues**: Create an issue in the repository

## 🔮 Future Enhancements

- [ ] User profile management
- [ ] Booking history and management
- [ ] Review and rating system
- [ ] Payment integration
- [ ] Real-time notifications
- [ ] Multi-language support
- [ ] Advanced search filters
- [ ] Wishlist functionality
- [ ] Social sharing
- [ ] Mobile app (React Native)

---

**Built with ❤️ for the agri-tourism community**