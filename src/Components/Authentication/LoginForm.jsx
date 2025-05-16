import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from 'jwt-decode';


const LoginForm = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    if (!form.username || !form.password) {
      setMessage('Please fill in both fields');
      setSuccess(false);
      setIsLoading(false);
      return;
    }
  
    try {
      const res = await API.post('/api/Auth/login', {
        email: form.username,
        password: form.password,
      });
  
      const token = res.data.token;
      if (!token) {
        throw new Error('Token not found in response');
      }
    console.log(token);
     if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }

      const decoded = jwtDecode(token);
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  
      if (!role) {
        throw new Error('Role not found in token');
      }
  
      setMessage('Login successful! Redirecting...');
      setSuccess(true);
  
      setTimeout(() => {
        switch (role.toLowerCase()) {
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'hr':
            navigate('/hr-dashboard');
            break;
          case 'workforce':
            navigate('/Dashboard');
            break;
          default:
            navigate('/');
            break;
        }
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || 'Login failed. Please try again.');
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f0f4f8' }}>
      <Row className="g-0 shadow-lg" style={{ maxWidth: '1000px', borderRadius: '15px', overflow: 'hidden' }}>
        <Col md={6} className="d-none d-md-flex p-0">
          <div 
            className="h-100 w-100 position-relative"
            style={{
              backgroundImage: "url('/Images/Login.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '500px'
            }}
          >
            {/* Blue transparent overlay */}
            <div 
              className="position-absolute top-0 left-0 w-100 h-100"
              style={{
                backgroundColor: 'rgba(0, 0, 255, 0.3)' // Blue with 30% opacity
              }}
            ></div>
            <div className="h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
              <div className="text-white text-center p-4">
                <h1 className="display-5 fw-bold mb-3">Welcome Back!</h1>
              </div>
            </div>
          </div>
        </Col>

        
        <Col xs={12} md={6} className="bg-white p-4 p-md-5">
          <div className="h-100 d-flex flex-column justify-content-center">
            <div className="text-center mb-4">
              <h2 className="fw-bold mb-3">Login</h2>
            </div>

            {message && (
              <Alert variant={success ? 'success' : 'danger'} className="text-center">
                {message}
              </Alert>
            )}

            <Form onSubmit={handleSubmit} className="mt-3">
              <Form.Group className="mb-3">
              <Form.Label>UserName</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username or email"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="py-2 px-3"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="py-2 px-3"
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <Form.Check 
                  type="checkbox" 
                  id="rememberMe" 
                  label="Remember me" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <a href="/forgot-password" className="text-decoration-none text-primary">
                  Forgot password?
                </a>
              </div>

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 py-2 mb-3 fw-bold"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>

              
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
