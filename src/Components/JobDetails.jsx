import React, { useState } from "react";
import { Button, Form, Row, Col, ListGroup, Alert } from "react-bootstrap";

const JobDetails = () => {
  const [files, setFiles] = useState({
    offerLetter: null,
    birthCertificate: null,
    guarantorForm: null,
    degreeCertificate: null,
  });

  const [uploadedFiles, setUploadedFiles] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleFileChange = (e, type) => {
    setFiles({ ...files, [type]: e.target.files[0] });
  };

  const handleUpload = (type) => {
    if (files[type]) {
      setUploadedFiles({ ...uploadedFiles, [type]: files[type].name });
      setFiles({ ...files, [type]: null });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  };

  return (
    <div className="p-4 bg-light rounded shadow">
      <h4 className="mb-3">📄 Job Details / Upload Documents</h4>

      {showAlert && <Alert variant="success">✅ File uploaded successfully!</Alert>}

      {["offerLetter", "birthCertificate", "guarantorForm", "degreeCertificate"].map((type, index) => (
        <Row className="mb-3 align-items-center" key={index}>
          <Col md={6}>
            <Form.Label className="fw-bold">
              {type === "offerLetter" && "Upload Offer Letter"}
              {type === "birthCertificate" && "Upload Birth Certificate"}
              {type === "guarantorForm" && "Upload Guarantor’s Form"}
              {type === "degreeCertificate" && "Upload Degree Certificate"}
            </Form.Label>
          </Col>
          <Col md={4}>
            <Form.Control type="file" onChange={(e) => handleFileChange(e, type)} />
          </Col>
          <Col md={2}>
            <Button variant="warning" disabled={!files[type]} onClick={() => handleUpload(type)}>
              📤 Upload
            </Button>
          </Col>
        </Row>
      ))}

      <div className="d-flex justify-content-between mt-4">
        <Button variant="primary">📁 Upload Documents</Button>
        <Button variant="dark" onClick={() => setShowAlert(true)}>👀 View Documents</Button>
      </div>

      {Object.keys(uploadedFiles).length > 0 && (
        <ListGroup className="mt-3">
          <h5>📂 Uploaded Documents:</h5>
          {Object.entries(uploadedFiles).map(([key, filename]) => (
            <ListGroup.Item key={key}>✅ {filename}</ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default JobDetails;
