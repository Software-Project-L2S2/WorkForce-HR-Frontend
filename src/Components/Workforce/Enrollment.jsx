
import React, {useState,useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert,Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../api';

function Enrollment() {
  const location = useLocation();
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState('');

   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserRole(payload.role); 
    }
  }, []);

  
  const { course } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  });
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');
  const [loading, setLoading] = useState(false);

  if (!course) {
    return <Alert variant="danger">Error: No course data found</Alert>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await api.post('api/TrainingProgram/enroll', {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        courseId: course.id
      });

      setVariant('success');
      setMessage(response.data);
      setTimeout(() => navigate('/TrainingProgram'), 2000); 
    } catch (error) {
      setVariant('danger');
      if (error.response?.data) {
        setMessage(error.response.data);
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container className="mt-5 p-4 bg-light rounded shadow d-flex justify-content-center">
      <div className="w-50">
        <h2 className="text-center mb-4">Enroll in {course.name}</h2>

        {message && <Alert variant={variant}>{message}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="fullName" className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </Form.Group>

          <Form.Group controlId="phoneNumber" className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </Form.Group>

          <div className="text-center">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Submit Enrollment'}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default Enrollment;




