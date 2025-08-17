import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { debug } from '../utils/debug';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    try {
      debug.log('AuthContext login attempt:', { email, password });
      const response = await authAPI.login(email, password);
      debug.log('AuthContext login response:', response);

      // Store the access token
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('isAuthenticated', 'true');

      // Get user profile data
      const userProfile = await authAPI.getProfile();

      const userData = {
        id: userProfile.id,
        email: userProfile.email,
        name: `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim() || userProfile.email,
        firstName: userProfile.first_name || '',
        lastName: userProfile.last_name || '',
        avatar: userProfile.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        isActive: userProfile.is_active,
        memberSince: userProfile.created_at ? new Date(userProfile.created_at).getFullYear().toString() : '2024',
        totalAppointments: userProfile.total_appointments || 0,
        favoriteBarbers: userProfile.favorite_barbers_count || 0,
        phone: userProfile.phone || '',
        birthDate: userProfile.birth_date || '',
        address: userProfile.address || ''
      };

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));

      debug.log('AuthContext login success, userData:', userData);
      return userData;
    } catch (error) {
      debug.error('AuthContext login error:', error);
      throw error;
    }
  };

  const register = async (email, password, firstName = '', lastName = '') => {
    try {
      const response = await authAPI.register(email, password, firstName, lastName);
      debug.log('AuthContext register success:', response);
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
  };

  const updateUser = async (userData) => {
    try {
      const updatedProfile = await authAPI.updateProfile(userData);

      const newUserData = {
        ...user,
        ...updatedProfile,
        name: `${updatedProfile.first_name || ''} ${updatedProfile.last_name || ''}`.trim() || updatedProfile.email
      };

      setUser(newUserData);
      localStorage.setItem('user', JSON.stringify(newUserData));

      return newUserData;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await authAPI.changePassword(currentPassword, newPassword);
      return true;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  };

  useEffect(() => {
    // Sync authentication state with localStorage
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [isAuthenticated, user]);

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    updateUser,
    changePassword,
    setAuth: setIsAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
