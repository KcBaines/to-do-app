import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import routing components
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap icons
import Home from './components/Home'; // Import Home component
import Register from './components/Register'; // Import Register component
import Login from './components/Login'; // Import Login component
import TodoList from './components/TodoList'; // Import TodoList component
import Navbar from './components/Navbar'; // Import Navbar component
import './App.css'; // Import App styling

function App() {
  return (
    <Router>
      <div className="header">
        <i className="bi bi-card-checklist"></i> {/* Icon for the header */}
        <h1>HarmonyHub</h1> {/* Title of the app */}
      </div>
      <Navbar /> {/* Render the Navbar */}
      <Routes>
        {/* Define routes for different components */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;
