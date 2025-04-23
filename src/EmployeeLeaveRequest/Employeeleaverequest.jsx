import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // Import required icons

const LeaveRequestForm = () => {
  // Default leave allocations for each type
  const defaultLeaveAllocations = {
    "Annual Leave": { used: 0, total: 60 },
    "Sick Leave": { used: 0, total: 10 },
    "Compassionate Leave": { used: 0, total: 15 },
  };

  // State for the leave request form
  const [formData, setFormData] = useState({
    leaveType: "Annual Leave", // Default leave type
    startDate: "",
    endDate: "",
    duration: "0", // Initialize duration to 0
    resumptionDate: "",
    reason: "",
    document: null,
  });

  // State for available leave days
  const [availableLeaves, setAvailableLeaves] = useState(defaultLeaveAllocations);

  // State to track submitted leave requests
  const [submittedRequests, setSubmittedRequests] = useState([]);

  // Function to reset leaves at the beginning of every year
  const resetLeavesAtYearStart = () => {
    const currentYear = new Date().getFullYear();
    const lastResetYear = localStorage.getItem("lastResetYear");

    // Check if the year has changed
    if (!lastResetYear || lastResetYear < currentYear) {
      // Send remaining leave details to HR before resetting
      sendRemainingLeavesToHR();

      // Reset leaves to default amounts
      setAvailableLeaves(defaultLeaveAllocations);

      // Update the last reset year in localStorage
      localStorage.setItem("lastResetYear", currentYear);
    }
  };

  // Function to send remaining leave details to HR
  const sendRemainingLeavesToHR = () => {
    const remainingLeaves = Object.entries(availableLeaves).map(([type, { used, total }]) => ({
      type,
      remaining: total - used,
    }));

    // Simulate sending data to HR (replace with actual API call)
    console.log("Sending remaining leave details to HR:", remainingLeaves);
    alert("Remaining leave details sent to HR.");
  };

  // Automatically reset leaves at the beginning of every year
  useEffect(() => {
    resetLeavesAtYearStart();
  }, []); // Run only once when the component mounts

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "document") {
      setFormData((prevData) => ({
        ...prevData,
        document: files[0], // Store file
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      // Automatically calculate duration when start or end date changes
      if (name === "startDate" || name === "endDate") {
        const startDate = name === "startDate" ? new Date(value) : new Date(formData.startDate);
        const endDate = name === "endDate" ? new Date(value) : new Date(formData.endDate);

        if (startDate && endDate && startDate <= endDate) {
          const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
          setFormData((prevData) => ({
            ...prevData,
            duration: duration.toString(),
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            duration: "0",
          }));
        }
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate the number of days requested
    const daysRequested = parseInt(formData.duration, 10);

    // Get the selected leave type and its available leaves
    const selectedLeaveType = formData.leaveType;
    const remainingLeaves = availableLeaves[selectedLeaveType].total - availableLeaves[selectedLeaveType].used;

    // Check if requested leaves exceed available leaves
    if (daysRequested > remainingLeaves) {
      alert("Available leaves exceeding. Contact HR for your leave request.");
      return; // Stop further execution
    }

    // Create a new leave request
    const newRequest = {
      id: Date.now(), // Unique ID for the request
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      duration: formData.duration,
      reason: formData.reason,
      document: formData.document ? formData.document.name : null,
      status: "Pending", // Default status
    };

    // Add the new request to the submitted requests
    setSubmittedRequests((prevRequests) => [...prevRequests, newRequest]);

    // Update available leave days for the selected leave type
    const updatedLeaves = {
      ...availableLeaves,
      [selectedLeaveType]: {
        ...availableLeaves[selectedLeaveType],
        used: availableLeaves[selectedLeaveType].used + daysRequested,
      },
    };

    // Update the state with the new available leave days
    setAvailableLeaves(updatedLeaves);

    // Log the submitted leave request
    console.log("Leave Request Submitted:", newRequest);
    alert("Leave request submitted successfully!");

    // Reset the form
    handleReset();
  };

  // Handle reset button click
  const handleReset = () => {
    const isConfirmed = window.confirm("Are you sure you want to reset the form?");
    if (isConfirmed) {
      setFormData({
        leaveType: "Annual Leave",
        startDate: "",
        endDate: "",
        duration: "0",
        resumptionDate: "",
        reason: "",
        document: null,
      });
    }
  };

  // Handle editing a leave request
  const handleEditRequest = (id) => {
    const requestToEdit = submittedRequests.find((request) => request.id === id);
    if (requestToEdit) {
      setFormData({
        leaveType: requestToEdit.leaveType,
        startDate: requestToEdit.startDate,
        endDate: requestToEdit.endDate,
        duration: requestToEdit.duration,
        resumptionDate: "",
        reason: requestToEdit.reason,
        document: null,
      });

      // Remove the request from the submitted requests
      setSubmittedRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      );

      // Update available leaves by deducting the duration of the deleted request
      const updatedLeaves = {
        ...availableLeaves,
        [requestToEdit.leaveType]: {
          ...availableLeaves[requestToEdit.leaveType],
          used: availableLeaves[requestToEdit.leaveType].used - parseInt(requestToEdit.duration, 10),
        },
      };
      setAvailableLeaves(updatedLeaves);
    }
  };

  // Handle deleting a leave request
  const handleDeleteRequest = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this request?");
    if (isConfirmed) {
      const requestToDelete = submittedRequests.find((request) => request.id === id);
      if (requestToDelete) {
        // Update available leaves by deducting the duration of the deleted request
        const updatedLeaves = {
          ...availableLeaves,
          [requestToDelete.leaveType]: {
            ...availableLeaves[requestToDelete.leaveType],
            used: availableLeaves[requestToDelete.leaveType].used - parseInt(requestToDelete.duration, 10),
          },
        };
        setAvailableLeaves(updatedLeaves);

        // Remove the request from the submitted requests
        setSubmittedRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== id)
        );
      }
    }
  };

  // Handle updating the status of a leave request
  const handleUpdateStatus = (id, newStatus) => {
    setSubmittedRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  return (
    <div className="container-fluid min-vh-100 p-4" style={{ backgroundColor: '#f0f8ff' }}>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
        <ul className="navbar-nav w-100 d-flex justify-content-around">
          {["Dashboard", "Workforce", "Requests", "Feedback", "Setting"].map(
            (item) => (
              <li className="nav-item" key={item}>
                <a className="nav-link font-weight-bold" href="#">
                  {item}
                </a>
              </li>
            )
          )}
        </ul>
        <div className="d-flex align-items-center">
          {/* Notification Bell Icon */}
          <FontAwesomeIcon
            icon={faBell}
            className="mx-2"
            style={{ width: "24px", height: "24px", cursor: "pointer" }}
          />
          {/* Profile Icon */}
          <FontAwesomeIcon
            icon={faUser}
            className="rounded-circle mx-2"
            style={{ width: "32px", height: "32px", color: "#007bff" }}
          />
          {/* Logout Icon */}
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className="mx-2"
            style={{ width: "24px", height: "24px", cursor: "pointer" }}
            onClick={() => alert("Logging out...")}
          />
        </div>
      </nav>

      {/* Main Content */}
      <div className="row mt-4">
        {/* Available Leave Days */}
        <div className="col-md-4">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-weight-bold">Available Leave Days</h4>
            {Object.entries(availableLeaves).map(([type, { used, total }]) => {
              const remaining = total - used; // Calculate remaining leaves
              return (
                <div key={type} className="mb-3">
                  <p className="mb-1">{type}</p>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className="progress-bar bg-primary"
                      style={{ width: `${(remaining / total) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-muted">{`${remaining} of ${total} day(s) remaining`}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leave Application Form */}
        <div className="col-md-8">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-weight-bold">📖 Leave Application</h3>
            <p className="text-muted">Fill the required fields below to apply</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Leave Type</label>
                <select
                  className="form-control"
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleInputChange}
                >
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Compassionate Leave">Compassionate Leave</option>
                </select>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label>End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label>Duration (Days)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="duration"
                    value={formData.duration}
                    readOnly // Make duration field read-only
                  />
                </div>
                <div className="col-md-6">
                  <label>Resumption Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="resumptionDate"
                    value={formData.resumptionDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group mt-3">
                <label>Reason for Leave</label>
                <textarea
                  className="form-control"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="form-group mt-3">
                <label>Attach Handover Document (pdf, jpg, docx, etc.)</label>
                <input
                  type="file"
                  className="form-control"
                  name="document"
                  onChange={handleInputChange}
                />
              </div>
              <div className="d-flex justify-content-between mt-4">
                <button type="submit" className="btn btn-success px-4">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger px-4"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Submitted Leave Requests */}
          <div className="bg-white p-4 rounded shadow mt-4">
            <h3 className="font-weight-bold">📄 Submitted Leave Requests</h3>
            {submittedRequests.length === 0 ? (
              <p className="text-muted">No leave requests submitted yet.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Leave Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Duration</th>
                    <th>Reason</th>
                    <th>Document</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.leaveType}</td>
                      <td>{request.startDate}</td>
                      <td>{request.endDate}</td>
                      <td>{request.duration} days</td>
                      <td>{request.reason}</td>
                      <td>
                        {request.document ? (
                          <a href={`#${request.document}`} target="_blank" rel="noopener noreferrer">
                            {request.document}
                          </a>
                        ) : (
                          "No document"
                        )}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            request.status === "Approved"
                              ? "badge-success"
                              : request.status === "Declined"
                              ? "badge-danger"
                              : "badge-warning"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary mr-2"
                          onClick={() => handleEditRequest(request.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteRequest(request.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestForm;