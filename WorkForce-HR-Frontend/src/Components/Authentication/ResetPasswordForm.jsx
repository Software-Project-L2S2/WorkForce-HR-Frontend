import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import API from '../../api';

const ResetPasswordForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const tokenFromState = state?.token || '';

  const [form, setForm] = useState({
    username: '',
    token: tokenFromState,
    newPassword: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const [showResend, setShowResend] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  useEffect(() => {
    if (tokenFromState) {
      localStorage.setItem('resetToken', tokenFromState);
    }
  }, [tokenFromState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const res = await API.post('api/Auth/reset-password', {
        email: form.username,
        otp: form.token,
        newPassword: form.newPassword,
      });

      setMessage(res.data);
      setShowResend(false);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data || 'Error resetting password';
      setMessage(errorMsg);

      if (
  typeof errorMsg === 'string' &&
  errorMsg.toLowerCase().includes('otp') &&
  (
    errorMsg.toLowerCase().includes('wait') ||
    errorMsg.toLowerCase().includes('expired') ||
    errorMsg.toLowerCase().includes('invalid')
  )
) {
  setShowResend(true);
}
    }
  };

  const handleResendOtp = async () => {
    if (!form.username) {
      setResendMessage('Please enter your email to resend OTP.');
      return;
    }

    try {
      const res = await API.post('api/Auth/resend-otp', {
        email: form.username,
      });

      setResendMessage(res.data);
      setShowResend(false);
    } catch (err) {
      setResendMessage(err.response?.data || 'Failed to resend OTP.');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h4 className="mb-4 text-center text-primary">Reset Password</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>OTP</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter OTP"
            value={form.token}
            onChange={(e) => setForm({ ...form, token: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New Password"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Reset Password
        </Button>

        {message && (
          <Alert className="mt-3" variant={message.toLowerCase().includes('success') ? 'success' : 'danger'}>
            {message}
          </Alert>
        )}

        {showResend && (
          <>
            <div className="d-flex justify-content-center mt-3">
              <Button variant="outline-secondary" onClick={handleResendOtp} size="sm">
                Resend OTP
              </Button>
            </div>
            {resendMessage && (
              <Alert variant="info" className="mt-2">
                {resendMessage}
              </Alert>
            )}
          </>
        )}

        <div className="text-center mt-4">
          <a href="/login" className="text-decoration-none">Back to Login</a>
        </div>
      </Form>
    </Container>
  );
};

export default ResetPasswordForm;
