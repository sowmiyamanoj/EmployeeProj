import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const SignUp: React.FC = () => {
  const [employeeName, setEmployeeName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeName || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    fetch(`https://thaydb.vercel.app/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        employeeName,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setErrorMessage(data.message);
          console.log('User registered successfully');
          navigate('/login');
        } else {
          setErrorMessage("The email ID already exists.")
        }
      })
      .catch((error) => {
        console.error('Error during signup:', error);
        setErrorMessage('Error during registration');
      });
  };

  return (
    <div className="container" id="loginbox">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                onChange={(e) => setEmployeeName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {errorMessage && <div className="text-danger">{errorMessage}</div>}

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered
              <Link className="link-signin ms-1" to={'/login'}>
                Sign in?
              </Link>
            </p>
          </form>
        </div>
      </div>
      <style>
      {`
        body {
          background: linear-gradient(to right, lightblue, #ffffff);
        }
      `}
    </style>
    </div>
  );
};

export default SignUp;
