import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!formData.agreeTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:5202/api/auth/register', {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phoneNumber: formData.phone?.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
      if (response.data.token) {
        login(response.data.token);
        navigate('/Dashboard');
      } else {
        navigate('/login');
      }
    } catch (error) {
      const backendErrors = error.response?.data?.errors || [];
      const errorMessage = backendErrors.join(', ') || error.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="auth-card shadow-lg">
          <Row className="g-0">
            {/* Left: Image + Overlay + Text */}
            <Col md={5} className="auth-image-col d-none d-md-block p-0">
              <div className="auth-image-wrapper">
                <img src="/images/register.png" alt="Workforce Planning" className="auth-bg-image" />
                <div className="auth-image-overlay"></div>
                <div className="auth-image-text">
                  <h2>Workforce Planning and Optimization System</h2>
                  <div className="auth-underline"></div>
                </div>
              </div>
            </Col>
            {/* Right: Form */}
            <Col xs={12} md={7} className="p-4">
              <div className="auth-form-content">
                <h2 className="auth-title mb-1">Welcome Back !</h2>
                <p className="auth-subtitle mb-4">Register your account</p>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="First Name"
                          minLength="2"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="Last Name"
                          minLength="2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>E-mail Address</Form.Label>
                        <Form.Control
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="E-mail Address"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Phone Number"
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control
                          type="password"
                          required
                          minLength="8"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder="Enter Password"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          required
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          placeholder="Confirm password"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3 form-check">
                    <Form.Check
                      required
                      type="checkbox"
                      label={<>I agree to all the <a href="#">Terms</a>, <a href="#">Privacy Policy</a></>}
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    />
                  </Form.Group>
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 auth-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Creating Account...
                      </span>
                    ) : 'Create Account'}
                  </Button>
                  <div className="auth-switch mt-3 text-center">
                    Already have an account?{' '}
                    <Button 
                      variant="link" 
                      onClick={() => navigate('/login')}
                      disabled={isLoading}
                      className="p-0"
                    >
                      Log In
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}
