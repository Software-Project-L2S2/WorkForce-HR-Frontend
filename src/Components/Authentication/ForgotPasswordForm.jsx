import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';

const ForgotPasswordForm = () => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation to check if username is provided
    if (!username) {
      setErrorMessage('Please enter your username');
      return;
    }

    try {
      const res = await API.post('api/Auth/forgot-password', { username });
      setToken(res.data.token);
      
      // Redirect to reset password page with token
      setTimeout(() => {
        navigate('/reset-password', { state: { token: res.data.token } });
      }, 2000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <div>
        <input 
          type="text" 
          placeholder="Username" 
          onChange={(e) => setUsername(e.target.value)} 
          value={username} 
        />
      </div>
      <div>
        <button type="submit">Send Reset Token</button>
      </div>

      {/* Show error message if any */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {token && <p>Token sent to your email: {token}</p>}
      
      <p>Remember your password? <a href="/login">Login here</a></p>
    </form>
  );
};

export default ForgotPasswordForm;
