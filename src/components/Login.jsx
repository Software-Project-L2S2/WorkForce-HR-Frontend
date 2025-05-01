import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/login.css';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5202/api/auth/login',
        credentials,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.token) {
        login(response.data.token);
        navigate('/Dashboard');
      } else {
        throw new Error('No authentication token received');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="auth-card shadow-lg w-100">
          <Row className="g-0">
            {/* Left: Login Form */}
            <Col xs={12} md={6} className="p-5 d-flex align-items-center">
              <div className="w-100">
                <h2 className="auth-title mb-2">Login</h2>
                <p className="auth-subtitle mb-4">Login to your account.</p>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="form-label">E-mail Address</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      value={credentials.email}
                      onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter valid email"
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="form-label">Password</Form.Label>
                    <Form.Control
                      type="password"
                      required
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter password"
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check type="checkbox" label="Remember me" />
                    <Button variant="link" className="p-0 text-primary">
                      Reset Password?
                    </Button>
                  </div>
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 auth-btn"
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                  <div className="auth-switch mt-3 text-center">
                    Don't have an account?{' '}
                    <Button variant="link" onClick={() => navigate('/register')} className="p-0">
                      Sign up
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
            {/* Right: Image with overlay and text */}
            <Col md={6} className="auth-image-col d-none d-md-block p-0">
              <div className="auth-image-wrapper">
                <img src="/images/login.jpg" alt="HR Operations" className="auth-bg-image" />
                <div className="auth-image-overlay"></div>
                <div className="auth-image-text">
                  <h2>
                    Manage all <span className="highlight">HR Operations</span><br />
                    from the comfort of your home.
                  </h2>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}
