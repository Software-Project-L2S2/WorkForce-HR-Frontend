import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";


function NavBar() {
  return (
    <Navbar
      bg="white"
      expand="lg"
      className="p-3 shadow-sm"
      style={{ borderRadius: "0" }} // Remove rounded corners
    >
      <Container fluid>
        {/* No logo here */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Dashboard" className="text-dark mx-3">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/Workforce" className="text-dark mx-3">
              Workforce
            </Nav.Link>
            <NavDropdown title="Requests" id="requests-dropdown" className="text-dark mx-3">
              <NavDropdown.Item as={Link} to="/Requests/LeaveRequests" className="text-dark">
                Leave Requests
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Requests/TrainingProgram" className="text-dark">
                Training Program
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Requests/Promotion" className="text-dark">
                Promotion
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Requests/Transfer" className="text-dark">
                Transfer/Exit
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/Feedback" className="text-dark mx-3">
              Feedback
            </Nav.Link>
            <Nav.Link as={Link} to="/Setting" className="text-dark mx-3">
              Settings
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/Notification" className="text-dark mx-3">
              <IoMdNotificationsOutline size={25} />
            </Nav.Link>
            <Nav.Link as={Link} to="/Message" className="text-dark mx-3">
              <FiMessageSquare size={25} />
            </Nav.Link>
            <Nav.Link as={Link} to="/Profile" className="text-dark mx-3">
              <FaUserCircle size={25} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;