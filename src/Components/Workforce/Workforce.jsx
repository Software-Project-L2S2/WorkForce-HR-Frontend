import React from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, ListGroup, Breadcrumb, Card } from "react-bootstrap";
import PersonalDetails from "./PersonalDetails";
import ContactDetails from "./ContactDetails";
import EducationDetails from "./EducationDetails";
import JobDetails from "./JobDetails";

const WorkforceDetails = () => {
  const location = useLocation(); // Get current route
  const navigate = useNavigate(); // For manual navigation

  // Mapping route paths to Breadcrumb names
  const breadcrumbMap = {
    "/workforce": "Personal Details", // Default breadcrumb
    "/workforce/personal": "Personal Details",
    "/workforce/contact": "Contact Details",
    "/workforce/education": "Education Qualifications",
    "/workforce/job": "Job Details",
  };

  return (
    <Container fluid className="p-4 bg-light">
      {/* Dynamic Breadcrumb */}
      <div className="p-3 bg-white text-dark rounded mb-3 shadow-sm">
        <Breadcrumb className="mb-0">
          <Breadcrumb.Item onClick={() => navigate("/Workforce", { replace: true })} style={{ cursor: "pointer" }}>
            Workforce
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{breadcrumbMap[location.pathname] || "Details"}</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Row className="mt-3">
        {/* Sidebar */}
        <Col md={3} className="p-3">
          <ListGroup>
            <ListGroup.Item action as={Link} to="/workforce/personal" className="text-dark">
              Personal Details
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="/workforce/contact" className="text-dark">
              Contact Details
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="/workforce/education" className="text-dark">
              Education Qualifications
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="/workforce/job" className="text-dark">
              Job Details
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Main Content */}
        <Col md={9}>
          <Card className="p-4 shadow-sm">
            <Routes>
              <Route index element={<PersonalDetails />} /> {/* Default Route */}
              <Route path="personal" element={<PersonalDetails />} />
              <Route path="contact" element={<ContactDetails />} />
              <Route path="education" element={<EducationDetails />} />
              <Route path="job" element={<JobDetails />} />
            </Routes>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WorkforceDetails;
