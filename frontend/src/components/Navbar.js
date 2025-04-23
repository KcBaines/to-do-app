import React from 'react'; // Import React
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation and useNavigate for programmatic navigation
import { useAuth } from '../AuthContext'; // Import useAuth for authentication context
import '../styles/Navbar.css'; // Import CSS for styling

function Navbar() {
  // Destructure authentication state and logout function from useAuth hook
  const { isAuthenticated, logout } = useAuth();
  
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default link behavior
    logout(); // Call the logout function
    navigate('/'); // Redirect to the home page
  };

  return (
    <nav className='navbar'>
      {/* Navigation links */}
      <Link to="/">Home</Link>
      {isAuthenticated ? (
        <>
          {/* Links visible when the user is authenticated */}
          <Link to="/todo">To-Do List</Link>
          <Link to="/" onClick={handleLogout}>Logout</Link>
        </>
      ) : (
        <>
          {/* Links visible when the user is not authenticated */}
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
