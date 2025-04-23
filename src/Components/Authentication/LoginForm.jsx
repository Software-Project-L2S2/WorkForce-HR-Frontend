import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import './LoginForm.css'; // Optional custom styles
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      setMessage('Please fill in both fields');
      setSuccess(false);
      return;
    }

    try {
      const res = await API.post('/api/Auth/login', form);
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful!');
      setSuccess(true);
      setTimeout(() => {
        navigate('/Dashboard'); // ✅ Redirect to Dashboard after login
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
      setSuccess(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row>
        <Col>
          <Card className="p-4 shadow login-card">
            <h2 className="text-center mb-4">Login</h2>

            {message && (
              <Alert variant={success ? 'success' : 'danger'}>
                {message}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>

            <div className="mt-3 text-center">
              <p>
                Forgot password? <a href="/forgot-password">Click here</a>
              </p>
              <p>
                Don't have an account? <a href="/register">Register here</a>
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;

