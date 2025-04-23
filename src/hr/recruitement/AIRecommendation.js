import React from "react";
import { Card, Table, Button } from "react-bootstrap";

const AIRecommendation = () => {
  return (
    <Card className="m-3">
      <Card.Body>
        <Card.Title>AI Recommendation Engine</Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Job title</th>
              <th>Name</th>
              <th>Match (%)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Software Engineer</td>
              <td>Janith</td>
              <td>80</td>
              <td><Button variant="primary" size="sm">View</Button></td>
            </tr>
            <tr>
              <td>UI/UX Designer</td>
              <td>Pawan</td>
              <td>70</td>
              <td><Button variant="primary" size="sm">View</Button></td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default AIRecommendation;
