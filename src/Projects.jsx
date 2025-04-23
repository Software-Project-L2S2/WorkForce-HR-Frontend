import React, { useState, useEffect } from 'react';
import { FiBell, FiUser, FiLogOut, FiEdit, FiFilter, FiSave, FiX } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Projects.css';

const API_BASE_URL = 'http://localhost:5202/api';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [newProject, setNewProject] = useState({
    name: '',
    status: 'Pending',
    skills: [],
    employeeCount: 1,
    startDate: new Date(),
    endDate: new Date(),
  });
  const [assignment, setAssignment] = useState({
    EmployeeID: '',
    ProjectID: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [tempProject, setTempProject] = useState({});
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await Promise.all([fetchProjects(), fetchProjectEmployees(), fetchProjectAssignments()]);
    } catch (error) {
      showError('Failed to load initial data');
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Projects`);
      setProjects(response.data.map(proj => ({
        ...proj,
        skills: proj.skills.split(', ')
      })));
    } catch (error) {
      showError('Failed to load projects');
    }
  };

  const fetchProjectEmployees = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Project-Employees`);
      setEmployees(response.data);
    } catch (error) {
      showError('Failed to load employees');
    }
  };

  const fetchProjectAssignments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Project-Assignments`);
      setAssignments(response.data);
    } catch (error) {
      showError('Failed to load assignments');
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!newProject.name || newProject.employeeCount <= 0) {
        throw new Error('Please fill all required fields');
      }

      await axios.post(`${API_BASE_URL}/Projects`, {
        ...newProject,
        skills: newProject.skills.join(', ')
      });

      setSuccess('Project created successfully!');
      fetchProjects();
      resetProjectForm();
    } catch (error) {
      showError(error.response?.data?.message || error.message);
    }
    setLoading(false);
  };

  const handleAssignEmployee = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
     
      if (!assignment.EmployeeID || !assignment.ProjectID) {
        throw new Error('Please select both employee and project');
      }

      
      const employeeId = Number(assignment.EmployeeID);
      const projectId = Number(assignment.ProjectID);

      
      if (isNaN(employeeId) || isNaN(projectId) || employeeId <= 0 || projectId <= 0) {
        throw new Error('Invalid ID values detected');
      }

     
      const employeeExists = employees.some(e => e.employeeID === employeeId);
      const projectExists = projects.some(p => p.projectID === projectId);
      
      if (!employeeExists || !projectExists) {
        throw new Error('Selected employee or project does not exist');
      }

    
      const isDuplicate = assignments.some(a => 
        a.ProjectEmployee === employeeId && 
        a.Projects === projectId
      );
      
      if (isDuplicate) {
        throw new Error('This assignment already exists');
      }

    
      const project = projects.find(p => p.projectID === projectId);
      const currentAssignments = assignments.filter(a => a.Projects === projectId).length;
      
      if (currentAssignments >= project.employeeCount) {
        throw new Error('Project has reached maximum capacity');
      }

      
      await axios.post(
        `${API_BASE_URL}/Project-Assignments`,
        {
          ProjectEmployee: employeeId,
          Projects: projectId
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

     
      setSuccess('Assignment successful!');
      await Promise.all([fetchProjectAssignments(), fetchProjects()]);
      resetAssignmentForm();

    } catch (error) {
      
      const serverMessage = error.response?.data?.title || 
                           error.response?.data?.detail ||
                           error.message;
      showError(`Assignment failed: ${serverMessage}`);

    
      console.error('Full error details:', {
        URL: `${API_BASE_URL}/Project-Assignments`,
        Payload: {
          projectId: parseInt(assignment.ProjectID),
          employeeId: parseInt(assignment.EmployeeID),
        },
        ServerResponse: error.response?.data
      });
    } finally {
      setLoading(false);
    }
  };
  const handleEditClick = (project) => {
    setEditingId(project.projectID);
    setTempProject(project);
  };

  const handleUpdateProject = async (projectId) => {
    try {
      await axios.put(`${API_BASE_URL}/Projects/${projectId}`, {
        ...tempProject,
        skills: tempProject.skills.join(', ')
      });
      setSuccess('Project updated successfully!');
      fetchProjects();
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to update project');
    }
    setEditingId(null);
  };

  const resetProjectForm = () => {
    setNewProject({
      name: '',
      status: 'Pending',
      skills: [],
      employeeCount: 1,
      startDate: new Date(),
      endDate: new Date(),
    });
  };

  const resetAssignmentForm = () => {
    setAssignment({ EmployeeID: '', ProjectID: '' });
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 5000);
  };


  const getAvailableEmployees = () => {
    return employees.filter(emp => 
      !assignments.some(a => a.ProjectEmployee === emp.employeeID)
    );
  };


  const getProjectCapacity = (projectId) => {
    const assignedCount = assignments.filter(a => a.Projects === projectId).length;
    const project = projects.find(p => p.projectID == projectId);
    return project ? `${assignedCount}/${project.employeeCount}` : '0/0';
  };

  const filteredProjects = projects.filter(project => 
    filterStatus === 'All' || project.status === filterStatus
  );

  const handleFilterClick = () => setShowFilterDropdown(!showFilterDropdown);
  const handleStatusFilter = (status) => {
    setFilterStatus(status);
    setShowFilterDropdown(false);
  };

  return (
    <div className="container-fluid workforce-container">
      <nav className="navbar workforce-navbar">
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

      <div className="dashboard-content">
        {error && <div className="error-banner">{error}</div>}
        {success && <div className="success-banner">{success}</div>}

        <div className="dashboard-row">
          <div className="dashboard-card active-projects">
            <div className="card-header">
              <h3>Active Projects Overview</h3>
              <div className="card-actions">
                <div className="filter-container">
                  <button className="icon-button" onClick={handleFilterClick}>
                    <FiFilter /> Filter ({filterStatus})
                  </button>
                  {showFilterDropdown && (
                    <div className="filter-dropdown">
                      {['All', 'Pending', 'In Progress', 'Completed'].map(status => (
                        <div
                          key={status}
                          className={`filter-option ${filterStatus === status ? 'active' : ''}`}
                          onClick={() => handleStatusFilter(status)}
                        >
                          {status}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <table className="workforce-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Status</th>
                  <th>Required Skills</th>
                  <th>Employees</th>
                  <th>Timeline</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.projectID}>
                    <td>
                      {editingId === project.projectID ? (
                        <input
                          value={tempProject.name}
                          onChange={(e) => setTempProject({...tempProject, name: e.target.value})}
                          className="table-input"
                        />
                      ) : (
                        project.name
                      )}
                    </td>
                    <td>
                      {editingId === project.projectID ? (
                        <select
                          value={tempProject.status}
                          onChange={(e) => setTempProject({...tempProject, status: e.target.value})}
                          className="table-select"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      ) : (
                        <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                          {project.status}
                        </span>
                      )}
                    </td>
                    <td>
                      {editingId === project.projectID ? (
                        <input
                          value={tempProject.skills.join(', ')}
                          onChange={(e) => setTempProject({...tempProject, skills: e.target.value.split(',').map(s => s.trim())})}
                          className="table-input"
                        />
                      ) : (
                        project.skills.join(', ')
                      )}
                    </td>
                    <td>
                      {editingId === project.projectID ? (
                        <input
                          type="number"
                          value={tempProject.employeeCount}
                          onChange={(e) => setTempProject({...tempProject, employeeCount: e.target.value})}
                          className="table-input"
                          min="1"
                        />
                      ) : (
                        getProjectCapacity(project.projectID)
                      )}
                    </td>
                    <td>
                      {editingId === project.projectID ? (
                        <div className="date-picker-group">
                          <DatePicker
                            selected={new Date(tempProject.startDate)}
                            onChange={(date) => setTempProject({...tempProject, startDate: date})}
                            className="table-input"
                          />
                          <DatePicker
                            selected={new Date(tempProject.endDate)}
                            onChange={(date) => setTempProject({...tempProject, endDate: date})}
                            className="table-input"
                          />
                        </div>
                      ) : (
                        <>
                          {new Date(project.startDate).toLocaleDateString()} - 
                          {new Date(project.endDate).toLocaleDateString()}
                        </>
                      )}
                    </td>
                    <td>
                      {editingId === project.projectID ? (
                        <div className="action-buttons">
                          <button 
                            className="save-button"
                            onClick={() => handleUpdateProject(project.projectID)}
                          >
                            <FiSave />
                          </button>
                          <button 
                            className="cancel-button"
                            onClick={() => setEditingId(null)}
                          >
                            <FiX />
                          </button>
                        </div>
                      ) : (
                        <button 
                          className="edit-button"
                          onClick={() => handleEditClick(project)}
                        >
                          <FiEdit />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="dashboard-card upcoming-projects">
            <div className="card-header">
              <h3>Upcoming Projects</h3>
            </div>
            <table className="workforce-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Project AB</td>
                  <td>2025-02-05</td>
                  <td>2025-07-10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-row">
          <div className="dashboard-card assigned-employees">
            <div className="card-header">
              <h3>Employee Assignments</h3>
            </div>
            <div className="assignment-form">
              <div className="form-group">
                <label>Select Employee</label>
                <select
                  className="form-select"
                  value={assignment.EmployeeID}
                  onChange={(e) => setAssignment({ ...assignment, EmployeeID: e.target.value })}
                  disabled={loading}
                >
                  <option value="">Choose Employee</option>
                  {getAvailableEmployees().map(emp => (
                    <option key={emp.employeeID} value={emp.employeeID}>
                      {emp.name} ({emp.role})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Select Project</label>
                <select
                  className="form-select"
                  value={assignment.ProjectID}
                  onChange={(e) => setAssignment({ ...assignment, ProjectID: e.target.value })}
                  disabled={loading}
                >
                  <option value="">Choose Project</option>
                  {projects.map(proj => (
                    <option 
                      key={proj.projectID} 
                      value={proj.projectID}
                      disabled={assignments.filter(a => a.ProjectID === proj.projectID).length >= proj.employeeCount}
                    >
                      {proj.name} ({getProjectCapacity(proj.projectID)})
                    </option>
                  ))}
                </select>
              </div>

              <button 
                className="primary-button" 
                onClick={handleAssignEmployee}
                disabled={!assignment.EmployeeID || !assignment.ProjectID || loading}
              >
                <FiEdit /> {loading ? 'Assigning...' : 'Assign Employee'}
              </button>
            </div>
          </div>

          <div className="dashboard-card add-project">
            <div className="card-header">
              <h3>Create New Project</h3>
            </div>
            <form className="project-form" onSubmit={handleCreateProject}>
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-select"
                  value={newProject.status}
                  onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label>Required Skills</label>
                <input
                  type="text"
                  className="form-input"
                  value={newProject.skills.join(', ')}
                  onChange={(e) => setNewProject({ 
                    ...newProject, 
                    skills: e.target.value.split(',').map(s => s.trim()) 
                  })}
                  placeholder="Enter skills separated by commas"
                  required
                />
              </div>

              <div className="form-group">
                <label>Employee Capacity</label>
                <input
                  type="number"
                  className="form-input"
                  min="1"
                  value={newProject.employeeCount}
                  onChange={(e) => setNewProject({ 
                    ...newProject, 
                    employeeCount: Math.max(1, parseInt(e.target.value) || 1) 
                  })}
                  required
                />
              </div>

              <div className="date-picker-group">
                <div className="form-group">
                  <label>Start Date</label>
                  <DatePicker
                    selected={newProject.startDate}
                    onChange={(date) => setNewProject({ ...newProject, startDate: date })}
                    customInput={<input className="form-input" />}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>End Date</label>
                  <DatePicker
                    selected={newProject.endDate}
                    onChange={(date) => setNewProject({ ...newProject, endDate: date })}
                    customInput={<input className="form-input" />}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="primary-button full-width"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Project'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;