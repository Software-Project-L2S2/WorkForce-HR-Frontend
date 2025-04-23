import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';

const Profile = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }

    API.get('api/Auth/profile')
      .then((res) => setMessage(res.data))
      .catch(() => navigate('/login'));
  }, [navigate]);

  return <h2>{message}</h2>;
};

export default Profile;
