import React from "react";
import { Card, Table } from "react-bootstrap";
import { FaFilePdf } from "react-icons/fa";

const ApplicantDetails = () => {
  return (
    <Card className="m-3">
      <Card.Body>
        <Card.Title>Applicant Details</Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Skills</th>
              <th>Type</th>
              <th>Document</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Janith</td>
              <td>2024/12/30</td>
              <td>Java, Backend</td>
              <td>External</td>
              <td><FaFilePdf /></td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ApplicantDetails;
