import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Form, Button, Card, InputGroup } from 'react-bootstrap';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className="container-fluid register vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        {/* Left Panel */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center left-panel position-relative">
  <div className="image-container">
    <img src="/Login.jpg" alt="background" className="img-fluid" />
  </div>
  <div className="position-relative z-2 d-flex flex-column justify-content-center align-items-center h-100 w-100">
  <h1 className="text-center p-3 mt-0"> {/* Reduced padding and removed margin-top */}
      Welcome!
    </h1>
    <h1 className="text-center p-3 mb-0"> {/* Reduced padding and removed margin-bottom */}
      Workforce Planning and Optimization System
    </h1>
   
  </div>
</div>

        {/* Right Panel - Form Section */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <Card className="p-5 shadow-lg form-container">
            <h2 className="text-dark text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>E-mail Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter E-mail Address"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="Enter Password"
                    required
                  />
                  <InputGroup.Text onClick={handlePasswordVisibility} className="password-toggle border-left-0" style={{ cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye}   className="eye-icon" />
                  </InputGroup.Text>
                
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label={
                    <>
                      I agree to all the{' '}
                      <span className="text-primary">Terms, Privacy Policy</span>
                    </>
                  }
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>

              <div className="text-center mt-3">
                Need an Account?{' '}
                <a href="/signup" className="text-primary fw-bold">
                  Sign Up
                </a>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};
new Promise((resolve, reject) => {
  
})