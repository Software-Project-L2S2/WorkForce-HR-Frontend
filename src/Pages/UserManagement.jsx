import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container, Table, Modal } from 'react-bootstrap';
import API from '../api';
const UserManagement = () => {
  // --- State Variables (No Changes) ---
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'admin',
  });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showHrProfileForm, setShowHrProfileForm] = useState(false);
  const [showWorkforceForm, setShowWorkforceForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [hrProfileForm, setHrProfileForm] = useState({
    HRId: '',
    Department: '',
    Gender: '',
    StartDate: '',
    Contact: '',
    Accounts: '',
    Email: ''
  });

  const [workforceProfileForm, setWorkforceProfileForm] = useState({
    WorkforceId: '',
    Department: '',
    JobTitle: '',
    JobCategory: '',
    Email: ''
  });
  
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [employeeDetailsForm, setEmployeeDetailsForm] = useState({
    Name: '',
    Designation: '',
    Department: '',
    Gender: '',
    StartDate: '',
    Age: '',
    Contact: '',
    Email: ''
  });

  // --- Functions (No Changes) ---
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/api/UserManagement/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setMessage('Failed to fetch users. Check if the API is running and the URL is correct.');
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (showTable) fetchUsers();
  }, [showTable]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleHrProfileChange = (e) => {
    setHrProfileForm({ ...hrProfileForm, [e.target.name]: e.target.value });
  };
  const handleWorkforceChange = (e) => {
    setWorkforceProfileForm({ ...workforceProfileForm, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setMessage('');
    
    try {
      if (isEditing) {
        const updatePayload = {
          email: form.email,
          role: form.role,
          firstName: form.firstName,
          lastName: form.lastName,
          phoneNumber: form.phoneNumber,
        };
        await API.put('/api/UserManagement/update-user', updatePayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage('User updated successfully.');
      } else {
        await API.post('/api/UserManagement/create-user', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage('User registered successfully.');
      }
      setSuccess(true);
      setForm({
        firstName: '', lastName: '', email: '', password: '', phoneNumber: '', role: 'admin',
      });
      setIsEditing(false);
      if (showTable) {
        fetchUsers();
      }
    } catch (err) {
      setMessage(err.response?.data?.message || err.response?.data || 'Action failed.');
      setSuccess(false);
    }
  };

  const handleHrProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await API.post('/api/UserManagement/add-hr-profile', hrProfileForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('HR profile added successfully.');
      setSuccess(true);
      setHrProfileForm({ HRId: '', Department: '', Gender: '', StartDate: '', Contact: '', Accounts: '', Email: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || err.response?.data || 'Failed to add HR profile.');
      setSuccess(false);
    }
  };

  const handleWorkforceSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await API.post('/api/UserManagement/add-workforce-details', workforceProfileForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Workforce profile added successfully.');
      setSuccess(true);
      setWorkforceProfileForm({
        WorkforceId: '', Department: '', JobTitle: '', JobCategory: '', Email: ''
      });
    } catch (err) {
      setMessage(err.response?.data?.message || err.response?.data || 'Failed to add Workforce profile.');
      setSuccess(false);
    }
  };

  const handleDelete = async (email, role) => {
    if (window.confirm(`Are you sure you want to delete the user with email: ${email}?`)) {
      try {
        const token = localStorage.getItem('token');
        await API.delete(`/api/UserManagement/delete-user`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { email, role },
        });
        setMessage('User deleted successfully.');
        setSuccess(true);
        fetchUsers();
      } catch (err) {
        setMessage(err.response?.data || 'Delete failed.');
        setSuccess(false);
      }
    }
  };

  const handleEdit = (user) => {
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: '',
      phoneNumber: user.phoneNumber,
      role: user.role,
    });
    setIsEditing(true);
    setShowForm(true);
    setShowTable(false);
    setShowHrProfileForm(false);
    setShowWorkforceForm(false);
  };
  
  const resetView = () => {
    setShowForm(false);
    setShowTable(false);
    setShowHrProfileForm(false);
    setShowWorkforceForm(false);
    setIsEditing(false);
    setMessage('');
    setForm({
      firstName: '', lastName: '', email: '', password: '', phoneNumber: '', role: 'admin',
    });
  };

  const handleShowEmployeeModal = (user) => {
    setEmployeeDetailsForm({
      Name: `${user.firstName} ${user.lastName}`,
      Email: user.email,
      Contact: user.phoneNumber,
      Designation: '',
      Department: '',
      Gender: '',
      StartDate: '',
      Age: '',
    });
    setShowEmployeeModal(true);
  };
  
  const handleCloseEmployeeModal = () => {
    setShowEmployeeModal(false);
  };
  
  const handleEmployeeDetailsChange = (e) => {
    setEmployeeDetailsForm({ ...employeeDetailsForm, [e.target.name]: e.target.value });
  };

  const handleEmployeeDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await API.post('/api/UserManagement/add-employee-details', employeeDetailsForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Employee details added successfully to the database.');
      setSuccess(true);
      handleCloseEmployeeModal();
    } catch (err) {
      setMessage(err.response?.data?.message || err.response?.data || 'Failed to add employee details.');
      setSuccess(false);
    }
  };

  // --- JSX Rendering (This is the corrected part) ---
  return (
    <Container>
      <h2 className="my-4">User Management</h2>
      {message && (
        <Alert variant={success ? 'success' : 'danger'} onClose={() => setMessage('')} dismissible>
          {message}
        </Alert>
      )}
      <div className="mb-3">
        <Button onClick={() => { resetView(); setShowForm(true); }}>Register User</Button>{' '}
        <Button onClick={() => { resetView(); setShowTable(true); }}>View Users</Button>{' '}
        <Button onClick={() => { resetView(); setShowHrProfileForm(true); }}>Add HR Profile</Button>{' '}
        <Button onClick={() => { resetView(); setShowWorkforceForm(true); }}>Add Workforce Profile</Button>
      </div>

      {/* CORRECTLY FORMATTED REGISTRATION FORM */}
      {showForm && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="firstName" value={form.firstName} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="lastName" value={form.lastName} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required readOnly={isEditing} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>{isEditing ? 'New Password (Leave blank to keep current)' : 'Password'}</Form.Label>
            <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required={!isEditing} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control as="select" name="role" value={form.role} onChange={handleChange} required disabled={isEditing}>
              <option value="admin">Admin</option>
              <option value="hr">HR</option>
              <option value="workforce">Workforce</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            {isEditing ? 'Update User' : 'Register User'}
          </Button>
          <Button variant="secondary" className="ms-2" onClick={resetView}>
            Cancel
          </Button>
        </Form>
      )}

      {showTable && (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.email}>
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.phoneNumber}</td>
                <td>{u.role}</td>
                <td>
                  <Button size="sm" variant="info" className="me-2" onClick={() => handleShowEmployeeModal(u)}>Add Profile</Button>
                  <Button size="sm" variant="warning" onClick={() => handleEdit(u)}>Edit</Button>{' '}
                  <Button size="sm" variant="danger" onClick={() => handleDelete(u.email, u.role)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      
      <Modal show={showEmployeeModal} onHide={handleCloseEmployeeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEmployeeDetailsSubmit}>
            <Form.Group className="mb-3" controlId="employeeName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="Name" value={employeeDetailsForm.Name} onChange={handleEmployeeDetailsChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeeDesignation">
              <Form.Label>Designation</Form.Label>
              <Form.Control type="text" name="Designation" value={employeeDetailsForm.Designation} onChange={handleEmployeeDetailsChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeeDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control type="text" name="Department" value={employeeDetailsForm.Department} onChange={handleEmployeeDetailsChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeeGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control type="text" name="Gender" value={employeeDetailsForm.Gender} onChange={handleEmployeeDetailsChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeeStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" name="StartDate" value={employeeDetailsForm.StartDate} onChange={handleEmployeeDetailsChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeeAge">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" name="Age" value={employeeDetailsForm.Age} onChange={handleEmployeeDetailsChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeeContact">
              <Form.Label>Contact</Form.Label>
              <Form.Control type="text" name="Contact" value={employeeDetailsForm.Contact} onChange={handleEmployeeDetailsChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="employeeEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="Email" value={employeeDetailsForm.Email} onChange={handleEmployeeDetailsChange} required readOnly />
            </Form.Group>
            <Button variant="primary" type="submit">Save Employee</Button>
            <Button variant="secondary" className="ms-2" onClick={handleCloseEmployeeModal}>Cancel</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UserManagement;