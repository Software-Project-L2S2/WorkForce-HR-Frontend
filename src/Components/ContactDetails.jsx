import React, { useState } from "react";
import { Form, Row, Col, Button, Card } from "react-bootstrap";

const ContactDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [contactDetails, setContactDetails] = useState({
    phone1: "Phone Number 1",
    phone2: "Phone Number 2",
    email: "johndoe@gmail.com",
    city: "Phone Number 1",
    address: "Alembank, Addia ababa",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <Card className="p-4">
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Label>Phone Number 1</Form.Label>
            {isEditing ? (
              <Form.Control type="text" name="phone1" value={contactDetails.phone1} onChange={handleChange} />
            ) : (
              <Form.Control plaintext readOnly defaultValue={contactDetails.phone1} className="border p-2" />
            )}
          </Col>
          <Col>
            <Form.Label>Phone Number 2</Form.Label>
            {isEditing ? (
              <Form.Control type="text" name="phone2" value={contactDetails.phone2} onChange={handleChange} />
            ) : (
              <Form.Control plaintext readOnly defaultValue={contactDetails.phone2} className="border p-2" />
            )}
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>E-mail Address</Form.Label>
          {isEditing ? (
            <Form.Control type="email" name="email" value={contactDetails.email} onChange={handleChange} />
          ) : (
            <Form.Control plaintext readOnly defaultValue={contactDetails.email} className="border p-2" />
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City of residence</Form.Label>
          {isEditing ? (
            <Form.Control type="text" name="city" value={contactDetails.city} onChange={handleChange} />
          ) : (
            <Form.Control plaintext readOnly defaultValue={contactDetails.city} className="border p-2" />
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Residential Address</Form.Label>
          {isEditing ? (
            <Form.Control as="textarea" name="address" rows={2} value={contactDetails.address} onChange={handleChange} />
          ) : (
            <div className="border p-3 bg-light">
              <strong>{contactDetails.address}</strong>
            </div>
          )}
        </Form.Group>

        <Button variant="success" className="w-100" onClick={toggleEdit}>
          {isEditing ? "Save Changes" : "Update"}
        </Button>
      </Form>
    </Card>
  );
};

export default ContactDetails;
