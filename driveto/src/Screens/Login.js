import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Login</h3>
        
        {/* Username Input */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" placeholder="Enter your username" />
        </div>

        {/* Password Input */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter your password" />
        </div>

        {/* Forgot Password Link */}
        <div className="d-flex justify-content-between mb-3">
          <a href="#" className="small">Forgot my password?</a>
        </div>

        {/* Login Button */}
        <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>

        {/* Create New Account Link */}
        <div className="text-center">
          <p className="small mb-0">
            Don't have an account? <a href="#">Create a new account</a>
          </p>
        </div>
      </div>
    </div>
  );
   
    
  
}
