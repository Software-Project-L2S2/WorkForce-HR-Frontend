import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import '../../App.css';

const PostJob = () => {
  return (
    <Card className="m-3">
      <Card.Body>
        <Card.Title>Post New Job</Card.Title>
        <Form>
          <Form.Group className="mb-2">
            <Form.Control type="text" placeholder="Job title" />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control type="text" placeholder="Department" />
          </Form.Group>
          <Button variant="success" className="me-2">Submit</Button>
          <Button className="custom-btn" variant="danger">Reset</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PostJob;
