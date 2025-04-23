import React from "react";
import { Card, Table, Button } from "react-bootstrap";
import { FaEye, FaEdit, FaTimes } from "react-icons/fa";

const JobList = () => {
  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>Active Job Postings</Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Job title</th>
              <th>Department</th>
              <th>Vacancies</th>
              <th>Post date</th>
              <th>Applications</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Software Developer</td>
              <td>IT</td>
              <td>2</td>
              <td>2024/11/01</td>
              <td>20</td>
              <td>
                <Button variant="primary" size="sm" className="me-2"><FaEye /></Button>
                <Button variant="success" size="sm" className="me-2"><FaEdit /></Button>
                <Button variant="danger" size="sm"><FaTimes /></Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default JobList;
