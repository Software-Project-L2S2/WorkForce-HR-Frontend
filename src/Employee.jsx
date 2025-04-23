import { useState, useEffect } from "react";
import {FiMenu, FiX, FiBell, FiUser, FiLogOut, FiEdit, FiTrash2, FiArrowUp, FiBook, FiStar, FiBriefcase, FiCalendar, FiMail, FiLink} from "react-icons/fi";
import { Link } from "react-router-dom";
import { ProgressBar, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./Employee.css";

const EmployeeProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch("http://localhost:5202/api/employee/1"); 
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setEmployeeData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="employee-profile-container">
      
      <nav className="navbar workforce-navbar">
        <div className="brand-section">
          <button className="menu-button" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <FiX className="menu-icon" /> : <FiMenu className="menu-icon" />}
          </button>

          
          <img 
            src={employeeData.companyLogo} 
            alt="Company Logo" 
            className="company-logo" 
          />
        </div>

        <div className="nav-menu">
          {["Employee", "Projects", "LeaveManagement", "Feedback", "Settings"].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} className="nav-item">
              {item}
            </Link>
          ))}
        </div>

        <div className="nav-controls">
          <FiBell className="nav-icon" />
          <FiUser className="nav-icon" />
          <FiLogOut className="nav-icon" />
        </div>
      </nav>

      
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <h3 className="sidebar-title">Quick Menu</h3>
          <ul className="sidebar-menu">
            {["Settings", "Documents", "Reports", "Help Center"].map((item) => (
              <li key={item} className="menu-item">
                <a href="#" className="menu-link">{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />}

      
      <div className="profile-content">
        <div className="profile-left">
          <section className="employee-details">
            <div className="avatar-section">
              
              <img 
                src={employeeData.profileImage} 
                alt="Profile" 
                className="profile-employee" 
              />
              <button className="edit-avatar-btn">
                <FiEdit className="edit-icon" />
              </button>
            </div>

            <h2 className="designation-title">
              <FiUser className="title-icon" />
              {employeeData.designation}
            </h2>

            <div className="detail-grid">
              {[
                { icon: FiBriefcase, label: "Department", value: employeeData.department },
                { icon: FiUser, label: "Gender", value: employeeData.gender },
                { icon: FiCalendar, label: "Start Date", value: employeeData.startDate.split("T")[0] },
                { icon: FiUser, label: "Age", value: employeeData.age },
                { icon: FiLink, label: "Contact", value: employeeData.contact },
                { icon: FiMail, label: "Email", value: employeeData.email },
              ].map((item, index) => (
                <div key={index} className="detail-item">
                  <item.icon className="detail-icon" />
                  <div>
                    <span className="detail-label">{item.label} - </span>
                    <span className="detail-value">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

           
            <section className="education-section">
              <h2 className="section-title">
                <FiBook className="section-icon" />
                Education Qualification
              </h2>
              <ul className="education-list">
                {employeeData.education.map((edu) => (
                  <li key={edu.educationID}>🎓 {edu.qualification}</li>
                ))}
              </ul>
            </section>
          </section>
        </div>

        
        <div className="profile-right">
          <section className="skills-section">
            <div className="section-header">
              <h2 className="section-title">
                <FiStar className="section-icon" />
                Skills & Levels
              </h2>
              <button className="btn-edit">
                <FiEdit /> Manage Skills
              </button>
            </div>

            <div className="skills-table-container">
              <table className="skills-table">
                <thead>
                  <tr>
                    <th>Skill</th>
                    <th>Description</th>
                    <th>Level</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeData.skills.map((skill) => {
                    const percentage = (skill.level / 5) * 100;
                    return (
                      <tr key={skill.skillID}>
                        <td>{skill.skillName}</td>
                        <td>{skill.description}</td>
                        <td>
                          <div className="level-container">
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip>{percentage}% ({skill.level}/5)</Tooltip>}
                            >
                              <ProgressBar
                                now={percentage}
                                variant="success"
                                className="skill-progress-bar"
                                label={`${skill.level}/5`}
                              />
                            </OverlayTrigger>
                          </div>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn-edit">
                              <FiEdit />
                            </button>
                            <button className="btn-remove">
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="skills-actions">
              <button className="btn-promote">
                <FiArrowUp /> Initiate Promotion
              </button>
              <button className="btn-remove">
                <FiTrash2 /> Remove Selected
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;