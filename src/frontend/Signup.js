import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await response.json();
      
      // Handle server response
      if (response.ok) {
        console.log('Signup successful:', data);
        navigate('/dashboard'); // Navigate to dashboard after successful signup
      } else {
        console.error('Signup failed:', data.message);
        alert(data.message || 'Failed to sign up');  // Show error message from server or a default message
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error, unable to sign up');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen signup-container items-center justify-center">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up for an Account</h2>
        <form onSubmit={handleSubmit} className="signup-form space-y-4">
          <div>
            <label htmlFor="email" className="signup-label">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="signup-label">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="signup-input"
              placeholder="Choose a username"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="signup-label">Password</label>
            <div className="input-group">
            <input
  type={showPassword ? "text" : "password"}
  id="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="signup-input"
  placeholder="Enter your password"
  required
/>

              <span className="input-group-addon">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="toggle-password"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </span>
            </div>
          </div>
          <button type="submit" className="signup-button" style={{ backgroundColor: '#007bff', color: 'white' }}>
            Sign Up
          </button>
          <div className="text-center">
            Already have an Account?
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="signup-button text-blue-500 underline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

