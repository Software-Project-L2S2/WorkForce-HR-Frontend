// import React from 'react'

// const LeaveRequests = () => {
//   return (
//     <div>LeaveRequests</div>
//   )
// }

// export default LeaveRequests

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function LeaveRequests() {
  const [file, setFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Leave application submitted successfully.');
  };

  const handleReset = () => {
    // Reset form fields
    document.getElementById('leaveApplicationForm').reset();
    setFile(null);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <Container className="mt-5 p-4 bg-light rounded shadow">
      <h2 className="text-center mb-4">📄 Leave Application</h2>
      <p className="text-center">Fill the required fields below to apply</p>

      {/* Available Leave Days Section */}
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3">Available Leave Days</h5>
          <Row>
            <Col>
              <p><strong>Annual Leave</strong></p>
              <p>10 of 60 day(s)</p>
            </Col>
            <Col>
              <p><strong>Sick Leave</strong></p>
              <p>0 of 10 day(s)</p>
            </Col>
            <Col>
              <p><strong>Compassionate Leave</strong></p>
              <p>8 of 15 day(s)</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Leave Application Form */}
      <Form id="leaveApplicationForm" onSubmit={handleSubmit}>
        <Form.Group controlId="leaveType" className="mb-3">
          <Form.Label>Leave Type</Form.Label>
          <Form.Control as="select" required>
            <option value="">Select Leave Type</option>
            <option value="annual">Annual Leave</option>
            <option value="sick">Sick Leave</option>
            <option value="compassionate">Compassionate Leave</option>
          </Form.Control>
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="duration">
              <Form.Label>Duration</Form.Label>
              <Form.Control type="number" min="0" placeholder="Duration in days" required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="resumptionDate">
              <Form.Label>Resumption Date</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="reason" className="mb-3">
          <Form.Label>Reason for leave</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter the reason for your leave" required />
        </Form.Group>

        <Form.Group controlId="fileUpload" className="mb-3">
          <Form.Label>Attach handover document (pdf, jpg, docx, or any other format)</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>

        <div className="text-center">
          <Button type="submit" variant="success" className="me-2">
            Submit
          </Button>
          <Button type="button" variant="danger" className="me-2" onClick={handleReset}>
            Reset
          </Button>
          <Button type="button" variant="primary">
            View
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default LeaveRequests;