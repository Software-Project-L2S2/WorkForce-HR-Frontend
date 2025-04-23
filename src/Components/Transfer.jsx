// import React from 'react'

// const Transfer = () => {
//   return (
//     <div>Transfer</div>
//   )
// }

// export default Transfer
import React from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Transfer() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
    alert('Your transfer/exit request has been submitted successfully.');
  };

  return (
    <Container className="mt-5 p-4 bg-light rounded shadow">
      <h2 className="text-center mb-4">Applied For Exit/Transfer</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Enter your Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your Name" required />
        </Form.Group>

        <Form.Group controlId="department" className="mb-3">
          <Form.Label>Enter your Department</Form.Label>
          <Form.Control type="text" placeholder="Enter your Department" required />
        </Form.Group>

        <Form.Group controlId="typeOfRequest" className="mb-3">
          <Form.Label>Type of Request</Form.Label>
          <Form.Control as="select" required>
            <option value="">Select type of Request</option>
            <option value="transfer">Transfer</option>
            <option value="exit">Exit</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="reason" className="mb-3">
          <Form.Label>Reason for Request</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter the Reason for your Request"
            required
          />
        </Form.Group>

        <div className="text-center">
          <Button type="submit" variant="success">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Transfer;
