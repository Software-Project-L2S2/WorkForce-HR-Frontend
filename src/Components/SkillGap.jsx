import React, { useState } from "react";
import { NavBar } from "../Navbar/NavBar";

export const SkillGap = () => {
  // State for pagination
  const [projectsLimit, setProjectsLimit] = useState(3);
  const [employeesLimit, setEmployeesLimit] = useState(5);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllEmployees, setShowAllEmployees] = useState(false);

  // Sample data - replace with your actual data
  const projects = [
    { name: "Project A", skills: "Python, Data Analysis", available: 8, needed: "Python 2, Data Analysis 3" },
    { name: "Project B", skills: "JavaScript, React, Node.js", available: 0, needed: "AWS: 5, Docker: 4" },
    { name: "Project C", skills: "AWS, Cloud Computing, Docker", available: 3, needed: "AWS: 1, Docker: 1" },
    { name: "Project D", skills: "Machine Learning, Python", available: 2, needed: "ML: 3, Python: 2" },
    { name: "Project E", skills: "DevOps, Kubernetes", available: 1, needed: "DevOps: 4, K8s: 2" },
    { name: "Project F", skills: "React Native, Mobile Dev", available: 0, needed: "React Native: 3" }
  ];

  const employees = [
    { name: "Justin", skills: "Programming(5) Communication(3)", role: "Project Manager", department: "IT", lastUpdate: "28/04/2024" },
    { name: "Sarah", skills: "React(4) Node.js(4) AWS(3)", role: "Full Stack Developer", department: "Engineering", lastUpdate: "30/04/2024" },
    { name: "Michael", skills: "Python(5) Data Analysis(4) Machine Learning(4)", role: "Data Scientist", department: "Analytics", lastUpdate: "29/04/2024" },
    { name: "Emma", skills: "Docker(5) Kubernetes(4) Cloud Infrastructure(4)", role: "DevOps Engineer", department: "Operations", lastUpdate: "27/04/2024" },
    { name: "Alex", skills: "JavaScript(4) Vue.js(3) CSS(4)", role: "Frontend Developer", department: "Engineering", lastUpdate: "26/04/2024" },
    { name: "David", skills: "Java(5) Spring Boot(4) Microservices(4)", role: "Backend Developer", department: "Engineering", lastUpdate: "25/04/2024" },
    { name: "Lisa", skills: "UI/UX Design(5) Figma(4) Adobe Creative(4)", role: "UI/UX Designer", department: "Design", lastUpdate: "24/04/2024" },
    { name: "Tom", skills: "Cybersecurity(5) Network Security(4)", role: "Security Analyst", department: "Security", lastUpdate: "23/04/2024" }
  ];

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
      <div className="container-fluid" style={{ paddingTop: '100px', minHeight: '100vh' }}>
        
        {/* Page Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="mb-1">Skill Gap Analysis</h2>
                <p className="text-muted mb-0">Monitor project requirements and employee skills alignment</p>
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
                      Showing {Math.min(projectsLimit, projects.length)} of {projects.length} projects
                    </small>
                  </div>
                  <span className="badge bg-primary-subtle text-primary px-3 py-2">
                    {projects.filter(p => p.available === 0).length} Critical Gaps
                  </span>
                </div>
              </div>
              
              <div className="card-body p-0">
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
                            <div className="fw-semibold text-dark">{project.name}</div>
                          </td>
                          <td className="py-3">
                            <div className="d-flex flex-wrap gap-1">
                              {project.skills.split(', ').map((skill, i) => (
                                <span key={i} className="badge bg-light text-dark border">{skill}</span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 text-center">
                            <span className={`badge ${project.available === 0 ? 'bg-danger' : project.available < 3 ? 'bg-warning' : 'bg-success'}`}>
                              {project.available}
                            </span>
                          </td>
                          <td className="py-3">
                            <small className="text-muted">{project.needed}</small>
                          </td>
                          <td className="py-3 text-center">
                            {project.available === 0 ? (
                              <span className="badge bg-danger-subtle text-danger">Critical</span>
                            ) : project.available < 3 ? (
                              <span className="badge bg-warning-subtle text-warning">Low</span>
                            ) : (
                              <span className="badge bg-success-subtle text-success">Good</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Show More/Less for Projects */}
                {projects.length > 3 && (
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
                      Showing {Math.min(employeesLimit, employees.length)} of {employees.length} employees
                    </small>
                  </div>
                </div>
              </div>
              
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="border-0 py-3 ps-4">Employee</th>
                        <th className="border-0 py-3">Skills & Proficiency</th>
                        <th className="border-0 py-3">Role</th>
                        <th className="border-0 py-3">Department</th>
                        <th className="border-0 py-3 text-center">Last Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.slice(0, employeesLimit).map((employee, index) => (
                        <tr key={index} className="border-bottom">
                          <td className="py-3 ps-4">
                            <div className="d-flex align-items-center">
                              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                                   style={{ width: '40px', height: '40px', fontSize: '14px', fontWeight: '600' }}>
                                {employee.name.charAt(0)}
                              </div>
                              <div>
                                <div className="fw-semibold text-dark">{employee.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="d-flex flex-wrap gap-1">
                              {employee.skills.split(' ').map((skill, i) => {
                                const match = skill.match(/(.+)\((\d+)\)/);
                                if (match) {
                                  const [, skillName, level] = match;
                                  const levelNum = parseInt(level);
                                  const badgeClass = levelNum >= 4 ? 'bg-success' : levelNum >= 3 ? 'bg-warning' : 'bg-secondary';
                                  return (
                                    <span key={i} className={`badge ${badgeClass} text-white`}>
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
                            <span className="badge bg-light text-dark border">{employee.department}</span>
                          </td>
                          <td className="py-3 text-center">
                            <small className="text-muted">{employee.lastUpdate}</small>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Show More/Less for Employees */}
                {employees.length > 5 && (
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