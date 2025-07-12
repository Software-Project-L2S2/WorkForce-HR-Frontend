import React from 'react';
import { NavBar } from './Navbar/NavBar';
import './Notification.css';

export const Notification = () => {
  return (
    <div>
      <nav className="nav-container">
        <NavBar />
      </nav>

      <div className="container-fluid mt-3 Notification-page ">
        <div className="row">
          {/* Left Column */}
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-header d-flex justify-content-between">
                <strong>Upcoming Retirement</strong>
                <div>
                  <label className="me-2">Email</label>
                  <input type="radio" name="notify" />
                  <label className="ms-3 me-2">Sms</label>
                  <input type="radio" name="notify" defaultChecked />
                </div>
              </div>
              <div className="card-body">
                <p>2 employees retiring in January 2025</p>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-header">
                <strong>Vacancy Alert</strong>
              </div>
              <div className="card-body">
                <p>Open positions for Software Engineers</p>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-header">
                <strong>Workforce Issue</strong>
              </div>
              <div className="card-body">
                <p>3 critical skill gaps in Project A</p>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-header">
                <strong>Leaves request</strong>
              </div>
              <div className="card-body">
                <p><strong>Reason:</strong> personal</p>
                <p><strong>Total allowed:</strong> 5 | <strong>Available:</strong> 2</p>
                <button className="btn btn-danger me-2">Decline</button>
                <button className="btn btn-success">Approve</button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <strong>Send Announcement to employee</strong>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <input type="radio" name="recipient" defaultChecked className="me-2" />
                  <label className="me-3">All</label>
                  <label className="me-2">Tag role</label>
                  <input type="text" className="form-control" style={{ width: '150px' }} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Note</label>
                  <textarea className="form-control" rows="3"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Notification;
