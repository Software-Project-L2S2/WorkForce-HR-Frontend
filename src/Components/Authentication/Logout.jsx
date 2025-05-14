import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Clear the token
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    // Show logout message
    setMessage('You have been logged out successfully! Redirecting to login...');

    // Redirect after short delay
    const timer = setTimeout(() => {
      navigate('/login');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#f8f9fa',
      fontSize: '18px',
      fontWeight: '500',
      color: 'green'
    }}>
      {message}
    </div>
  );
};

export default Logout;
