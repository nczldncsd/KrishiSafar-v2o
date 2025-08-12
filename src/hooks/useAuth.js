import { useAuthContext } from '../context/AuthContext.jsx';

export const useAuth = () => {
  const context = useAuthContext();
  
  return {
    // State
    user: context.user,
    token: context.token,
    isAuthenticated: context.isAuthenticated,
    isLoading: context.isLoading,
    error: context.error,
    
    // Actions
    login: context.login,
    logout: context.logout,
    
    // Convenience getters
    isUser: context.user?.role === 'user',
    isHost: context.user?.role === 'host',
    isGuest: !context.isAuthenticated,
    
    // User info
    userName: context.user?.name || 'Guest',
    userEmail: context.user?.email,
    userRole: context.user?.role
  };
};