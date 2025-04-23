import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../../api';

const ResetPasswordForm = () => {
  const { state } = useLocation();
  const [form, setForm] = useState({ username: '', token: state?.token || '', newPassword: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('api/Auth/reset-password', form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input placeholder="Reset Token" value={form.token} readOnly onChange={(e) => setForm({ ...form, token: e.target.value })} />
      <input placeholder="New Password" type="password" onChange={(e) => setForm({ ...form, newPassword: e.target.value })} />
      <button type="submit">Reset</button>
      <p>{message}</p>
      <p>Go back to <a href="/login">Login</a></p>
    </form>
  );
};

export default ResetPasswordForm;
