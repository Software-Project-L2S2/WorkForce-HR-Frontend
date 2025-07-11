import React, { useState, useEffect } from "react";
import { NavBar } from "../Navbar/NavBar";
// If you choose Axios, import it:
// import axios from 'axios';

export const SkillGap = () => {
  // State for pagination (keep these)
  const [projectsLimit, setProjectsLimit] = useState(3);
  const [employeesLimit, setEmployeesLimit] = useState(5);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllEmployees, setShowAllEmployees] = useState(false);

  // State to store data fetched from the backend
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [errorProjects, setErrorProjects] = useState(null);
  const [errorEmployees, setErrorEmployees] = useState(null);

  // Base URL for your backend API
  const API_BASE_URL = "http://localhost:5164/api"; 

  // Function to fetch projects
  const fetchProjects = async () => {
    setLoadingProjects(true);
    setErrorProjects(null);
    try {
      const response = await fetch(`${API_BASE_URL}/projects`); // Adjust endpoint as needed
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setErrorProjects("Failed to load projects. Please try again later.");
    } finally {
      setLoadingProjects(false);
    }
  };

  // Function to fetch employees
  const fetchEmployees = async () => {
    setLoadingEmployees(true);
    setErrorEmployees(null);
    try {
      const response = await fetch(`${API_BASE_URL}/employees`); // Adjust endpoint as needed
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setErrorEmployees("Failed to load employee data. Please try again later.");
    } finally {
      setLoadingEmployees(false);
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchProjects();
    fetchEmployees();
  }, []); // Empty dependency array means this runs once on component mount

  const handleShowMoreProjects = () => {
    if (showAllProjects) {
      setProjectsLimit(3);
      setShowAllProjects(false);
    } else {
      setProjectsLimit(projects.length);
      setShowAllProjects(true);
    }
  };

  const handleShowMoreEmployees = () => {
    if (showAllEmployees) {
      setEmployeesLimit(5);
      setShowAllEmployees(false);
    } else {
      setEmployeesLimit(employees.length);
      setShowAllEmployees(true);
    }
  };

  return (
    <div>
      <NavBar />

      {/* Main Container with proper navbar spacing */}
      <div className="container-fluid" style={{ paddingTop: "100px", minHeight: "100vh" }}>
        {/* Page Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="mb-1">Skill Gap Analysis</h2>
                <p className="text-muted mb-0">
                  Monitor project requirements and employee skills alignment
                </p>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-primary">
                  <i className="bi bi-funnel me-2"></i> Filter
                </button>
                <button className="btn btn-success">
                  <i className="bi bi-download me-2"></i> Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Gap Table - Projects */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white border-bottom-0 py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">Project Skill Requirements</h5>
                    <small className="text-muted">
                      {loadingProjects ? (
                        "Loading..."
                      ) : errorProjects ? (
                        <span className="text-danger">{errorProjects}</span>
                      ) : (
                        `Showing ${Math.min(projectsLimit, projects.length)} of ${projects.length} projects`
                      )}
                    </small>
                  </div>
                  {/* Only show critical gaps if data is loaded and no errors */}
                  {!loadingProjects && !errorProjects && (
                    <span className="badge bg-primary-subtle text-primary px-3 py-2">
                      {projects.filter((p) => p.available === 0).length}{" "}
                      Critical Gaps
                    </span>
                  )}
                </div>
              </div>

              <div className="card-body p-0">
                {loadingProjects ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading projects...</span>
                    </div>
                  </div>
                ) : errorProjects ? (
                  <div className="alert alert-danger mx-3 my-4" role="alert">
                    {errorProjects}
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="border-0 py-3 ps-4">Project Name</th>
                          <th className="border-0 py-3">Required Skills</th>
                          <th className="border-0 py-3 text-center">Available</th>
                          <th className="border-0 py-3">Skills Needed</th>
                          <th className="border-0 py-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.slice(0, projectsLimit).map((project, index) => (
                          <tr key={index} className="border-bottom">
                            <td className="py-3 ps-4">
                              <div className="fw-semibold text-dark">
                                {project.name}
                              </div>
                            </td>
                            <td className="py-3">
                              <div className="d-flex flex-wrap gap-1">
                                {project.skills && project.skills.split(", ").map((skill, i) => (
                                  <span
                                    key={i}
                                    className="badge bg-light text-dark border"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-3 text-center">
                              <span
                                className={`badge ${
                                  project.available === 0
                                    ? "bg-danger"
                                    : project.available < 3
                                    ? "bg-warning"
                                    : "bg-success"
                                }`}
                              >
                                {project.available}
                              </span>
                            </td>
                            <td className="py-3">
                              <small className="text-muted">
                                {project.needed}
                              </small>
                            </td>
                            <td className="py-3 text-center">
                              {project.available === 0 ? (
                                <span className="badge bg-danger-subtle text-danger">
                                  Critical
                                </span>
                              ) : project.available < 3 ? (
                                <span className="badge bg-warning-subtle text-warning">
                                  Low
                                </span>
                              ) : (
                                <span className="badge bg-success-subtle text-success">
                                  Good
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Show More/Less for Projects */}
                {!loadingProjects && !errorProjects && projects.length > 3 && (
                  <div className="card-footer bg-white border-0 py-3">
                    <div className="text-center">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={handleShowMoreProjects}
                      >
                        {showAllProjects ? (
                          <>
                            <i className="bi bi-chevron-up me-2"></i>
                            Show Less Projects
                          </>
                        ) : (
                          <>
                            <i className="bi bi-chevron-down me-2"></i>
                            Show All {projects.length} Projects
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Skills and Levels Table - Employees */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white border-bottom-0 py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">Employee Skills & Levels</h5>
                    <small className="text-muted">
                      {loadingEmployees ? (
                        "Loading..."
                      ) : errorEmployees ? (
                        <span className="text-danger">{errorEmployees}</span>
                      ) : (
                        `Showing ${Math.min(employeesLimit, employees.length)} of ${employees.length} employees`
                      )}
                    </small>
                  </div>
                </div>
              </div>

              <div className="card-body p-0">
                {loadingEmployees ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading employees...</span>
                    </div>
                  </div>
                ) : errorEmployees ? (
                  <div className="alert alert-danger mx-3 my-4" role="alert">
                    {errorEmployees}
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="border-0 py-3 ps-4">Employee</th>
                          <th className="border-0 py-3">
                            Skills & Proficiency
                          </th>
                          <th className="border-0 py-3">Role</th>
                          <th className="border-0 py-3">Department</th>
                          <th className="border-0 py-3 text-center">
                            Last Updated
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.slice(0, employeesLimit).map((employee, index) => (
                          <tr key={index} className="border-bottom">
                            <td className="py-3 ps-4">
                              <div className="d-flex align-items-center">
                                <div
                                  className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                  }}
                                >
                                  {employee.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="fw-semibold text-dark">
                                    {employee.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3">
                              <div className="d-flex flex-wrap gap-1">
                                {/* Ensure employee.skills exists before splitting */}
                                {employee.skills && employee.skills.split(" ").map((skill, i) => {
                                  const match = skill.match(/(.+)\((\d+)\)/);
                                  if (match) {
                                    const [, skillName, level] = match;
                                    const levelNum = parseInt(level);
                                    const badgeClass =
                                      levelNum >= 4
                                        ? "bg-success"
                                        : levelNum >= 3
                                        ? "bg-warning"
                                        : "bg-secondary";
                                    return (
                                      <span
                                        key={i}
                                        className={`badge ${badgeClass} text-white`}
                                      >
                                        {skillName} L{level}
                                      </span>
                                    );
                                  }
                                  return null;
                                }).filter(Boolean)}
                              </div>
                            </td>
                            <td className="py-3">
                              <span className="text-dark">{employee.role}</span>
                            </td>
                            <td className="py-3">
                              <span className="badge bg-light text-dark border">
                                {employee.department}
                              </span>
                            </td>
                            <td className="py-3 text-center">
                              <small className="text-muted">
                                {employee.lastUpdate}
                              </small>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Show More/Less for Employees */}
                {!loadingEmployees && !errorEmployees && employees.length > 5 && (
                  <div className="card-footer bg-white border-0 py-3">
                    <div className="text-center">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={handleShowMoreEmployees}
                      >
                        {showAllEmployees ? (
                          <>
                            <i className="bi bi-chevron-up me-2"></i>
                            Show Less Employees
                          </>
                        ) : (
                          <>
                            <i className="bi bi-chevron-down me-2"></i>
                            Show All {employees.length} Employees
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};