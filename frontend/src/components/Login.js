import React, { useState } from 'react'; // Import React and useState hook
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { useAuth } from '../AuthContext'; // Import useAuth for authentication context
import '../styles/Login.css'; // Import CSS for styling

function Login() {
  // State hooks for managing form inputs and messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  // Hook for navigation
  const navigate = useNavigate();
  
  // Hook for authentication context
  const { login } = useAuth();

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Send POST request to login endpoint
      const res = await axios.post('http://localhost:8080/login', { email, password });
      
      // Check if response contains a token
      if (res.data.token) {
        login(res.data.token); // Call login function from AuthContext
        setMessage('Login successful. You are being redirected to the To-Do List page...');
        
        // Redirect to the To-Do List page after 3 seconds
        setTimeout(() => {
          navigate('/todo');
        }, 3000);
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      // Handle errors and display appropriate message
      setMessage('Error: ' + (error.response?.data?.message || 'An error occurred'));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className='login-input' // CSS class for styling
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          className='password-input' // CSS class for styling
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className='button' type="submit">Login</button>
      </form>
      {message && <p>{message}</p>} 
    </div>
  );
}

export default Login;
