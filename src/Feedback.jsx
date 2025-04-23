import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiBell, FiUser, FiLogOut } from "react-icons/fi";
import { Link } from 'react-router-dom';
import './Feedback.css';

const FeedbackPage = () => {
  const feedbacks = [
    { name: "Anonymous", role: "Facilities", date: "15 Jan 2025", note: "Fan are not working in office room" },
    { name: "Jane Smith", role: "Management", date: "15 Jan 2025", note: "Management is not working correct way" },
    { name: "Anonymous", role: "Facilities", date: "15 Jan 2025", note: "Fan are not working in office room" },
    { name: "Anonymous", role: "Facilities", date: "15 Jan 2025", note: "Fan are not working in office room" },
  ];
  return (
    <div className="container-fluid workforce-container">
      <nav className="navbar workforce-navbar fixed-top">
        <div className="brand-section">
        <img src="/images/wp-logo.png" alt="Company Logo" className="company-logo" />
          <div className="nav-menu">
            {["Employee", "Projects", "LeaveManagement", "Feedback", "Settings"].map((item) => (
              <Link key={item} to={`/${item.toLowerCase()}`} className="nav-item">
              {item}
            </Link>
            ))}
          </div>
        </div>
        
        <div className="nav-controls">
          <FiBell className="nav-icon" />
          <FiUser className="nav-icon" />
          <FiLogOut className="nav-icon" />
        </div>
      </nav>

      <div className="container mt-5 pt-5">
        <h4 className="mb-3 fw-bold">Feedback</h4>
        <div className="row">
          {feedbacks.map((item, index) => (
            <div key={index} className="col-md-3">
              <div className="card p-3 shadow-sm">
                <h5 className="fw-bold">{item.name}</h5>
                <p className="text-muted">{item.role}</p>
                <p className="text-muted">Date: {item.date}</p>
                <p><strong>Note:</strong> {item.note}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-light mt-3 shadow-sm">Clear</button>
      </div>
    </div>
  );
};

export default FeedbackPage;
