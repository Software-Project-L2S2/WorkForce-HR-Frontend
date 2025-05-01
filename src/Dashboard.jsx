import React from "react";
import { Link } from "react-router-dom";
import {
  FiUser,
  FiArrowRight,
  FiBell,
  FiBook,
  FiLogOut,
} from "react-icons/fi";
import "./Dashboard.css";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Workforce Planning", path: "/Workforce Planning" },
  { label: "Employee", path: "/Employee" },
  { label: "Settings", path: "/Settings" },
];

const Dashboard = () => (
  <div className="dashboard-page">
    {/* Header */}
    <header className="dashboard-header">
      <div className="header-inner">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <nav aria-label="Main navigation">
          <ul className="dashboard-nav">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={`nav-link${item.label === "Dashboard" ? " active" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-icons">
          <FiBell className="header-icon" aria-label="Notifications" />
          <FiUser className="header-icon" aria-label="Profile" />
          <FiLogOut className="header-icon" aria-label="Logout" />
        </div>
      </div>
    </header>

    {/* Main Content */}
    <main className="dashboard-main">
      <div className="dashboard-grid">
        {/* Employees */}
        <section className="dashboard-card card-employees" aria-label="Total Employees">
          <div className="card-header">
            <FiUser className="card-icon" />
            <div>
              <div className="card-title">1200</div>
              <div className="card-subtitle">Total Employees</div>
            </div>
            <FiArrowRight className="arrow-icon" />
          </div>
          <div className="bar-chart">
            <div className="bar" style={{ height: "70%" }}></div>
            <div className="bar" style={{ height: "35%" }}></div>
            <div className="bar" style={{ height: "15%" }}></div>
            <div className="bar" style={{ height: "60%" }}></div>
          </div>
          <div className="bar-labels">
            <span>IT</span>
            <span>Design</span>
            <span>Management</span>
            <span>Finance</span>
          </div>
        </section>

        {/* Projects */}
        <section className="dashboard-card card-projects" aria-label="Projects">
          <div className="card-header">
            <FiBook className="card-icon" />
            <div className="card-title" style={{ fontSize: "1.3rem" }}>Projects</div>
            <FiArrowRight className="arrow-icon" />
          </div>
          <div className="projects-row">
            <div className="project-box">
              <span className="project-label">Active Projects</span>
              <span className="project-count">5</span>
            </div>
            <div className="project-box">
              <span className="project-label">Upcoming Projects</span>
              <span className="project-count">6</span>
            </div>
          </div>
        </section>

        {/* Announcement */}
        <section className="dashboard-card card-announcement" aria-label="Announcement">
          <div className="announcement-header">
            <span className="announcement-title">Announcement</span>
            <span className="announcement-count">10</span>
          </div>
          <div className="vacancy-alert">
            <div>
              <strong>Vacancy Alert</strong>
              <div className="vacancy-desc">Open positions for Software Engineers</div>
            </div>
            <FiBell className="vacancy-icon" />
          </div>
        </section>

        {/* Feedback */}
        <section className="dashboard-card card-feedback" aria-label="New Feedback">
          <div className="feedback-header">
            <span className="feedback-title">New Feedback</span>
            <span className="feedback-count">05</span>
            <button className="btn-create">Create</button>
          </div>
          <div className="feedback-box">
            <div className="feedback-author">Anonymous</div>
            <div className="feedback-date">Date: 15 Jan 2025</div>
            <div className="feedback-note">
              Note: Tea set not working in office room
            </div>
            <button className="btn-view">View</button>
          </div>
        </section>

        {/* Leave Requests */}
        <section className="dashboard-card card-leave" aria-label="Pending Leave Requests">
          <div className="leave-header">
            <span className="leave-title">Pending Leave Requests</span>
            <span className="leave-count">11</span>
            <button className="btn-leave">View</button>
          </div>
        </section>
      </div>
    </main>
  </div>
);

export default Dashboard;
