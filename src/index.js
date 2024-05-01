import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import './frontend/style.css'; // Make sure the path to your CSS file is correct
import Home from './frontend/home';
import NotFound from './frontend/not-found';
import Login from './frontend/Login'; // Import the Login component, adjust the path as necessary
import Signup from './frontend/Signup';
import Dashboard from './frontend/Dashboard';
import Profile from './frontend/Profile';
// Example function placeholders, replace with your actual logic
const handleLogin = (username, password) => {
  console.log("Logging in with:", username, password);
  // Add your login logic here (e.g., API call)
};

const navigateToSignup = () => {
  // Use your routing library (e.g., React Router) to navigate to the signup page
  console.log("Navigating to signup page");
};
const handleSignup = (email,username,dateOfBirth, password, confirmPassword) => {
  console.log("Logging in with:", email, username,dateOfBirth, password,confirmPassword);
  // Add your login logic here (e.g., API call)
};
const navigateToLogin = () => {
  // Use your routing library (e.g., React Router) to navigate to the signup page
  console.log("Navigating to login page");
};
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} onNavigateToSignup={navigateToSignup} />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="*" element={<NotFound onLogin={handleSignup} onNavigateToSignup={navigateToLogin}/>} />
        <Route path="/home" element={<Navigate replace to="/" />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));




