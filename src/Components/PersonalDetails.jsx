import React, { useState } from "react";
import { Form, Row, Col, Button, Card } from "react-bootstrap";

const PersonalDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({
    name: "Janith Madushan",
    gender: "Male",
    age: "26",
    startDate: "2019/10/15",
    department: "Design & Marketing",
    jobTitle: "UI / UX Designer",
    jobCategory: "Full time",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <Card className="p-4">
      <div className="d-flex justify-content-between align-items-center">
        <h4>{isEditing ? 
          <Form.Control type="text" value={employeeDetails.name} name="name" onChange={handleChange} /> : 
          employeeDetails.name}
        </h4>
        <Button variant="outline-primary" onClick={toggleEdit}>
          {isEditing ? "Save Changes" : "Edit"}
        </Button>
      </div>

      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>Gender:</Form.Label>
          <Col sm={9}>
            {isEditing ? (
              <Form.Control as="select" value={employeeDetails.gender} name="gender" onChange={handleChange}>
                <option>Male</option>
                <option>Female</option>
              </Form.Control>
            ) : (
              <Form.Control plaintext readOnly defaultValue={employeeDetails.gender} />
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>Age:</Form.Label>
          <Col sm={9}>
            {isEditing ? (
              <Form.Control type="number" value={employeeDetails.age} name="age" onChange={handleChange} />
            ) : (
              <Form.Control plaintext readOnly defaultValue={employeeDetails.age} />
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>Start Date:</Form.Label>
          <Col sm={9}>
            {isEditing ? (
              <Form.Control type="date" value={employeeDetails.startDate} name="startDate" onChange={handleChange} />
            ) : (
              <Form.Control plaintext readOnly defaultValue={employeeDetails.startDate} />
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>Department:</Form.Label>
          <Col sm={9}>
            {isEditing ? (
              <Form.Control type="text" value={employeeDetails.department} name="department" onChange={handleChange} />
            ) : (
              <Form.Control plaintext readOnly defaultValue={employeeDetails.department} />
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>Job Title:</Form.Label>
          <Col sm={9}>
            {isEditing ? (
              <Form.Control type="text" value={employeeDetails.jobTitle} name="jobTitle" onChange={handleChange} />
            ) : (
              <Form.Control plaintext readOnly defaultValue={employeeDetails.jobTitle} />
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>Job Category:</Form.Label>
          <Col sm={9}>
            {isEditing ? (
              <Form.Control type="text" value={employeeDetails.jobCategory} name="jobCategory" onChange={handleChange} />
            ) : (
              <Form.Control plaintext readOnly defaultValue={employeeDetails.jobCategory} />
            )}
          </Col>
        </Form.Group>
      </Form>
    </Card>
  );
};

export default PersonalDetails;
