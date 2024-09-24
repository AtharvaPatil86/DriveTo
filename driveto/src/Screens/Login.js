import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  // Manage state for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Forgot password state
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotError, setForgotError] = useState('');

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: email,
        password: password
      });
  
      // Store token and user info in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user as a JSON string
  
      window.location.href = '/'; // Redirect after login
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed. Please try again.');
    }
  };
  
  // Handle forgot password form submission
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend forgot-password route
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', {
        email: forgotEmail,
      });

      // Display success message
      setForgotMessage('Password reset email sent. Please check your inbox.');
      setForgotError('');
    } catch (error) {
      // Display error message if request fails
      console.error('Forgot password error:', error.response?.data?.error || 'Unknown error');
      setForgotError(error.response?.data?.error || 'Failed to send reset email. Please try again.');
      setForgotMessage('');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Login</h3>

        {/* Display error message if login fails */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              required 
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password" 
              required 
            />
          </div>

          {/* Forgot Password Link */}
          <div className="d-flex justify-content-between mb-3">
            <a href="#" onClick={() => setShowForgotPasswordModal(true)} className="small">Forgot my password?</a>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>

          {/* Create New Account Link */}
          <div className="text-center">
            <p className="small mb-0">
              Don't have an account? <a href="#">Create a new account</a>
            </p>
          </div>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Forgot Password</h5>
                <button type="button" className="btn-close" onClick={() => setShowForgotPasswordModal(false)}></button>
              </div>
              <div className="modal-body">
                {forgotError && <div className="alert alert-danger">{forgotError}</div>}
                {forgotMessage && <div className="alert alert-success">{forgotMessage}</div>}

                <form onSubmit={handleForgotPassword}>
                  <div className="mb-3">
                    <label htmlFor="forgotEmail" className="form-label">Enter your email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="forgotEmail"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Send Reset Link</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
