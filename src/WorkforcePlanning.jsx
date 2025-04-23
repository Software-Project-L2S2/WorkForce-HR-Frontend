import { useEffect, useState } from "react";
import { FiBell, FiUser, FiLogOut, FiMail, FiMessageSquare, FiAlertTriangle, FiCalendar, FiBriefcase, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useLeaveRequests } from "./hooks/useLeaveRequests";
import './WorkforcePlanning.css';

function WorkforcePlanning() {
  // State Management
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    audience: "All",
    tagRole: "",
    note: ""
  });
  const [communicationType, setCommunicationType] = useState("email");
  const [actionLoading, setActionLoading] = useState({ id: null, action: null });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Workforce Statistics (Static Data)
  const workforceStats = {
    retirements: 2,
    retirementDate: "15 Jan 2025",
    vacancies: 3,
    vacanciesRole: "Software Engineers",
    leavesAllowed: 2,
    leavesNotAllowed: 5,
    criticalGaps: 3
  };

  // Leave Requests Hook
  const { 
    leaveRequests, 
    loading: leaveLoading, 
    error: leaveError, 
    updateRequestStatus 
  } = useLeaveRequests();

  // Fetch Announcements
  useEffect(() => {
    axios.get("http://localhost:5202/api/Announcements")
      .then(res => setAnnouncements(res.data))
      .catch(error => console.error("Error fetching announcements:", error));
  }, []);

  // Form Handlers
  const handleChange = (e) => {
    setNewAnnouncement({ 
      ...newAnnouncement, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSendAnnouncement = () => {
    axios.post("http://localhost:5202/api/Announcements", {
      ...newAnnouncement,
      communicationType,
      createdAt: new Date().toISOString()
    }).then(res => {
      setAnnouncements(prev => [res.data, ...prev]); // Add new announcement to top
      setNewAnnouncement({ title: "", audience: "All", tagRole: "", note: "" });
    });
  };

  // Leave Request Actions
  const handleStatusUpdate = async (id, action) => {
    setActionLoading({ id, action });
    try {
      await updateRequestStatus(id, action);
    } finally {
      setActionLoading({ id: null, action: null });
    }
  };

  // Filter Announcements
  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.note.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter Leave Requests based on status
  const filteredLeaveRequests = leaveRequests.filter(request =>
    filterStatus === "all" || request.status.toLowerCase() === filterStatus.toLowerCase()
  );

  return (
    <div className="workforce-container">
      {/* Navigation Bar */}
      <nav className="workforce-navbar">
        <div className="brand-section">
        <img src="/images/wp-logo.png" alt="Company Logo" className="company-logo" />
          <div className="nav-menu">
            {['Employee', 'Projects', 'LeaveManagement', 'Feedback', 'Settings'].map((item) => (
              <Link key={item} to={`/${item.toLowerCase()}`} className="nav-item">{item}</Link>
            ))}
          </div>
        </div>
        <div className="nav-controls">
          <FiBell className="nav-icon" />
          <FiUser className="nav-icon" />
          <FiLogOut className="nav-icon" />
        </div>
      </nav>

      {/* Main Content */}
      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="left-column">
          {/* Workforce Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <FiCalendar className="stat-icon" />
              <div>
                <h3>Upcoming Retirement</h3>
                <p>{workforceStats.retirements} employees retiring</p>
                <small>{workforceStats.retirementDate}</small>
              </div>
            </div>

            <div className="stat-card">
              <FiBriefcase className="stat-icon" />
              <div>
                <h3>Vacancy Alert</h3>
                <p>{workforceStats.vacancies} open positions</p>
                <small>{workforceStats.vacanciesRole}</small>
              </div>
            </div>

            <div className="stat-card">
              <FiAlertTriangle className="stat-icon" />
              <div>
                <h3>Workforce Issue</h3>
                <p>{workforceStats.criticalGaps} critical skill gaps</p>
                <small>Project A</small>
              </div>
            </div>

            <div className="stat-card">
              <FiAlertTriangle className="stat-icon" />
              <div>
                <h3>Leaves Status</h3>
                <div className="leaves-count">
                  <span className="allowed">{workforceStats.leavesAllowed} Available</span>
                  <span className="not-allowed">{workforceStats.leavesNotAllowed} Not Allowed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Leave Requests Table */}
<div className="leave-requests">
  <h2>Leave Requests</h2>

  {/* Professional Filter Buttons */}
  <div className="filter-container">
    <div className="filter-buttons">
      <button 
        className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
        onClick={() => setFilterStatus("all")}
      >
        All ({leaveRequests.length})
      </button>
      <button 
        className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
        onClick={() => setFilterStatus("pending")}
      >
        Pending ({leaveRequests.filter(r => r.status === 'Pending').length})
      </button>
      <button 
        className={`filter-btn ${filterStatus === 'approved' ? 'active' : ''}`}
        onClick={() => setFilterStatus("approved")}
      >
        Approved ({leaveRequests.filter(r => r.status === 'Approved').length})
      </button>
      <button 
        className={`filter-btn ${filterStatus === 'rejected' ? 'active' : ''}`}
        onClick={() => setFilterStatus("rejected")}
      >
        Rejected ({leaveRequests.filter(r => r.status === 'Rejected').length})
      </button>
    </div>
    <div className="filter-status">
      Showing {filteredLeaveRequests.length} of {leaveRequests.length} requests
    </div>
  </div>

            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaveRequests.map(request => (
                  <tr key={request.id}>
                    <td>{request.employeeName}</td>
                    <td>{new Date(request.startDate).toLocaleDateString()}</td>
                    <td>{new Date(request.endDate).toLocaleDateString()}</td>
                    <td>{request.leaveType}</td>
                    <td>
                      {request.status === "Pending" ? (
                        <div className="action-buttons">
                          <button 
                            onClick={() => handleStatusUpdate(request.id, 'approve')}
                            className="approve-btn"
                            disabled={actionLoading.id === request.id}
                          >
                            {actionLoading.id === request.id ? 'Processing...' : 'Approve'}
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(request.id, 'reject')}
                            className="reject-btn"
                            disabled={actionLoading.id === request.id}
                          >
                            {actionLoading.id === request.id ? 'Processing...' : 'Reject'}
                          </button>
                        </div>
                      ) : (
                        <span className={`status-badge ${request.status.toLowerCase()}`}>
                          {request.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Announcement Creation */}
          <div className="announcement-card">
            <div className="comms-toggle">
              <button 
                className={communicationType === 'email' ? 'active' : ''}
                onClick={() => setCommunicationType('email')}
              >
                <FiMail /> Email
              </button>
              <button 
                className={communicationType === 'sms' ? 'active' : ''}
                onClick={() => setCommunicationType('sms')}
              >
                <FiMessageSquare /> SMS
              </button>
            </div>

            <div className="announcement-form">
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={newAnnouncement.title}
                onChange={handleChange}
              />
              
              <div className="form-row">
                <select
                  name="audience"
                  value={newAnnouncement.audience}
                  onChange={handleChange}
                >
                  <option>All</option>
                  <option>Developers</option>
                  <option>Managers</option>
                  <option>HR</option>
                </select>
                <input
                  type="text"
                  placeholder="Tag Role"
                  name="tagRole"
                  value={newAnnouncement.tagRole}
                  onChange={handleChange}
                />
              </div>

              <textarea
                placeholder="Note"
                name="note"
                value={newAnnouncement.note}
                onChange={handleChange}
                rows="4"
              />

              <div className="signup-section">
                <p>Sign up to comment, edit, inspect and more.</p>
                <div className="signup-buttons">
                  <button className="signup-btn">Sign Up</button>
                  <button className="continue-btn">Continue</button>
                </div>
              </div>

              <button 
                className="publish-btn"
                onClick={handleSendAnnouncement}
              >
                Publish Announcement
              </button>
            </div>
          </div>

          {/* Announcements List with Search */}
          <div className="announcements-list">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {filteredAnnouncements.map(announcement => (
              <div key={announcement.id} className="announcement-item">
                <h4>{announcement.title}</h4>
                <div className="announcement-meta">
                  <span className="audience">{announcement.audience}</span>
                 
                </div>
                <p>{announcement.note}</p>
                <div className="announcement-footer">
                  <span className="tag">{announcement.tagRole}</span>
                  <span className="comms-type">{announcement.communicationType}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Key Items Section */}
          <div className="key-items">
            <div className="key-items-footer">
              <div className="right-group">
                <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkforcePlanning;
