import React from "react";
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <nav className="navbar workforce-navbar fixed-top bg-white shadow">
      <div className="container-fluid">
        
        <div className="navbar-brand">
          <Menu />
        </div>
          
          <div className="nav-menu-center">
  <Link to="/hrdashboard" className="nav-item">Dashboard</Link>
  <Link to="/workforce" className="nav-item">Workforce</Link>
  <Link to="/EmployeeMangment" className="nav-item">Employee Directory</Link>
  <Link to="/projects" className="nav-item">Projects</Link>
</div>

        {/* Right-aligned Controls */}
        <div className="nav-controls">
          {/* Notification button */}
          <Link to="/notification" className="btn btn-light rounded-circle me-2 shadow-sm d-flex align-items-center justify-content-center"
            style={{ width: '40px', height: '40px' }}
            data-bs-toggle="tooltip"
            title="Notifications">
            <i className="bi bi-bell fs-5 text-secondary"></i>
          </Link>

          {/* Profile button */}
          <Link to="/user" className="btn btn-light rounded-circle me-2 shadow-sm d-flex align-items-center justify-content-center"
            style={{ width: '40px', height: '40px' }}
            data-bs-toggle="tooltip"
            title="Profile">
            <i className="bi bi-person-fill fs-5 text-secondary"></i>
          </Link>

          {/* Logout button */}
          <button className="btn btn-danger rounded-circle shadow-sm d-flex align-items-center justify-content-center"
            style={{ width: '40px', height: '40px' }}
            data-bs-toggle="tooltip"
            title="Logout">
            <i className="bi bi-box-arrow-right fs-5 text-white"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};