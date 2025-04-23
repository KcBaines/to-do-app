import React, { createContext, useState, useContext } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Provider component that wraps the application
export function AuthProvider({ children }) {
  // State to store the authentication token
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Function to log in a user and save the token
  const login = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  // Function to log out a user and remove the token
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  // Check if the user is authenticated
  const isAuthenticated = !!token;

  // Provide the auth state and functions to children components
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the auth context
export function useAuth() {
  return useContext(AuthContext);
}
