import React, { useState, useEffect } from 'react';
import { FiBell, FiUser, FiLogOut, FiEdit, FiFilter, FiCalendar } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import './Projects.css';
import { NavBar } from "./Navbar/NavBar";
import API from '../../api';

export const Projects = () => {
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
      const response = await API.get('/api/Projects');
      setProjects(response.data.map(proj => ({
        ...proj,
        skills: proj.requiredSkills ? proj.requiredSkills.split(', ') : [],
        currentEmployees: proj.employees ? proj.employees.length : 0
      })));
    } catch (error) {
      showError('Failed to load projects');
    }
  };

  const fetchProjectEmployees = async () => {
    try {
      const response = await API.get('/api/Employees');
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

      await API.post('/api/Projects', {
        name: newProject.name,
        status: newProject.status,
        requiredSkills: newProject.skills,
        employeeCount: newProject.employeeCount,
        startDate: newProject.startDate,
        endDate: newProject.endDate,
        employeeIds: []
      });

      setSuccess('Project created successfully!');
      fetchProjects();
      resetProjectForm();
    } catch (error) {
      showError(error.message || 'Failed to create project');
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
      const project = projects.find(p => p.id == assignment.projectId);
      if (project && project.currentEmployees >= project.employeeCount) {
        throw new Error('Project has reached maximum capacity');
      }

      // Assign employee to project
      await API.post('/api/ProjectAssignments', {
        projectId: assignment.projectId,
        employeeId: assignment.employeeId,
        employeeName: getAvailableProjectEmployees().find(e => e.employeeId == assignment.employeeId)?.name || ''
      });

      setSuccess('Employee assigned successfully!');
      fetchProjects();
      fetchProjectEmployees();
      resetAssignmentForm();
    } catch (error) {
      showError(error.message || 'Failed to assign employee');
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
    const project = projects.find(p => p.id === projectId);
    return project ? `${project.currentEmployees}/${project.employeeCount}` : '0/0';
  };

  return (
    <div className="container-fluid workforce-container">
      
      <nav className="nav-container">
        <NavBar/>
      </nav>

      
      <div className="dashboard-content">
        
        {error && <div className="error-banner">{error}</div>}
        {success && <div className="success-banner">{success}</div>}

        
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
                  <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>
                      <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                        {project.status}
                      </span>
                    </td>
                    <td>{project.skills.join(', ')}</td>
                    <td>{getProjectCapacity(project.id)}</td>
                    <td>
                      {new Date(project.startDate).toLocaleDateString()} - 
                      {new Date(project.endDate).toLocaleDateString()}
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
                  value={assignment.employeeId}
                  onChange={(e) => setAssignment({ ...assignment, employeeId: e.target.value })}
                  disabled={loading}
                >
                  <option key="default-employee" value="">Choose Employee</option>
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
                  <option key="default-project" value="">Choose Project</option>
                  {projects.map(proj => (
                    <option 
                      key={`project-${proj.id}`}  
                      value={proj.id}
                      disabled={proj.currentEmployees >= proj.employeeCount}
                    >
                      {proj.name} ({getProjectCapacity(proj.id)})
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
                  <option key="status-pending" value="Pending">Pending</option>
                  <option key="status-in-progress" value="In Progress">In Progress</option>
                  <option key="status-completed" value="Completed">Completed</option>
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
