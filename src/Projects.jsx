import React, { useState, useEffect } from 'react';
import { FiBell, FiUser, FiLogOut, FiEdit, FiFilter, FiCalendar } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Projects.css';
import { NavBar } from "./Navbar/NavBar";

export const API_BASE_URL = 'http://localhost:5202/api';
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [projectEmployees, setProjectEmployees] = useState([]);
  const [newProject, setNewProject] = useState({
    name: '',
    status: 'Pending',
    skills: [],
    employeeCount: 0,
    startDate: new Date(),
    endDate: new Date(),
  });
  const [assignment, setAssignment] = useState({
    employeeId: '',
    projectId: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch initial data
  useEffect(() => {
    fetchProjects();
    fetchProjectEmployees();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Projects`);
      setProjects(response.data.map(proj => ({
        ...proj,
        skills: proj.skills.split(', '),
        currentEmployees: proj.currentEmployees || 0
      })));
    } catch (error) {
      showError('Failed to load projects');
    }
  };

  const fetchProjectEmployees = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Project-Employees`);
      setProjectEmployees(response.data);
    } catch (error) {
      showError('Failed to load project employees');
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
      showError(error.message);
    }
    setLoading(false);
  };

  const handleAssignEmployee = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!assignment.employeeId || !assignment.projectId) {
        throw new Error('Please select employee and project');
      }

      // Check project capacity
      const project = projects.find(p => p.projectID == assignment.projectId);
      if (project.currentEmployees >= project.employeeCount) {
        throw new Error('Project has reached maximum capacity');
      }

      // Create assignment
      await axios.post(`${API_BASE_URL}/Project-Assignments`, assignment);
      
      // Update project count
      await axios.put(`${API_BASE_URL}/Projects/${assignment.projectId}/increment`);

      setSuccess('Employee assigned successfully!');
      fetchProjects();
      fetchProjectEmployees();
      resetAssignmentForm();
    } catch (error) {
      showError(error.message);
    }
    setLoading(false);
  };

  const resetProjectForm = () => {
    setNewProject({
      name: '',
      status: 'Pending',
      skills: [],
      employeeCount: 0,
      startDate: new Date(),
      endDate: new Date(),
    });
  };

  const resetAssignmentForm = () => {
    setAssignment({ employeeId: '', projectId: '' });
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 5000);
  };

  const getAvailableProjectEmployees = () => {
    return projectEmployees.filter(emp => !emp.assignedProjectId);
  };

  const getProjectCapacity = (projectId) => {
    const project = projects.find(p => p.projectID === projectId);
    return project ? `${project.currentEmployees}/${project.employeeCount}` : '0/0';
  };

  return (
    <div className="container-fluid workforce-container">
      {/* Navigation Header */}
      <nav className="nav-container">
      <NavBar/>
      </nav>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Notifications */}
        {error && <div className="error-banner">{error}</div>}
        {success && <div className="success-banner">{success}</div>}

        {/* Active Projects Section */}
        <div className="dashboard-row">
          <div className="dashboard-card active-projects">
            <div className="card-header">
              <h3>Active Projects Overview</h3>
              <div className="card-actions">
                <button className="icon-button">
                  <FiFilter /> Filter
                </button>
                <button className="icon-button">
                  <FiEdit /> Edit
                </button>
              </div>
            </div>
            <table className="workforce-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Status</th>
                  <th>Required Skills</th>
                  <th>Employees</th>
                  <th>Timeline</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.projectID}>
                    <td>{project.name}</td>
                    <td>
                      <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                        {project.status}
                      </span>
                    </td>
                    <td>{project.skills.join(', ')}</td>
                    <td>{getProjectCapacity(project.projectID)}</td>
                    <td>
                      {new Date(project.startDate).toLocaleDateString()} - 
                      {new Date(project.endDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Upcoming Projects Section */}
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

        {/* Employee Assignment Section */}
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
                  value={assignment.employeeId}
                  onChange={(e) => setAssignment({ ...assignment, employeeId: e.target.value })}
                  disabled={loading}
                >
                  <option value="">Choose Employee</option>
                  {getAvailableProjectEmployees().map(emp => (
                    <option key={emp.employeeId} value={emp.employeeId}>
                      {emp.name} ({emp.role})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Select Project</label>
                <select
                  className="form-select"
                  value={assignment.projectId}
                  onChange={(e) => setAssignment({ ...assignment, projectId: e.target.value })}
                  disabled={loading}
                >
                  <option value="">Choose Project</option>
                  {projects.map(proj => (
                    <option 
                      key={proj.projectID} 
                      value={proj.projectID}
                      disabled={proj.currentEmployees >= proj.employeeCount}
                    >
                      {proj.name} ({getProjectCapacity(proj.projectID)})
                    </option>
                  ))}
                </select>
              </div>

              <button 
                className="primary-button" 
                onClick={handleAssignEmployee}
                disabled={!assignment.employeeId || !assignment.projectId || loading}
              >
                <FiEdit /> {loading ? 'Assigning...' : 'Assign Employee'}
              </button>
            </div>
          </div>

          {/* Add New Project Section */}
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

export default Projects;