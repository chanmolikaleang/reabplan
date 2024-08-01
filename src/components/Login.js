// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/login-signup-style.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  if (email === '' || password === '') {
    alert('Please enter both email and password.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/users');
    if (!response.ok) {
      throw new Error('Error loading users data.');
    }
    const data = await response.json();

    if (Array.isArray(data)) {
      const foundUser = data.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        console.log('Login successful!');
        alert('Login successful!');
        const isAdmin = foundUser.role === 'admin';
        if (isAdmin) {
          navigate('/dashboard', { state: { isAdmin } });
        } else {
          navigate('/'); // Navigate to home page
        }
      } else {
        console.error('Invalid credentials');
        alert('Invalid email or password.');
      }
    } else {
      console.error('Invalid data format');
      alert('Invalid data format. Please try again.');
    }
  } catch (error) {
    console.error('Error loading users data:', error);
    alert('Error loading users data. Please try again.');
  }
};

  return (
    <div className="login-background">
      <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
        <div className="logo">
          <img src="/photos/logo-removebg-preview.png" alt="Logo" className="img-fluid" />
        </div>
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success btn-block">
              Login
            </button>
            <Link to="/" className="btn btn-primary btn-block">
              Back
            </Link>
          </form>
          <p className='mt-2'>
            Don't have an account? <Link to="/signup" className="text-danger font-weight-bold" id="donthaveaccount">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
