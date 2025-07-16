import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiBell, FiUser, FiLogOut, FiBook, FiStar, FiBriefcase, FiCalendar, FiMail, FiLink, FiEdit, FiTrash2, FiPlusCircle, FiUpload } from "react-icons/fi";
import { ProgressBar, OverlayTrigger, Tooltip, Modal, Button, Form, Alert } from "react-bootstrap";
import "./Employee.css";

const API_BASE_URL = "http://localhost:5202";

const EmployeeProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [employeeIdInput, setEmployeeIdInput] = useState('');
  
  // Get email from the URL parameters
  const { email } = useParams();
  const navigate = useNavigate();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editableProfile, setEditableProfile] = useState({});
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [currentEducation, setCurrentEducation] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // If an email is present in the URL, fetch the data automatically.
    if (email) {
      // Decode the email from the URL in case it has special characters
      const decodedEmail = decodeURIComponent(email);
      fetchEmployeeDataByEmail(decodedEmail);
    } else {
      // Clear data if no email is in the URL
      setEmployeeData(null);
    }
  }, [email]); // This effect re-runs whenever the email in the URL changes.

  const fetchEmployeeDataByEmail = async (emailToFetch) => {
    try {
      setLoading(true);
      setError(null);
      setEmployeeData(null);

      // Use the new API endpoint to fetch by email
      const response = await fetch(`${API_BASE_URL}/api/Employee/by-email/${emailToFetch}`);

      if (response.status === 404) {
        throw new Error(`Employee with email '${emailToFetch}' not found.`);
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const employee = await response.json();
      setEmployeeData(employee);
      setEditableProfile({ ...employee });
    } catch (error) {
      console.error("Error fetching employee data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

   

  // Separate fetch function for ID-based search
  const fetchEmployeeDataById = async (id) => {
    try {
      setLoading(true); setError(null); setEmployeeData(null);
      const response = await fetch(`${API_BASE_URL}/api/Employee/${id}`);
      if (!response.ok) throw new Error(`Employee with ID '${id}' not found.`);
      const employee = await response.json();
      setEmployeeData(employee);
      setEditableProfile({ ...employee });
    } catch (err) { setError(err.message); } 
    finally { setLoading(false); }
  }

  // ALL aCTIONS (Save, Delete, Upload) will now use employeeData.employeeID,
  // which is available after the initial fetch-by-email.
  
  const handleProfileSave = async (e) => {
    e.preventDefault();
    const { skills, education, projectAssignments, ...profileToUpdate } = editableProfile;
    // The profileToUpdate object already contains the correct employeeID
    try {
      const response = await fetch(`${API_BASE_URL}/api/Employee/${profileToUpdate.employeeID}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profileToUpdate) });
      if (!response.ok) throw new Error(await response.text());
      setEmployeeData(profileToUpdate); // Optimistic update
      setIsEditingProfile(false);
    } catch (err) { setError(`Failed to update profile: ${err.message}`); }
  };
  
  const handleSkillSave = async () => {
    const { employeeID } = employeeData; // Get ID from the fetched data
    const isNew = !currentSkill.skillID;
    const url = isNew ? `${API_BASE_URL}/api/Skills` : `${API_BASE_URL}/api/Skills/${currentSkill.skillID}`;
    const method = isNew ? 'POST' : 'PUT';
    const payload = { ...currentSkill, employeeID }; // Ensure correct employeeID
    try {
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error('Failed to save skill.');
      fetchEmployeeDataByEmail(employeeData.email); // Re-fetch all data
      setShowSkillModal(false);
    } catch (err) { setError(`Error saving skill: ${err.message}`); }
  };

  const handleEducationSave = async () => {
    const { employeeID } = employeeData; // Get ID from the fetched data
    const isNew = !currentEducation.educationID;
    const url = isNew ? `${API_BASE_URL}/api/Education` : `${API_BASE_URL}/api/Education/${currentEducation.educationID}`;
    const method = isNew ? 'POST' : 'PUT';
    const payload = { ...currentEducation, employeeID }; // Ensure correct employeeID
    try {
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error('Failed to save education.');
      fetchEmployeeDataByEmail(employeeData.email); // Re-fetch all data
      setShowEducationModal(false);
    } catch (err) { setError(`Error saving education: ${err.message}`); }
  };

  const handleEmployeeDelete = async () => {
    if (!employeeData?.employeeID) return;
    if (window.confirm(`Are you sure you want to delete ${employeeData.name}?`)) {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/Employee/${employeeData.employeeID}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(await response.text());
        alert("Employee deleted successfully.");
        navigate('/usermanagement'); // Navigate back to the user list
      } catch (err) { setError(`Failed to delete employee: ${err.message}`); setLoading(false); }
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !employeeData?.employeeID) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(`${API_BASE_URL}/api/Employee/${employeeData.employeeID}/upload-image`, { method: 'POST', body: formData });
      if (!response.ok) throw new Error(await response.text());
      const result = await response.json();
      setEmployeeData(prev => ({ ...prev, profileImage: result.profileImagePath }));
    } catch (err) { setError(`Image upload failed: ${err.message}`); }
  };
  
  const formatDateForInput = (dateString) => dateString ? new Date(dateString).toISOString().slice(0, 10) : "";
  const handleShowSkillModal = (skill = null) => { setCurrentSkill(skill || { skillName: '', description: '', level: 1 }); setShowSkillModal(true); };
  const handleShowEducationModal = (edu = null) => { setCurrentEducation(edu || { qualification: '' }); setShowEducationModal(true); };
  const handleProfileChange = (e) => setEditableProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // --- JSX Rendering (Complete and Unchanged in Structure) ---
  return (
    <div className="employee-profile-container">
      <nav className="navbar workforce-navbar"><div className="brand-section"><button className="menu-button" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>{isSidebarOpen ? <FiX /> : <FiMenu />}</button></div><div className="nav-menu">{["Employee", "Projects", "LeaveManagement", "Feedback", "Settings"].map((item) => (<Link key={item} to={`/${item.toLowerCase()}`} className="nav-item">{item}</Link>))}</div><div className="nav-controls"><FiBell className="nav-icon" /><FiUser className="nav-icon" /><FiLogOut className="nav-icon" /></div></nav>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}><div className="sidebar-content"><h3 className="sidebar-title">Quick Menu</h3><ul className="sidebar-menu">{["Settings", "Documents", "Reports", "Help Center"].map((item) => (<li key={item}><a href="#" className="menu-link">{item}</a></li>))}</ul></div></div>
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />}
      
      

      <div className="profile-main-content">
        {loading && <div className="loading">Loading Profile...</div>}
        {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
        
        {!loading && !employeeData && !error && (
            <div className="text-center p-5"><h2>Employee Profile</h2><p>Please select an employee from the User Management page or search by ID above.</p></div>
        )}

        {!loading && employeeData && (
            <div className="profile-content">
              <div className="profile-left">
                <section className="employee-details">
                  <div className="avatar-section"><img src={employeeData.profileImage ? `${API_BASE_URL}${employeeData.profileImage}` : "/default-avatar.png"} alt="Profile" className="profile-employee" onClick={() => fileInputRef.current?.click()} /><div className="avatar-upload-overlay" onClick={() => fileInputRef.current?.click()}><FiUpload className="upload-icon"/> Change Photo</div><input type="file" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} accept="image/*"/></div>
                  <div className="profile-header"><h2><FiUser className="title-icon"/> {employeeData.name} - {employeeData.designation}</h2>{!isEditingProfile ? (<Button variant="outline-primary" size="sm" onClick={() => setIsEditingProfile(true)}><FiEdit/> Edit</Button>) : (<div><Button variant="success" size="sm" onClick={handleProfileSave} className="me-2">Save</Button><Button variant="secondary" size="sm" onClick={() => setIsEditingProfile(false)}>Cancel</Button></div>)}</div>
                  <Form onSubmit={handleProfileSave}><div className="detail-grid">{[{ label: "Name", key: "name", icon: FiUser, type: "text" },{ label: "Designation", key: "designation", icon: FiUser, type: "text" },{ label: "Department", key: "department", icon: FiBriefcase, type: "text" },{ label: "Gender", key: "gender", icon: FiUser, type: "text" },{ label: "Start Date", key: "startDate", icon: FiCalendar, type: "date" },{ label: "Age", key: "age", icon: FiUser, type: "number" },{ label: "Contact", key: "contact", icon: FiLink, type: "text" },{ label: "Email", key: "email", icon: FiMail, type: "email" }].map(item => (<div key={item.key} className="detail-item"><item.icon className="detail-icon" /><div><span className="detail-label">{item.label} - </span>{isEditingProfile ? (<Form.Control type={item.type} name={item.key} value={item.type === 'date' ? formatDateForInput(editableProfile[item.key]) : (editableProfile[item.key] || '')} onChange={handleProfileChange} />) : (<span className="detail-value">{item.type === 'date' ? formatDateForInput(employeeData[item.key]) : (employeeData[item.key] || "N/A")}</span>)}</div></div>))}</div></Form>
                  <section className="education-section"><div className="section-header"><h2><FiBook/> Education</h2><Button variant="outline-success" size="sm" onClick={() => handleShowEducationModal()}><FiPlusCircle/> Add</Button></div><div className="education-list">{employeeData.education?.length ? (employeeData.education.map(edu => (<div key={edu.educationID} className="education-item"><span>🎓 {edu.qualification}</span><div className="item-actions"><FiEdit className="action-icon" onClick={() => handleShowEducationModal(edu)} /><FiTrash2 className="action-icon" onClick={() => handleEducationDelete(edu.educationID)} /></div></div>))) : <div className="no-data">No education records found.</div>}</div></section>
                </section>
              </div>
              <div className="profile-right">
                <section className="skills-section"><div className="section-header"><h2><FiStar/> Skills</h2><Button variant="outline-success" size="sm" onClick={() => handleShowSkillModal()}><FiPlusCircle/> Add</Button></div><div className="skills-table-container"><table className="skills-table"><thead><tr><th>Skill</th><th>Description</th><th>Level</th><th>Actions</th></tr></thead><tbody>{employeeData.skills?.length ? (employeeData.skills.map(skill => (<tr key={skill.skillID}><td>{skill.skillName}</td><td>{skill.description}</td><td><OverlayTrigger placement="top" overlay={<Tooltip>{skill.level}/5</Tooltip>}><ProgressBar now={(skill.level / 5) * 100} label={`${skill.level}/5`} /></OverlayTrigger></td><td className="item-actions"><FiEdit className="action-icon" onClick={() => handleShowSkillModal(skill)} /><FiTrash2 className="action-icon" onClick={() => handleSkillDelete(skill.skillID)} /></td></tr>))) : (<tr><td colSpan="4" className="no-data">No skills found.</td></tr>)}</tbody></table></div></section>
              </div>
            </div>
        )}
        {!loading && employeeData && (<OverlayTrigger placement="top" overlay={<Tooltip>Delete Employee</Tooltip>}><Button variant="danger" className="delete-employee-fab" onClick={handleEmployeeDelete}><FiTrash2 /></Button></OverlayTrigger>)}
      </div>
      <Modal show={showSkillModal} onHide={() => setShowSkillModal(false)}><Modal.Header closeButton><Modal.Title>{currentSkill?.skillID ? 'Edit' : 'Add'} Skill</Modal.Title></Modal.Header><Modal.Body><Form><Form.Group className="mb-3"><Form.Label>Skill</Form.Label><Form.Control type="text" value={currentSkill?.skillName || ''} onChange={e => setCurrentSkill({...currentSkill, skillName: e.target.value})} /></Form.Group><Form.Group className="mb-3"><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={3} value={currentSkill?.description || ''} onChange={e => setCurrentSkill({...currentSkill, description: e.target.value})} /></Form.Group><Form.Group><Form.Label>Level (1-5)</Form.Label><Form.Control type="number" min="1" max="5" value={currentSkill?.level || 1} onChange={e => setCurrentSkill({...currentSkill, level: e.target.value})} /></Form.Group></Form></Modal.Body><Modal.Footer><Button variant="secondary" onClick={() => setShowSkillModal(false)}>Close</Button><Button variant="primary" onClick={handleSkillSave}>Save</Button></Modal.Footer></Modal>
      <Modal show={showEducationModal} onHide={() => setShowEducationModal(false)}><Modal.Header closeButton><Modal.Title>{currentEducation?.educationID ? 'Edit' : 'Add'} Education</Modal.Title></Modal.Header><Modal.Body><Form><Form.Group><Form.Label>Qualification</Form.Label><Form.Control type="text" value={currentEducation?.qualification || ''} onChange={e => setCurrentEducation({...currentEducation, qualification: e.target.value})} /></Form.Group></Form></Modal.Body><Modal.Footer><Button variant="secondary" onClick={() => setShowEducationModal(false)}>Close</Button><Button variant="primary" onClick={handleEducationSave}>Save</Button></Modal.Footer></Modal>
    </div>
  );
};

export default EmployeeProfile;