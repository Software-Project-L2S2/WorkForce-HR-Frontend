import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Container,
  Alert,
  Row,
  Col,
  Card,
  Spinner
} from 'react-bootstrap';
import API from '../../api';
import './ForgotPasswordForm.css';

const ForgotPasswordForm = () => {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      setErrorMessage('Please enter your email');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await API.post('api/Auth/forgot-password', { email: username });

      localStorage.setItem('resetOtpToken', res.data.token);
      localStorage.setItem('resetEmail', username);

      navigate('/reset-password');
    } catch (err) {
      setErrorMessage(err.response?.data || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="mt-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: '80vh' }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="p-4 shadow-lg rounded-4 border-0" style={{ background: '#f8f9fa' }}>
            <h3 className="mb-4 text-center text-primary">Forgot Password</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label className="fw-semibold">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your registered email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="py-2 rounded-3"
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  type="submit"
                  className="rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" />
                      Sending...
                    </>
                  ) : (
                    'Send OTP'
                  )}
                </Button>
              </div>

              {errorMessage && (
                <Alert variant="danger" className="mt-3 text-center rounded-3">
                  {errorMessage}
                </Alert>
              )}

              <div className="text-center mt-4">
                <small className="text-muted">
                  Remember your password?{' '}
                  <a href="/login" className="text-decoration-none">
                    Login here
                  </a>
                </small>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordForm;
