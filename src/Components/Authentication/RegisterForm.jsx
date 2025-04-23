import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import './RegisterForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterForm = () => {
  const [form, setForm] = useState({ username: '', password: '', role: '' });
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password || !form.role) {
      setMessage('Please enter username, password, and select a role');
      return;
    }

    try {
      const res = await API.post('/api/Auth/register', form);
      const receivedToken = res.data.token;
      localStorage.setItem('token', receivedToken);
      setToken(receivedToken);
      setMessage('Registration successful!');

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container fluid className="register-container">
      <Row className="register-row shadow-lg rounded-4 overflow-hidden">
        {/* Left Side Image - hidden on small screens */}
        <Col md={6} className="d-none d-md-block p-0">
          <img
            src="/Images/Registerpage.png"
            alt="Register"
            className="register-image"
          />
        </Col>

        {/* Right Side Form */}
        <Col xs={12} md={6} className="form-col p-4 bg-white d-flex align-items-center">
          <Card className="border-0 w-100">
            <h2 className="text-center mb-4">Create an Account</h2>

            {message && <Alert variant={token ? 'success' : 'danger'}>{message}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formRole">
                <Form.Label>Select Role</Form.Label>
                <Form.Select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="">-- Select Role --</option>
                  <option value="Admin">Admin</option>
                  <option value="HR">HR</option>
                  <option value="Workforce">Workforce</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Register
              </Button>
            </Form>

            {token && (
              <div className="mt-3">
                <Form.Label>Token:</Form.Label>
                <Form.Control as="textarea" rows={3} readOnly value={token} />
              </div>
            )}

            <div className="mt-3 text-center">
              <p>
                Already have an account? <a href="/login">Login</a>
              </p>
              <p>
                Forgot password? <a href="/forgot-password">Click here</a>
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
