import React, { useState } from 'react'; // Import React and useState hook
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../styles/Register.css'; // Import CSS for styling

function Register() {
  // State variables to manage input values and messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Ensure the email ends with "@gmail.com"
    if (!email.endsWith('@gmail.com')) {
      setMessage('Error: Email must end with @gmail.com');
      return;
    }

    try {
      // Send registration request with email and password only
      const res = await axios.post('http://localhost:8080/register', 
        { email, password },  // Only send email and password
        { headers: { 'Content-Type': 'application/json' } }
      ); 

      setMessage(res.data.message || 'Registration successful. You are being redirected to the login page...');
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || 'An error occurred'));
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <p>Users can only register with an email address ending in @gmail.com</p>
      <form onSubmit={handleRegister}>
        <input
          className='register-input'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          className='password-input'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className='button' type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
