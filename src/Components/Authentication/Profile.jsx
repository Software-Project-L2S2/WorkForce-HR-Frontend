import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import API from '../../api';

const Profile = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    API.get('api/Auth/profile')
      .then((res) => setMessage(res.data))
      .catch(() => navigate('/login'));
  }, [navigate]);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          {message && (
            <Card className="shadow-lg border-0 text-center">
              <Card.Body>
                <PersonCircle size={60} className="mb-3 text-primary" />
                <Card.Title className="mb-3">User Profile</Card.Title>
                <p><strong>Email:</strong> {message.email}</p>
                {message.role && <p><strong>Role:</strong> {message.role}</p>}
                <p className="text-success mt-3">Welcome back!</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
