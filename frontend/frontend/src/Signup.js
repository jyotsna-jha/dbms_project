import React, { useState } from 'react';
import './SignupForm.css';
import { default as axios } from 'axios';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, proceed with signup logic
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password);
    } else {
      // Form has errors, update the state with the validation errors
      setErrors(validationErrors);
    }

    const values = {
      name: name,
      email: email,
      password: password,
    };
    

    axios.post('http://localhost:8001/signup', values)
    .then(res=>console.log("Registered successfully!!"))
    .catch(err=>console.log(err));

  };

  const validateForm = () => {
    let errors = {}; // initializing empty error object

    if (name.trim() === '') {
      errors.name = 'Name is required';
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
      errors.name = 'Name should only contain letters and spaces';
    }

    if (email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Invalid email format';
    }

    if (password.trim() === '') {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password should be at least 6 characters long';
    }

    return errors;
  };

  const isValidEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="signup-form-container">
      <h2 className="signup-form-heading">Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>
        <button type="submit" className="signup-button">
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
