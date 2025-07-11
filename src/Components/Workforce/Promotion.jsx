import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Promotion() {
  const [submittedData, setSubmittedData] = useState(null);
  const [showForm, setShowForm] = useState(true); // State to control visibility of the form
  const [formData, setFormData] = useState({
    workforceName: '',
    workforceId: '',
    requestDate: '',
    currentPosition: '',
    desiredPosition: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedData(formData); // Save the form data
    alert("Promotion request submitted successfully!");
    setShowForm(false); // Hide the form after submission
  };

  const handleViewDetails = () => {
    if (submittedData) {
      setShowForm(false); // Hide the form when "View" is clicked
    } else {
      alert("No data submitted yet!"); // Alert if no data is available
    }
  };

  const handleBackToForm = () => {
    setShowForm(true); // Show the form again when "Back to Form" is clicked
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '800px' }}>
      <Card className="shadow">
        <Card.Header className="bg-primary text-white text-center py-3">
          <h2 className="mb-0">Applied For Promotion</h2>
        </Card.Header>
        <Card.Body className="p-4">
          {showForm ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="workforceName" className="mb-4">
                <Form.Label className="fw-bold">Workforce Name</Form.Label>
                <Form.Control
                  type="text"
                  name="workforceName"
                  placeholder="Enter workforce name"
                  value={formData.workforceName}
                  onChange={handleChange}
                  required
                  className="p-2"
                />
              </Form.Group>

              <Form.Group controlId="workforceId" className="mb-4">
                <Form.Label className="fw-bold">Workforce ID</Form.Label>
                <Form.Control
                  type="text"
                  name="workforceId"
                  placeholder="Enter workforce ID"
                  value={formData.workforceId}
                  onChange={handleChange}
                  required
                  className="p-2"
                />
              </Form.Group>

              <Form.Group controlId="requestDate" className="mb-4">
                <Form.Label className="fw-bold">Request Date</Form.Label>
                <Form.Control
                  type="date"
                  name="requestDate"
                  value={formData.requestDate}
                  onChange={handleChange}
                  required
                  className="p-2"
                />
              </Form.Group>

              <Form.Group controlId="currentPosition" className="mb-4">
                <Form.Label className="fw-bold">Current Position</Form.Label>
                <Form.Control
                  type="text"
                  name="currentPosition"
                  placeholder="Enter current position"
                  value={formData.currentPosition}
                  onChange={handleChange}
                  required
                  className="p-2"
                />
              </Form.Group>

              <Form.Group controlId="desiredPosition" className="mb-4">
                <Form.Label className="fw-bold">Desired Position</Form.Label>
                <Form.Control
                  type="text"
                  name="desiredPosition"
                  placeholder="Enter desired position"
                  value={formData.desiredPosition}
                  onChange={handleChange}
                  required
                  className="p-2"
                />
              </Form.Group>

              <div className="d-flex justify-content-between mt-4">
                <Button
                  type="submit"
                  variant="success"
                  size="lg"
                  className="py-2 flex-grow-1 me-2"
                >
                  Submit
                </Button>
                <Button
                  variant="info"
                  size="lg"
                  className="py-2 flex-grow-1 ms-2"
                  onClick={handleViewDetails}
                >
                  View
                </Button>
              </div>
            </Form>
          ) : (
            <>
              {submittedData && (
                <Alert variant="success" className="mt-4">
                  <h4 className="fw-bold">Submitted Details:</h4>
                  <p><strong>Workforce Name:</strong> {submittedData.workforceName}</p>
                  <p><strong>Workforce ID:</strong> {submittedData.workforceId}</p>
                  <p><strong>Request Date:</strong> {submittedData.requestDate}</p>
                  <p><strong>Current Position:</strong> {submittedData.currentPosition}</p>
                  <p><strong>Desired Position:</strong> {submittedData.desiredPosition}</p>
                </Alert>
              )}
              <div className="d-grid mt-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="py-2"
                  onClick={handleBackToForm}
                >
                  Back to Form
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Promotion;