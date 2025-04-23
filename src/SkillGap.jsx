import React from "react";
//import { Menu } from "./Menu/Menu";
import "./SkillGap.css";

export const SkillGap = () => {
  // Sample data - replace with your actual data source
  const projects = [
    {
      name: "Project A",
      skills: "Python, Data Analysis",
      available: 8,
      needed: "Python 2, Data Analysis 3"
    },
    {
      name: "Project B",
      skills: "JavaScript, React, Node.js",
      available: 0,
      needed: "AWS: 5, Docker: 4"
    },
    {
      name: "Project C",
      skills: "AWS, Cloud Computing, Docker",
      available: 3,
      needed: "AWS: 1, Docker: 1"
    }
  ];

  const employees = [
    {
      name: "Justin",
      skills: "Programming(5) Communication(3)",
      role: "Project Manager",
      department: "IT",
      lastUpdate: "28/04/2024"
    },
    // Add other employees here
  ];

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
       

        {/* Main Content */}
        <div className="col-md-9 bg-light p-4">
          {/* Navbar */}
          <nav className="navbar bg-white mb-4 shadow-sm">
            <div className="container-fluid">
              <span className="navbar-brand">Skill Gap Analysis</span>
              <div className="d-flex align-items-center">
             <div className="position-relative">
                  <img 
                    src="dp-10.png" 
                    alt="Profile" 
                    className="rounded-circle" 
                    width="40" 
                    height="40"
                  />
                  <span className="badge bg-danger position-absolute top-0 end-0">13</span>
                </div>
              </div>
            </div>
          </nav>

          {/* Skill Gap Table */}
          <div className="card mb-4 shadow">
            <div className="card-header bg-white">
              <h5 className="mb-0">Skill Gap</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>Required Skills</th>
                      <th>Available Employees</th>
                      <th>Employees Needed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project, index) => (
                      <tr key={index}>
                        <td>{project.name}</td>
                        <td>{project.skills}</td>
                        <td>{project.available}</td>
                        <td>{project.needed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Skills & Levels Table */}
          <div className="card shadow">
            <div className="card-header bg-white">
              <h5 className="mb-0">Skills and Levels</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Skills & Level</th>
                      <th>Role</th>
                      <th>Department</th>
                      <th>Last Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee, index) => (
                      <tr key={index}>
                        <td>{employee.name}</td>
                        <td>{employee.skills}</td>
                        <td>{employee.role}</td>
                        <td>{employee.department}</td>
                        <td>{employee.lastUpdate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};