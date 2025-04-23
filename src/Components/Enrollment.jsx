
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Enrollment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure course from location.state and handle undefined case
  const { course } = location.state || {};

  if (!course) {
    return <Alert variant="danger">Error: No course data found</Alert>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the enrollment process
    alert(`Enrolled in ${course.name}`);
    navigate('/TrainingProgram'); // Navigate back to the Training Program page
  };

  return (
    <Container className="mt-5 p-4 bg-light rounded shadow d-flex justify-content-center">
      <div className="w-50">
        <h2 className="text-center mb-4">Enroll in {course.name}</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your full name" required />
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" required />
          </Form.Group>

          <Form.Group controlId="phone" className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" placeholder="Enter your phone number" required />
          </Form.Group>

          <div className="text-center">
            <Button type="submit" variant="primary">
              Submit Enrollment
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default Enrollment;




