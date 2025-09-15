import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../utils/helpers';

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Only run once on mount
    if (initialized) return;
    
    console.log('UserContext - Initializing...');
    
    // Use setTimeout to prevent hydration mismatch
    const initAuth = () => {
      try {
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('currentUser');
          if (stored) {
            const currentUser = JSON.parse(stored);
            console.log('UserContext - Found user in localStorage:', currentUser);
            setUser(currentUser);
          }
        }
      } catch (error) {
        console.error('UserContext - Error reading from localStorage:', error);
        // Clear corrupted data
        if (typeof window !== 'undefined') {
          localStorage.removeItem('currentUser');
        }
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    // Small delay to prevent SSR/hydration issues
    const timer = setTimeout(initAuth, 100);
    return () => clearTimeout(timer);
  }, [initialized]);

  const login = (userData) => {
    console.log('UserContext - Logging in user:', userData);
    setUser(userData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(userData));
    }
  };

  const logout = () => {
    console.log('UserContext - Logging out user');
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  };

  const updateUser = (updatedUserData) => {
    const newUserData = { ...user, ...updatedUserData };
    setUser(newUserData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(newUserData));
    }
  };

  const switchRole = (newRole, users) => {
    // For demo purposes - allow role switching
    const newUser = users.find(u => u.role === newRole);
    if (newUser) {
      const { password: _, ...userWithoutPassword } = newUser;
      login(userWithoutPassword);
      return userWithoutPassword;
    }
    return null;
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    switchRole,
    loading,
    isAuthenticated: !!user,
    hasRole: (requiredRole) => user && user.role === requiredRole,
    isRole: (role) => user && user.role === role
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
