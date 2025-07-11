import { useState, useEffect } from "react";
import {FiMenu, FiX, FiBell, FiUser, FiLogOut, FiEdit, FiTrash2, FiArrowUp, FiBook, FiStar, FiBriefcase, FiCalendar, FiMail, FiLink} from "react-icons/fi";
import { Link } from "react-router-dom";
import { ProgressBar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { NavBar } from "../Navbar/NavBar";
import "./User.css";

// Mock data for preview
const mockEmployeeData = {
  companyLogo: "https://via.placeholder.com/150x50.png?text=Company+Logo",
  profileImage: "https://via.placeholder.com/200x200.png?text=Employee+Photo",
  designation: "Senior Software Engineer",
  department: "Technology",
  gender: "Male",
  startDate: "2020-01-15T00:00:00",
  age: 32,
  contact: "+1 555-123-4567",
  email: "john.doe@company.com",
  education: [
    { educationID: 1, qualification: "Bachelor's in Computer Science" },
    { educationID: 2, qualification: "Master's in Software Engineering" }
  ],
  skills: [
    { skillID: 1, skillName: "React", description: "Frontend development", level: 4 },
    { skillID: 2, skillName: "Node.js", description: "Backend development", level: 3 },
    { skillID: 3, skillName: "SQL", description: "Database management", level: 4 }
  ]
};

export const User = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState(mockEmployeeData); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="employee-profile-container">
         <NavBar />
      

      <div className="profile-content">
        <div className="profile-left">
          <section className="employee-details">
            <div className="avatar-section">
              <img 
                src={employeeData?.profileImage} 
                alt="Profile" 
                className="profile-employee" 
              />
              <button className="edit-avatar-btn">
                <FiEdit className="edit-icon" />
              </button>
            </div>

            <h2 className="designation-title">
              <FiUser className="title-icon" />
              {employeeData?.designation || "Designation Not Available"}
            </h2>

            <div className="detail-grid">
              {[
                { icon: FiBriefcase, label: "Department", value: employeeData?.department },
                { icon: FiUser, label: "Gender", value: employeeData?.gender },
                { icon: FiCalendar, label: "Start Date", value: employeeData?.startDate?.split("T")[0] },
                { icon: FiUser, label: "Age", value: employeeData?.age },
                { icon: FiLink, label: "Contact", value: employeeData?.contact },
                { icon: FiMail, label: "Email", value: employeeData?.email },
              ].map((item, index) => (
                <div key={index} className="detail-item">
                  <item.icon className="detail-icon" />
                  <div>
                    <span className="detail-label">{item.label} - </span>
                    <span className="detail-value">
                      {item.value || "N/A"}
                    </span>
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
                {(employeeData?.education || []).map((edu) => (
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
                  {(employeeData?.skills || []).map((skill) => {
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

export default User;