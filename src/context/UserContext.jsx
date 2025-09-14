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

  useEffect(() => {
    // Check for existing user session on app load
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUser = (updatedUserData) => {
    const newUserData = { ...user, ...updatedUserData };
    setUser(newUserData);
    localStorage.setItem('currentUser', JSON.stringify(newUserData));
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
