import React, { useState } from 'react'; // Import useState for managing fields
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faUser, faCamera, faBell, faSignOutAlt, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import required icons

export const Employeeprofile = ({ className, ...props }) => {
  const notifications = [
    { id: 1, message: 'New message from John', time: '2 hours ago' },
    { id: 2, message: 'Your project deadline is approaching', time: '5 hours ago' },
    { id: 3, message: 'You have a new follower', time: '1 day ago' },
  ];

  // State to manage skills
  const [skills, setSkills] = useState([
    { skill: "Communications", desc: "Verbal and written skills", level: 4 },
    { skill: "Coding", desc: "Programming knowledge", level: 5 },
    { skill: "Designing", desc: "UI/UX and graphics design", level: 3 },
    { skill: "Leadership", desc: "Team management", level: 3 },
  ]);

  // State to manage editable fields
  const [department, setDepartment] = useState('Design & Marketing');
  const [contact, setContact] = useState('0762452509');
  const [email, setEmail] = useState('example@gmail.com');
  const [accounts, setAccounts] = useState('GitHub, LinkedIn');

  // State to manage education qualifications
  const [qualifications, setQualifications] = useState([
    'IT Degree (Bcs Hons)',
    'ComptTia A+',
    'Full stack course',
  ]);

  // State to manage the selected field for editing
  const [selectedField, setSelectedField] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Function to handle adding a new skill
  const handleAddSkill = () => {
    const newSkill = prompt('Enter a new skill:');
    const newDesc = prompt('Enter a description for the skill:');
    const newLevel = parseInt(prompt('Enter the skill level (1-5):'), 10);

    if (newSkill && newDesc && newLevel >= 1 && newLevel <= 5) {
      setSkills([...skills, { skill: newSkill, desc: newDesc, level: newLevel }]);
    } else {
      alert('Invalid input. Please try again.');
    }
  };

  // Function to handle removing a skill
  const handleRemoveSkill = (skillToRemove) => {
    const isConfirmed = window.confirm('Are you sure you want to remove this skill?');
    if (isConfirmed) {
      setSkills(skills.filter((skill) => skill.skill !== skillToRemove));
    }
  };

  // Function to handle opening the edit modal for fields
  const handleEditField = (field) => {
    setSelectedField(field);
    setShowEditModal(true);
  };

  // Function to handle saving the edited field
  const handleSaveEdit = () => {
    const newValue = prompt(`Enter new value for ${selectedField}:`);
    if (newValue) {
      switch (selectedField) {
        case 'Department':
          setDepartment(newValue);
          break;
        case 'Contact':
          setContact(newValue);
          break;
        case 'Email':
          setEmail(newValue);
          break;
        case 'Accounts':
          setAccounts(newValue);
          break;
        default:
          break;
      }
      setShowEditModal(false);
    }
  };

  // Function to handle closing the edit modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  // Function to handle editing skills
  const handleEditSkill = (skill) => {
    const newLevel = parseInt(prompt(`Enter the new level for ${skill.skill} (1-5):`), 10);
    if (newLevel >= 1 && newLevel <= 5) {
      const updatedSkills = skills.map((s) =>
        s.skill === skill.skill ? { ...s, level: newLevel } : s
      );
      setSkills(updatedSkills);
    } else {
      alert('Invalid input. Please enter a level between 1 and 5.');
    }
  };

  // Function to handle adding new qualifications
  const handleAddQualification = () => {
    const newQualification = prompt('Enter a new qualification:');
    if (newQualification) {
      setQualifications([...qualifications, newQualification]);
    }
  };

  // Function to handle changing profile picture
  const handleChangeProfilePicture = () => {
    const newProfilePicture = prompt('Enter the URL of your new profile picture:');
    if (newProfilePicture) {
      alert(`Profile picture updated to: ${newProfilePicture}`);
      // You can update the state here to change the profile picture
    }
  };

  // Placeholder for profile picture
  const profilePicture = null; // Set this to the user's profile picture URL or null if not uploaded

  return (
    <div className={`employee-profile ${className}`} style={{ 
      minHeight: '100vh', 
      overflow: 'hidden', 
      backgroundColor: '#f0f8ff' // This is a whiter blue color
    }}>
      {/* Header Section */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 w-100">
        <a className="navbar-brand font-weight-bold" href="#">Dashboard</a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center flex-grow-1" id="navbarNav">
          <ul className="navbar-nav w-100 d-flex justify-content-around">
            {["Workforce", "Employee Directory", "Job", "Projects"].map((item) => (
              <li className="nav-item" key={item}>
                <a className="nav-link font-weight-bold" href="#" style={{ fontSize: '1.1rem', fontWeight: '600' }}>{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side Icons */}
        <div className="d-flex align-items-center">
          {/* Notification Bell Icon */}
          <div className="dropdown mx-3">
            <a
              className="nav-link dropdown-toggle font-weight-bold"
              href="#"
              id="notificationDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ fontSize: '1.1rem', fontWeight: '600' }}
            >
              <FontAwesomeIcon icon={faBell} className="mr-1" />
              <span className="badge badge-danger badge-pill">{notifications.length}</span>
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="notificationDropdown">
              <h6 className="dropdown-header">Notifications</h6>
              {notifications.map(({ id, message, time }) => (
                <a key={id} className="dropdown-item" href="#">
                  <strong>{message}</strong>
                  <div className="text-muted">{time}</div>
                </a>
              ))}
              <div className="dropdown-divider"></div>
              <a className="dropdown-item text-center" href="#">View all notifications</a>
            </div>
          </div>

          {/* Profile Picture or Default Icon */}
          {profilePicture ? (
            <img src={profilePicture} alt="profile" className="rounded-circle mx-3" width="40" height="40" />
          ) : (
            <FontAwesomeIcon icon={faUser} className="rounded-circle mx-3" style={{ width: '40px', height: '40px', color: '#007bff' }} />
          )}

          {/* Logout Icon */}
          <FontAwesomeIcon icon={faSignOutAlt} className="mx-3" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => alert('Logging out...')} />
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Left - Employee Profile */}
          <div className="col-md-4">
            <div className="p-3 bg-white rounded shadow" style={{ height: 'calc(100vh - 100px)' }}>
              <div className="text-center position-relative">
                {profilePicture ? (
                  <img src={profilePicture} alt="profile" className="rounded-circle mb-3" width="100" height="100" />
                ) : (
                  <FontAwesomeIcon icon={faUser} className="rounded-circle mb-3" style={{ width: '100px', height: '100px', color: '#007bff' }} />
                )}
                {/* Edit Icon for Profile Picture */}
                <div
                  className="position-absolute"
                  style={{ bottom: '10px', right: '30%', cursor: 'pointer' }}
                  onClick={handleChangeProfilePicture}
                >
                  <FontAwesomeIcon icon={faCamera} className="bg-primary text-white p-2 rounded-circle" />
                </div>
                <h4 className="font-weight-bold">Pawan Hasthika</h4>
                <p className="text-muted">UI UX Designer</p>
              </div>

              <hr />

              <div className="mb-3">
                {/* Department */}
                <div className="d-flex justify-content-between align-items-center">
                  <p><strong>Department:</strong> {department}</p>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-primary cursor-pointer"
                    onClick={() => handleEditField('Department')}
                  />
                </div>

                {/* Gender */}
                <div className="d-flex justify-content-between align-items-center">
                  <p><strong>Gender:</strong> Male</p>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-primary cursor-pointer"
                    onClick={() => handleEditField('Gender')}
                  />
                </div>

                {/* Start Date */}
                <div className="d-flex justify-content-between align-items-center">
                  <p><strong>Start Date:</strong> 2019/10/05</p>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-primary cursor-pointer"
                    onClick={() => handleEditField('Start Date')}
                  />
                </div>

                {/* Age */}
                <div className="d-flex justify-content-between align-items-center">
                  <p><strong>Age:</strong> 26</p>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-primary cursor-pointer"
                    onClick={() => handleEditField('Age')}
                  />
                </div>

                {/* Contact */}
                <div className="d-flex justify-content-between align-items-center">
                  <p><strong>Contact:</strong> {contact}</p>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-primary cursor-pointer"
                    onClick={() => handleEditField('Contact')}
                  />
                </div>

                {/* Email */}
                <div className="d-flex justify-content-between align-items-center">
                  <p><strong>Email:</strong> {email}</p>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-primary cursor-pointer"
                    onClick={() => handleEditField('Email')}
                  />
                </div>

                {/* Accounts */}
                <div className="d-flex justify-content-between align-items-center">
                  <p><strong>Accounts:</strong> {accounts}</p>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-primary cursor-pointer"
                    onClick={() => handleEditField('Accounts')}
                  />
                </div>
              </div>

              <hr />

              {/* Education Qualifications */}
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="font-weight-bold">Education Qualifications</h5>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-primary cursor-pointer"
                  onClick={handleAddQualification}
                />
              </div>
              <ul className="list-unstyled">
                {qualifications.map((qualification, index) => (
                  <li key={index}>• {qualification}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right - Skills Section */}
          <div className="col-md-8">
            <div className="p-3 bg-white rounded shadow">
              <h3 className="font-weight-bold">Skills and Levels</h3>
              <table className="table mt-3">
                <thead className="thead-light">
                  <tr>
                    <th>Skills</th>
                    <th>Description</th>
                    <th>Level</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.map(({ skill, desc, level }) => (
                    <tr key={skill}>
                      <td>{skill}</td>
                      <td>{desc}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div style={{ width: '80px', height: '8px', backgroundColor: '#ddd', borderRadius: '4px' }}>
                            <div style={{
                              width: `${level * 20}%`, height: '100%',
                              backgroundColor: level >= 4 ? 'green' : 'orange',
                              borderRadius: '4px'
                            }}></div>
                          </div>
                          <span className="ml-2">{level}</span>
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary mr-2"
                          onClick={() => handleEditSkill({ skill, desc, level })}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemoveSkill(skill)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Add More Button */}
              <button className="btn btn-primary mt-3" onClick={handleAddSkill}>
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add More
              </button>
            </div>

            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-danger mx-2">Remove</button>
              <button className="btn btn-success">Promotion</button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Field Modal */}
      {showEditModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit {selectedField}</h5>
                <button type="button" className="close" onClick={handleCloseEditModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <button className="btn btn-primary" onClick={handleSaveEdit}>
                  Edit {selectedField}
                </button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseEditModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employeeprofile;