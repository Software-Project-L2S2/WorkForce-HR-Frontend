import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faSignOutAlt, faPaperclip } from '@fortawesome/free-solid-svg-icons'; // Import required icons

const LeaveManagement = () => {
  // State to manage leave requests
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      name: "feven tesfaye",
      empId: "244A",
      reason: "personal",
      totalLeave: 1,
      availableLeave: 5,
      date: "2024.12.25",
      document: "medical_certificate.pdf", // Example attached document
    },
    {
      id: 2,
      name: "AMANUAMANUEL BEYENEEL BEYENE",
      empId: "2122F",
      reason: "sick",
      totalLeave: 5,
      availableLeave: 7,
      date: "2024.12.27",
      document: "doctor_note.pdf", // Example attached document
    },
  ]);

  // State for the leave request form
  const [formData, setFormData] = useState({
    name: '',
    empId: '',
    reason: '',
    daysNeeded: 1, // Default to 1 day
    startDate: '',
    endDate: '',
    document: null, // Changed to null to handle file object
  });

  // Dynamically calculate the number of pending leave requests
  const pendingLeaveRequestsCount = leaveRequests.length;

  // Function to handle declining a leave request
  const handleDecline = (request) => {
    const declineReason = window.prompt(`Enter the reason for declining ${request.name}'s leave request:`);
    if (declineReason) {
      // Simulate sending a notification to the requested user
      console.log(`Notification sent to ${request.name}: Your leave request has been declined. Reason: ${declineReason}`);
      alert(`Notification sent to ${request.name}: Your leave request has been declined. Reason: ${declineReason}`);

      // Remove the declined request from the list
      setLeaveRequests((prevRequests) =>
        prevRequests.filter((req) => req.id !== request.id)
      );
    }
  };

  // Function to handle approving a leave request
  const handleApprove = (request) => {
    // Simulate sending a notification to the requested user
    console.log(`Notification sent to ${request.name}: Your leave request has been approved.`);
    alert(`Notification sent to ${request.name}: Your leave request has been approved.`);

    // Remove the approved request from the list
    setLeaveRequests((prevRequests) =>
      prevRequests.filter((req) => req.id !== request.id)
    );
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'document') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Store the file object
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate the date range
    const dateRange =
      formData.daysNeeded === 1
        ? formData.startDate
        : `${formData.startDate} to ${formData.endDate}`;

    // Create a new leave request
    const newLeaveRequest = {
      id: leaveRequests.length + 1,
      name: formData.name,
      empId: formData.empId,
      reason: formData.reason,
      totalLeave: formData.daysNeeded,
      availableLeave: 10, // Example value
      date: dateRange,
      document: formData.document ? formData.document.name : '', // Include the attached document name
    };

    // Add the new leave request to the list
    setLeaveRequests((prevRequests) => [...prevRequests, newLeaveRequest]);

    // Reset the form
    setFormData({
      name: '',
      empId: '',
      reason: '',
      daysNeeded: 1,
      startDate: '',
      endDate: '',
      document: null,
    });

    alert('Leave request submitted successfully!');
  };

  return (
    <div className="container-fluid min-vh-100 p-3" style={{ backgroundColor: '#f0f8ff' }}> {/* Set background color */}
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse d-flex justify-content-between w-100" id="navbarNav">
          <ul className="navbar-nav w-100 d-flex justify-content-around">
            {["Dashboard", "Leave Management", "Projects", "Feed backs", "Setting"].map((item) => (
              <li className="nav-item" key={item}>
                <a className="nav-link font-weight-bold" href="#">{item}</a>
              </li>
            ))}
          </ul>
          <div className="d-flex align-items-center">
            {/* Profile Icon */}
            <FontAwesomeIcon icon={faUser} className="rounded-circle mx-2" style={{ width: '40px', height: '40px', color: '#007bff' }} />
            {/* Notification Icon */}
            <FontAwesomeIcon icon={faBell} className="mx-2" style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
            {/* Logout Icon */}
            <FontAwesomeIcon icon={faSignOutAlt} className="mx-2" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => alert('Logging out...')} />
          </div>
        </div>
      </nav>

      {/* Content Section */}
      <div className="row mt-4">
        {/* Pending Leave Requests */}
        <div className="col-md-8">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-weight-bold">
              Pending Leave Requests <span className="text-primary">{pendingLeaveRequestsCount}</span>
            </h3>
            <table className="table mt-3">
              <thead className="thead-light">
                <tr>
                  <th>Employee Name</th>
                  <th>ID</th>
                  <th className="text-center" style={{ width: '10%' }}>Reason</th> {/* Narrower Reason column */}
                  <th className="text-center">Number of leave days requested</th> {/* Centered header */}
                  <th className="text-center">Available Leaves</th> {/* Centered header */}
                  <th>Date/Dates</th>
                  <th>Attached Document</th> {/* New column for attached documents */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.name}</td>
                    <td>{request.empId}</td>
                    <td className="text-center" style={{ width: '10%' }}>{request.reason}</td> {/* Narrower Reason column */}
                    <td className="text-center">{request.totalLeave}</td> {/* Centered data */}
                    <td className="text-center">{request.availableLeave}</td> {/* Centered data */}
                    <td>{request.date}</td>
                    <td>
                      {request.document ? (
                        <a
                          href={`#${request.document}`} // Replace with the actual document URL
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon icon={faPaperclip} className="mr-1" />
                          {request.document}
                        </a>
                      ) : (
                        "No document attached"
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm mx-1"
                        onClick={() => handleDecline(request)} // Handle decline
                      >
                        Decline
                      </button>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleApprove(request)} // Handle approve
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-outline-dark mt-2">View</button>
          </div>
        </div>

        {/* Leave Request Form */}
        <div className="col-md-4">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-weight-bold">Request Leave</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>ID:</label>
                <input
                  type="text"
                  className="form-control"
                  name="empId"
                  value={formData.empId}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Reason:</label>
                <input
                  type="text"
                  className="form-control"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Number of Days Needed:</label>
                <input
                  type="number"
                  className="form-control"
                  name="daysNeeded"
                  value={formData.daysNeeded}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>
              <div className="form-group">
                <label>Start Date:</label>
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {formData.daysNeeded > 1 && (
                <div className="form-group">
                  <label>End Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}
              <div className="form-group">
                <label>Attach Document (Optional):</label>
                <input
                  type="file"
                  className="form-control"
                  name="document"
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-dark w-100 mt-2">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;