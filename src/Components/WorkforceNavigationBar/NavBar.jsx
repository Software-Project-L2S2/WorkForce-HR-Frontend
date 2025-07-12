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
            <Nav.Link as={Link} to="/Workforce/Dashboard" className="text-dark mx-3">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/Workforce/Workforce" className="text-dark mx-3">
              Workforce
            </Nav.Link>
            <NavDropdown title="Requests" id="requests-dropdown" className="text-dark mx-3">
              <NavDropdown.Item as={Link} to="Workforce/requests/leaverequests" className="text-dark">
                Leave Requests
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="Workforce/requests/trainingProgram" className="text-dark">
                Training Program
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="Workforce/requests/promotion" className="text-dark">
                Promotion
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="Workforce/requests/transfer" className="text-dark">
                Transfer/Exit
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/Workforce/Feedback" className="text-dark mx-3">
              Feedback
            </Nav.Link>
            <Nav.Link as={Link} to="/Workforce/Setting" className="text-dark mx-3">
              Settings
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/Workforce/Notification" className="text-dark mx-3">
              <IoMdNotificationsOutline size={25} />
            </Nav.Link>
            <Nav.Link as={Link} to="/Workforce/Message" className="text-dark mx-3">
              <FiMessageSquare size={25} />
            </Nav.Link>
            <NavDropdown
              align="end"
              title={<FaUserCircle size={22} />}
              id="profile-dropdown"
              className="text-dark mx-2"
            >
              <NavDropdown.Item as={Link} to="/Profile">View Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/Logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;