import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Import global styles
import App from './App'; // Import the root component
import { AuthProvider } from './AuthContext'; // Import authentication context provider

const container = document.getElementById('root'); // Get the root element in the DOM
const root = createRoot(container); // Create a root

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App /> {/* Render the root component wrapped in AuthProvider */}
    </AuthProvider>
  </React.StrictMode>
);
