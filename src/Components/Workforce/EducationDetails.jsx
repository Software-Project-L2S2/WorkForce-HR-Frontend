import React, { useState } from "react";
import { Form, Button, Row, Col, Alert, Modal } from "react-bootstrap";

const EducationDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  
  const [education, setEducation] = useState({
    institution: "",
    department: "",
    course: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducation({ ...education, [name]: value });
  };

  const handleUpdate = () => {
    setIsEditing(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000); // Hide notification after 2 sec
  };

  return (
    <div className="p-4">
      <h3 className="mb-3">📚 Academic Records</h3>

      {showNotification && <Alert variant="success">✅ Updated Successfully!</Alert>}

      {!isEditing && showDetails ? (
        <div className="border p-3 rounded shadow-sm bg-light">
          <p><strong>Institution:</strong> {education.institution}</p>
          <p><strong>Department:</strong> {education.department}</p>
          <p><strong>Course:</strong> {education.course}</p>
          <p><strong>Location:</strong> {education.location}</p>
          <p><strong>Start Date:</strong> {education.startDate}</p>
          <p><strong>End Date:</strong> {education.endDate}</p>
          <p><strong>Description:</strong> {education.description}</p>
        </div>
      ) : (
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}> Name of Institution:</Form.Label>
            <Col sm={9}>
              <Form.Control type="text" name="institution" value={education.institution} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Department:</Form.Label>
            <Col sm={9}>
              <Form.Control type="text" name="department" value={education.department} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}> Course:</Form.Label>
            <Col sm={9}>
              <Form.Control type="text" name="course" value={education.course} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}> Location:</Form.Label>
            <Col sm={9}>
              <Form.Control type="text" name="location" value={education.location} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Start Date:</Form.Label>
            <Col sm={4}>
              <Form.Control type="date" name="startDate" value={education.startDate} onChange={handleChange} />
            </Col>
            <Form.Label column sm={1}></Form.Label>
            <Form.Label column sm={2}> End Date:</Form.Label>
            <Col sm={4}>
              <Form.Control type="date" name="endDate" value={education.endDate} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label> Description:</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={education.description} onChange={handleChange} />
          </Form.Group>
        </Form>
      )}

      <div className="d-flex justify-content-between">
        <Button variant="primary" onClick={() => setShowDetails(true)}> View</Button>
        <Button variant="success" onClick={() => setIsEditing(true)}>Update</Button>
      </div>

      {isEditing && (
        <Modal show={isEditing} onHide={() => setIsEditing(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Update Education Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label> Name of Institution</Form.Label>
                <Form.Control type="text" name="institution" value={education.institution} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label> Department</Form.Label>
                <Form.Control type="text" name="department" value={education.department} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label> Course</Form.Label>
                <Form.Control type="text" name="course" value={education.course} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label> Location</Form.Label>
                <Form.Control type="text" name="location" value={education.location} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" name="startDate" value={education.startDate} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label> End Date</Form.Label>
                <Form.Control type="date" name="endDate" value={education.endDate} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label> Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={education.description} onChange={handleChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsEditing(false)}> Cancel</Button>
            <Button variant="success" onClick={handleUpdate}> Save</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default EducationDetails;
