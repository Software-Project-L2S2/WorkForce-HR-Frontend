import React, { useState, useEffect } from "react";
import { NavBar } from "./Navbar/NavBar"; // Assuming NavBar is in this path
import API from '../../api';

export const SkillGap = () => {
  // State for pagination
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

  /**
   * Fetches project skill summary data from the backend.
   * Maps the backend DTO structure to the frontend's expected format.
   */
  const fetchProjects = async () => {
    setLoadingProjects(true);
    setErrorProjects(null);
    try {
      // Use the authenticated API instance
      const response = await API.get('/api/SkillGap/project-summary');
      const data = response.data;

      // Map the backend DTO to the frontend's expected structure
      const mappedProjects = data.map((p) => ({
        name: p.projectName,
        // Join skill names from the RequiredSkills list of objects
        skills: p.requiredSkills.map((s) => s.skillName).join(", "),
        available: p.availableEmployees,
        // Join the list of strings for SkillsNeeded
        needed: p.skillsNeeded.join(", "),
        status: p.status, // Use the status directly from the backend DTO
      }));
      setProjects(mappedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setErrorProjects("Failed to load projects. Please try again later.");
    } finally {
      setLoadingProjects(false);
    }
  };

  /**
   * Fetches employee skill summary data from the backend.
   * Maps the backend DTO structure to the frontend's expected format.
   */
  const fetchEmployees = async () => {
    setLoadingEmployees(true);
    setErrorEmployees(null);
    try {
      // Use the authenticated API instance
      const response = await API.get('/api/SkillGap/employee-summary');
      const data = response.data;

      // Map the backend DTO to the frontend's expected structure
      const mappedEmployees = data.map((e) => ({
        name: e.employeeName,
        // Join the list of strings for SkillsWithProficiency
        skills: e.skillsWithProficiency.join(" "),
        role: e.role,
        department: e.department,
        // Format the DateTime string from backend to a readable date string
        lastUpdate: new Date(e.lastUpdated).toLocaleDateString("en-GB"),
      }));
      setEmployees(mappedEmployees);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setErrorEmployees("Failed to load employee data. Please try again later.");
    } finally {
      setLoadingEmployees(false);
    }
  };

  /**
   * useEffect hook to fetch data when the component mounts.
   * The empty dependency array ensures this runs only once.
   */
  useEffect(() => {
    fetchProjects();
    fetchEmployees();
  }, []);

  /**
   * Toggles the number of projects displayed (show more/less).
   */
  const handleShowMoreProjects = () => {
    if (showAllProjects) {
      setProjectsLimit(3); // Show initial 3 projects
      setShowAllProjects(false);
    } else {
      setProjectsLimit(projects.length); // Show all projects
      setShowAllProjects(true);
    }
  };

  /**
   * Toggles the number of employees displayed (show more/less).
   */
  const handleShowMoreEmployees = () => {
    if (showAllEmployees) {
      setEmployeesLimit(5); // Show initial 5 employees
      setShowAllEmployees(false);
    } else {
      setEmployeesLimit(employees.length); // Show all employees
      setShowAllEmployees(true);
    }
  };

  return (
    <div>
      {/* NavBar component, assuming it handles its own data fetching or receives props */}
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
                <button className="btn btn-outline-primary rounded-md shadow-sm">
                  <i className="bi bi-funnel me-2"></i> Filter
                </button>
                <button className="btn btn-success rounded-md shadow-sm">
                  <i className="bi bi-download me-2"></i> Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Gap Table - Projects */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="card shadow-sm border-0 rounded-lg">
              <div className="card-header bg-white border-bottom-0 py-3 rounded-t-lg">
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
                    <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-full">
                      {projects.filter((p) => p.status === "Critical").length}{" "}
                      Critical Gaps
                    </span>
                  )}
                </div>
              </div>

              <div className="card-body p-0">
                {/* Conditional rendering for loading, error, or data */}
                {loadingProjects ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading projects...</span>
                    </div>
                  </div>
                ) : errorProjects ? (
                  <div className="alert alert-danger mx-3 my-4 rounded-md" role="alert">
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
                                {/* Check if project.skills exists before splitting */}
                                {project.skills && project.skills.split(", ").map((skill, i) => (
                                  <span
                                    key={i}
                                    className="badge bg-light text-dark border rounded-full px-2 py-1"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-3 text-center">
                              <span
                                className={`badge ${
                                  project.status === "Critical"
                                    ? "bg-danger"
                                    : project.status === "Low"
                                    ? "bg-warning"
                                    : "bg-success"
                                } rounded-full`}
                              >
                                {project.available}
                              </span>
                            </td>
                            <td className="py-3">
                              <small className="text-muted">
                                {project.needed || "None"} {/* Display "None" if no skills are needed */}
                              </small>
                            </td>
                            <td className="py-3 text-center">
                              {project.status === "Critical" ? (
                                <span className="badge bg-danger-subtle text-danger rounded-full px-2 py-1">
                                  Critical
                                </span>
                              ) : project.status === "Low" ? (
                                <span className="badge bg-warning-subtle text-warning rounded-full px-2 py-1">
                                  Low
                                </span>
                              ) : (
                                <span className="badge bg-success-subtle text-success rounded-full px-2 py-1">
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

                {/* Show More/Less button for Projects */}
                {!loadingProjects && !errorProjects && projects.length > 3 && (
                  <div className="card-footer bg-white border-0 py-3 rounded-b-lg">
                    <div className="text-center">
                      <button
                        className="btn btn-outline-primary btn-sm rounded-full px-4 py-2"
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
            <div className="card shadow-sm border-0 rounded-lg">
              <div className="card-header bg-white border-bottom-0 py-3 rounded-t-lg">
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
                {/* Conditional rendering for loading, error, or data */}
                {loadingEmployees ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading employees...</span>
                    </div>
                  </div>
                ) : errorEmployees ? (
                  <div className="alert alert-danger mx-3 my-4 rounded-md" role="alert">
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
                                    // Determine badge color based on proficiency level
                                    const badgeClass =
                                      levelNum >= 4
                                        ? "bg-success"
                                        : levelNum >= 3
                                        ? "bg-warning"
                                        : "bg-secondary";
                                    return (
                                      <span
                                        key={i}
                                        className={`badge ${badgeClass} text-white rounded-full px-2 py-1`}
                                      >
                                        {skillName} L{level}
                                      </span>
                                    );
                                  }
                                  return null; // Return null for invalid skill formats
                                }).filter(Boolean)} {/* Filter out any nulls */}
                              </div>
                            </td>
                            <td className="py-3">
                              <span className="text-dark">{employee.role}</span>
                            </td>
                            <td className="py-3">
                              <span className="badge bg-light text-dark border rounded-full px-2 py-1">
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

                {/* Show More/Less button for Employees */}
                {!loadingEmployees && !errorEmployees && employees.length > 5 && (
                  <div className="card-footer bg-white border-0 py-3 rounded-b-lg">
                    <div className="text-center">
                      <button
                        className="btn btn-outline-primary btn-sm rounded-full px-4 py-2"
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
