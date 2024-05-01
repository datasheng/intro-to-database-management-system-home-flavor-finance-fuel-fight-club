import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './Login.css'; // Ensure the path to your CSS file is correct
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
  
      if (response.ok) {
        console.log('Login successful:', data);
        navigate('/dashboard', { state: { user: data.user } }); // Pass user data to dashboard route
      } else {
        console.error('Login failed:', data.message);
        alert(data.message); // Display error message from server
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error, unable to login');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen login-container items-center justify-center">
      <div className="login-box">
        <h2 className="login-title">Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="login-form space-y-4">
          <div>
            <label htmlFor="username" className="login-label">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="login-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
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
          <button type="submit" className="login-button">Sign In</button>
          <div className="text-center">
            New Here? 
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="signup-button text-blue-500 underline"
            >
              Sign Up / Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

