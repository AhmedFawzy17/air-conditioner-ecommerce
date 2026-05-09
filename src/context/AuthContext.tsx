import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthResponse } from '../types/auth';

interface AuthContextType {
  isLoggedIn: boolean;
  user: {
    email: string | null;
    userId: string | null;
    roles: string[];
    fullName: string | null;
  };
  login: (response: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('token'));
  const [user, setUser] = useState({
    email: localStorage.getItem('email'),
    userId: localStorage.getItem('userId'),
    roles: JSON.parse(localStorage.getItem('roles') || '[]'),
    fullName: localStorage.getItem('fullName'),
  });

  const logout = useCallback(() => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUser({
      email: null,
      userId: null,
      roles: [],
      fullName: null,
    });
  }, []);

  const checkExpiration = useCallback(() => {
    const expiration = localStorage.getItem('expiration');
    if (expiration) {
      const expirationDate = new Date(expiration);
      if (expirationDate <= new Date()) {
        logout();
      }
    }
  }, [logout]);

  useEffect(() => {
    checkExpiration();
    const interval = setInterval(checkExpiration, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [checkExpiration]);

  const login = (response: AuthResponse) => {
    localStorage.setItem('token', response.token);
    localStorage.setItem('userId', response.userId);
    localStorage.setItem('email', response.email);
    localStorage.setItem('roles', JSON.stringify(response.roles));
    localStorage.setItem('expiration', response.expiration);
    localStorage.setItem('fullName', response.fullName);
    
    setIsLoggedIn(true);
    setUser({
      email: response.email,
      userId: response.userId,
      roles: response.roles,
      fullName: response.fullName,
    });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
