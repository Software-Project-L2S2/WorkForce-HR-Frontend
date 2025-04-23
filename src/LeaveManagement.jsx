import { useState, useEffect } from "react";
import { FiBell, FiUser, FiLogOut, FiCalendar, FiPlus, FiEye, FiSend, FiFilter } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./LeaveManagement.css";

function WorkforcePlanning() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [leaveType, setLeaveType] = useState("");
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({ id: null, action: null });
  const [availableLeaves, setAvailableLeaves] = useState(15);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5202/api/employeeleaves/${id}`)
        .then(res => setAvailableLeaves(res.data.availableLeaves))
        .catch(() => setAvailableLeaves(15));
    }
  }, [id]);

  useEffect(() => {
    fetchLeaveRequests();
  }, [filterType]);

  const fetchLeaveRequests = () => {
    setLoading(true);
    setError(null);
    
    const url = `http://localhost:5202/api/leaverequests?type=${filterType}`;

    axios.get(url)
      .then(response => {
        setPendingRequests(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching leave requests:", error);
        setError("Failed to load leave requests. Please try again.");
        setLoading(false);
      });
  };

  const handleView = (request) => {
    alert(`Request Details:
Employee: ${request.employeeName}
ID: ${request.employeeId}
Available Leaves: ${request.availableLeaves}
Status: ${request.status}
Leave Type: ${request.leaveType}
Duration: ${(new Date(request.endDate) - new Date(request.startDate)) / (1000 * 3600 * 24) + 1} days
Dates: ${new Date(request.startDate).toLocaleDateString()} - ${new Date(request.endDate).toLocaleDateString()}`);
  };

  const handleAction = (requestId, action) => {
    setActionLoading({ id: requestId, action });
    
    axios.put(`http://localhost:5202/api/leaverequests/${requestId}/${action}`)
      .then(() => {
        setPendingRequests(prev => 
          prev.filter(request => request.id !== requestId)
        );
        fetchLeaveRequests();
      })
      .catch(error => {
        console.error(`Error ${action}ing leave request:`, error);
        alert(error.response?.data || "Action failed");
      })
      .finally(() => setActionLoading({ id: null, action: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    if (!startDate || !endDate) {
      alert("Please select a date range");
      setSubmitLoading(false);
      return;
    }

    const newLeaveRequest = {
      employeeId: id,
      employeeName: name,
      leaveType: leaveType,
      startDate: startDate,
      endDate: endDate,
      status: "Pending"
    };

    axios.post("http://localhost:5202/api/leaverequests", newLeaveRequest)
      .then(() => {
        fetchLeaveRequests();
        setName("");
        setId("");
        setDateRange([null, null]);
        setLeaveType("");
        setSubmitLoading(false);
      })
      .catch(error => {
        console.error("Error submitting leave request:", error);
        alert(error.response?.data || "Submission failed");
        setSubmitLoading(false);
      });
  };

  const saveDraft = () => {
    const draft = {
      id: Date.now(), 
      employeeName: name,
      employeeID: id,
      startDate: startDate,
      endDate: endDate,
      leaveType: leaveType,
      createdAt: new Date()
    };
    
    const existingDrafts = JSON.parse(localStorage.getItem('leaveDrafts')) || [];
    localStorage.setItem('leaveDrafts', JSON.stringify([...existingDrafts, draft]));
  };

  const loadDraft = () => {
    const drafts = JSON.parse(localStorage.getItem('leaveDrafts')) || [];
    const latestDraft = drafts[drafts.length - 1];
    
    if (latestDraft) {
      setName(latestDraft.employeeName || "");
      setId(latestDraft.employeeID || "");
      setDateRange([
        latestDraft.startDate ? new Date(latestDraft.startDate) : null,
        latestDraft.endDate ? new Date(latestDraft.endDate) : null
      ]);
      setLeaveType(latestDraft.leaveType || "");
    }
  };

  const filterOptions = [
    { value: "all", label: "All Requests" },
    { value: "Annual", label: "Annual Leave" },
    { value: "Sick", label: "Sick Leave" },
    { value: "Personal", label: "Personal Leave" }
  ];

  const applyFilter = (type) => {
    setFilterType(type);
    setShowFilterOptions(false);
  };

  const formatDateRange = (start, end) => {
    if (!start || !end) return "Date not specified";
    const options = { day: "numeric", month: "short", year: "numeric" };
    const startStr = new Date(start).toLocaleDateString("en-GB", options);
    const endStr = new Date(end).toLocaleDateString("en-GB", options);
    
    const [sDay, sMonth, sYear] = startStr.split(" ");
    const [eDay, eMonth, eYear] = endStr.split(" ");

    return sYear === eYear && sMonth === eMonth 
      ? `${sDay}-${eDay} ${eMonth} ${eYear}`
      : sYear === eYear 
        ? `${sDay} ${sMonth} - ${eDay} ${eMonth} ${eYear}`
        : `${startStr} - ${endStr}`;
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
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
          <FiBell className="nav-icon" onClick={() => navigate("/feedback")} />
          <FiUser className="nav-icon" onClick={() => navigate("/employee")} />
          <FiLogOut className="nav-icon logout-icon" onClick={handleLogout} />
        </div>
      </nav>

      <main className="workforce-main">
        <div className="requests-box">
          <div className="box-header">
            <h2><FiCalendar /> Pending Leave Requests</h2>
            <div className="filter-container">
              <button 
                className={`filter-btn ${filterType !== 'all' ? 'active-filter' : ''}`}
                onClick={() => setShowFilterOptions(!showFilterOptions)}
              >
                <FiFilter /> {filterOptions.find(o => o.value === filterType)?.label}
              </button>
              {showFilterOptions && (
                <div className="filter-options">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => applyFilter(option.value)}
                      className={filterType === option.value ? "active" : ""}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="requests-list">
            {loading ? (
              <div className="loading-message">Loading requests...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : pendingRequests.length === 0 ? (
              <div className="no-requests-message">No pending leave requests found</div>
            ) : (
              pendingRequests.map((request) => (
                <div key={request.id} className="request-item">
                  <div className="request-info">
                    <h3>{request.employeeName}</h3>
                    <p>{formatDateRange(request.startDate, request.endDate)}</p>
                    <div className="status-container">
                      <span className={`status-badge ${request.status.toLowerCase()}`}>
                        {request.status}
                      </span>
                      <span className={`leave-type ${request.leaveType.toLowerCase().replace(/\s+/g, '-')}`}>
                        {request.leaveType}
                      </span>
                    </div>
                    <div className="leave-balance">
                      Available: {request.availableLeaves} days
                    </div>
                  </div>
                  <div className="request-actions">
                    <button className="view-btn" onClick={() => handleView(request)}>
                      <FiEye /> View
                    </button>
                    <button 
                      className="approve-btn" 
                      onClick={() => handleAction(request.id, 'approve')}
                      disabled={actionLoading.id === request.id || request.status !== "Pending"}
                    >
                      {actionLoading.id === request.id && actionLoading.action === 'approve' 
                        ? 'Processing...' 
                        : 'Approve'}
                    </button>
                    <button 
                      className="reject-btn" 
                      onClick={() => handleAction(request.id, 'reject')}
                      disabled={actionLoading.id === request.id || request.status !== "Pending"}
                    >
                      {actionLoading.id === request.id && actionLoading.action === 'reject' 
                        ? 'Processing...' 
                        : 'Reject'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="request-leave-box">
          <div className="box-header">
            <h2><FiPlus /> Create New Leave Request</h2>
            <button className="load-draft-btn" onClick={loadDraft}>Load Draft</button>
          </div>
          <form className="leave-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Employee Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter your name" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Employee ID</label>
              <input 
                type="text" 
                value={id} 
                onChange={(e) => setId(e.target.value)} 
                placeholder="Enter your ID" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Available Leaves</label>
              <div className="available-leaves-display">
                {availableLeaves} days remaining
              </div>
            </div>
            <div className="form-group">
              <label>Leave Duration</label>
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => setDateRange(update)}
                isClearable={true}
                placeholderText="Select date range"
                className="date-picker"
                required
              />
            </div>
            <div className="form-group">
              <label>Leave Type</label>
              <select 
                value={leaveType} 
                onChange={(e) => setLeaveType(e.target.value)} 
                required
              >
                <option value="">Select Type</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Personal Leave">Personal Leave</option>
              </select>
            </div>
            <div className="form-actions">
              <button 
                type="submit" 
                className="send-btn"
                disabled={submitLoading}
              >
                <FiSend /> {submitLoading ? 'Submitting...' : 'Submit Request'}
              </button>
              <button 
                type="button" 
                className="create-btn"
                onClick={saveDraft}
              >
                <FiPlus /> Save Draft
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default WorkforcePlanning;