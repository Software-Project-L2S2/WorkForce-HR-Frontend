import React from 'react';
import { Card, Row, Col, ListGroup } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Dashboard.css'; // Custom styling for calendar dots/colors

const Dashboard = () => {
  return (
    <div className="p-3 bg-light">
      {/* Top Row: Recently Working Projects */}
      <Row className="mb-3">
        <Col md={12}>
          <Card className="p-2">
            <Card.Title>Recently working Projects</Card.Title>
            <div className="d-flex gap-3 overflow-auto p-2">
              <Card style={{ minWidth: '150px' }}><Card.Body>Project-1</Card.Body></Card>
              <Card style={{ minWidth: '150px' }}><Card.Body>Project-2</Card.Body></Card>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Row: Attendance + Performance + Events */}
      <Row className="mb-3">
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Attendance</Card.Title>
              <Calendar />
              {/* You can customize calendar tileContent to show present/absent/leave/etc. */}
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Performance Overview</Card.Title>
              <Card.Text>
                Janith Madushan <br />
                Software Engineer <br />
                Performance Score: 85% <br />
                Projects Completed: 12 <br />
                Attendance: 95%
              </Card.Text>
              <button className="btn btn-primary">View Details</button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Upcoming Events</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>1. Full Stack Training</ListGroup.Item>
                <ListGroup.Item>2. UI/UX Session</ListGroup.Item>
                <ListGroup.Item>3. Web development for Beginners</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Latest Announcement</Card.Title>
              <Card.Text>
                1 Nov 2024 - 14:54 <br />
                <a href="#">Scheduled System Upgrade</a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Row: Task Management + Project Deadlines */}
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Task Management</Card.Title>
              <div className="d-flex justify-content-between">
                <span>Show: This month</span>
              </div>
              <Card.Text className="mt-2">
                Total Task: 20 <br />
                Completed: 12 <br />
                Incompleted: 4 <br />
                In Progress: 6
              </Card.Text>
              <button className="btn btn-primary">View Details</button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Project Deadlines</Card.Title>
              <Card.Text>
                1. Project 1 <span className="text-danger">Overdue by 5/15/2024</span><br />
                2. Project 2 <span className="text-danger">Overdue by 6/1/2024</span><br />
                3. Project 3 <span className="text-danger">Overdue by 7/15/2024</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
