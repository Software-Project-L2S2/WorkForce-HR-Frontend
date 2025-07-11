import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password must match.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Password changed successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#f0f4f8" }}>
      <Card className="p-4 shadow-lg border-0 rounded-3" style={{ width: "380px", background: "#fff" }}>
        <h4 className="text-center mb-3 fw-bold text-dark">Change Password</h4>
        
        {error && <p className="text-danger text-center fw-semibold">{error}</p>}
        {success && <p className="text-success text-center fw-semibold">{success}</p>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Old Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="p-2 border rounded-3"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="p-2 border rounded-3"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 border rounded-3"
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="w-100 fw-bold p-2 rounded-3 shadow-sm"
            style={{ backgroundColor: "#0056b3", border: "none" }}
          >
            Change Password
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default ChangePassword;
