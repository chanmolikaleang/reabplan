import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/login-signup-style.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (name === '' || email === '' || password === '') {
      alert('Please fill in all fields.');
      return;
    }

    const newUser = {
      name: name,
      email: email,
      password: password
    };

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        throw new Error('Error signing up.');
      }

      console.log('Signup successful!', response);
      navigate('/'); 
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Error signing up. Please try again.');
    }
  };

  return (
    <div className="login-background">
      <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
        <div className="logo">
          <img src="/photos/logo-removebg-preview.png" alt="Logo" className="img-fluid" />
        </div>
        <div className="login-box">
          <h2>Sign Up</h2>
          <form id="signupForm">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <button
              type="button"
              className="btn btn-success btn-block"
              onClick={handleSignup}
            >
              Sign Up
            </button>
            <Link to="/" className="btn btn-primary btn-block">
              Back
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;