import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container, Table, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../api'; // Assuming API is your configured axios instance

const UserManagement = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', phoneNumber: '', role: 'admin' });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [employeeDetailsForm, setEmployeeDetailsForm] = useState({ Name: '', Designation: '', Department: '', Gender: '', StartDate: '', Age: '', Contact: '', Email: '' });

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      // This API call now returns the 'hasProfile' flag
      const res = await API.get('/api/UserManagement/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setMessage('Failed to fetch users. Check API connection.');
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (showTable) fetchUsers();
  }, [showTable]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEmployeeDetailsChange = (e) => setEmployeeDetailsForm({ ...employeeDetailsForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setMessage('');
    try {
      if (isEditing) {
        await API.put('/api/UserManagement/update-user', form, { headers: { Authorization: `Bearer ${token}` } });
        setMessage('User updated successfully.');
      } else {
        await API.post('/api/UserManagement/create-user', form, { headers: { Authorization: `Bearer ${token}` } });
        setMessage('User registered successfully.');
      }
      setSuccess(true);
      resetView();
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Action failed.');
      setSuccess(false);
    }
  };

  const handleDelete = async (email, role) => {
    if (window.confirm(`Are you sure you want to delete user: ${email}?`)) {
      try {
        const token = localStorage.getItem('token');
        await API.delete('/api/UserManagement/delete-user', { headers: { Authorization: `Bearer ${token}` }, params: { email, role } });
        setMessage('User deleted successfully.');
        setSuccess(true);
        fetchUsers();
      } catch (err) {
        setMessage(err.response?.data?.message || 'Delete failed.');
        setSuccess(false);
      }
    }
  };

  const handleEdit = (user) => {
    setForm({ ...user, password: '' });
    setIsEditing(true);
    setShowForm(true);
    setShowTable(false);
  };

  const resetView = () => {
    setShowForm(false);
    setShowTable(true);
    setIsEditing(false);
    setMessage('');
    setForm({ firstName: '', lastName: '', email: '', password: '', phoneNumber: '', role: 'admin' });
  };

  const handleShowEmployeeModal = (user) => {
    setEmployeeDetailsForm({
      Name: `${user.firstName} ${user.lastName}`, Email: user.email, Contact: user.phoneNumber,
      Designation: '', Department: '', Gender: '', StartDate: '', Age: '',
    });
    setShowEmployeeModal(true);
  };
  
  const handleCloseEmployeeModal = () => setShowEmployeeModal(false);

  const handleEmployeeDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await API.post('/api/UserManagement/add-employee-details', employeeDetailsForm, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('Employee details added successfully.');
      setSuccess(true);
      handleCloseEmployeeModal();
      fetchUsers(); // Refresh the user list to update the 'hasProfile' flag.
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add employee details.');
      setSuccess(false);
    }
  };

  // --- NAVIGATION LOGIC CHANGE ---
  // Navigates using the user's email address
  const handleViewProfile = (email) => {
    // URL-encode the email to handle special characters like '+'
    const encodedEmail = encodeURIComponent(email);
    navigate(`/employee/profile/${encodedEmail}`);
  };

  return (
    <Container>
      <h2 className="my-4">User Management</h2>
      {message && <Alert variant={success ? 'success' : 'danger'} onClose={() => setMessage('')} dismissible>{message}</Alert>}
      <div className="mb-3">
        <Button onClick={() => { setShowForm(true); setShowTable(false); setIsEditing(false); }}>Register User</Button>{' '}
        <Button onClick={resetView}>View Users</Button>
      </div>

      {showForm && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3"><Form.Label>First Name</Form.Label><Form.Control type="text" name="firstName" value={form.firstName} onChange={handleChange} required /></Form.Group>
          <Form.Group className="mb-3"><Form.Label>Last Name</Form.Label><Form.Control type="text" name="lastName" value={form.lastName} onChange={handleChange} required /></Form.Group>
          <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" name="email" value={form.email} onChange={handleChange} required readOnly={isEditing} /></Form.Group>
          {!isEditing && <Form.Group className="mb-3"><Form.Label>Password</Form.Label><Form.Control type="password" name="password" value={form.password} onChange={handleChange} required /></Form.Group>}
          <Form.Group className="mb-3"><Form.Label>Phone Number</Form.Label><Form.Control type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} /></Form.Group>
          <Form.Group className="mb-3"><Form.Label>Role</Form.Label><Form.Control as="select" name="role" value={form.role} onChange={handleChange} required disabled={isEditing}><option value="admin">Admin</option><option value="hr">HR</option><option value="workforce">Workforce</option></Form.Control></Form.Group>
          <Button variant="primary" type="submit">{isEditing ? 'Update User' : 'Register User'}</Button>
          <Button variant="secondary" className="ms-2" onClick={resetView}>Cancel</Button>
        </Form>
      )}

      {showTable && (
        <Table striped bordered hover responsive className="mt-4">
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.email}>
                <td>{u.firstName} {u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.phoneNumber}</td>
                <td>{u.role}</td>
                <td>
                  {/* --- BUTTON LOGIC CHANGE --- */}
                  {/* Uses 'hasProfile' flag to decide which button to show */}
                  {u.hasProfile ? (
                    <Button size="sm" variant="success" className="me-2" onClick={() => handleViewProfile(u.email)}>View Profile</Button>
                  ) : (
                    <Button size="sm" variant="info" className="me-2" onClick={() => handleShowEmployeeModal(u)}>Add Profile</Button>
                  )}
                  <Button size="sm" variant="warning" className="me-2" onClick={() => handleEdit(u)}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(u.email, u.role)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      
      <Modal show={showEmployeeModal} onHide={handleCloseEmployeeModal} centered>
        <Modal.Header closeButton><Modal.Title>Add Employee Details</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEmployeeDetailsSubmit}>
            <Form.Group className="mb-3"><Form.Label>Name</Form.Label><Form.Control type="text" name="Name" value={employeeDetailsForm.Name} readOnly /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" name="Email" value={employeeDetailsForm.Email} readOnly /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Contact</Form.Label><Form.Control type="text" name="Contact" value={employeeDetailsForm.Contact} onChange={handleEmployeeDetailsChange} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Designation</Form.Label><Form.Control type="text" name="Designation" value={employeeDetailsForm.Designation} onChange={handleEmployeeDetailsChange} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Department</Form.Label><Form.Control type="text" name="Department" value={employeeDetailsForm.Department} onChange={handleEmployeeDetailsChange} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Gender</Form.Label><Form.Control type="text" name="Gender" value={employeeDetailsForm.Gender} onChange={handleEmployeeDetailsChange} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Start Date</Form.Label><Form.Control type="date" name="StartDate" value={employeeDetailsForm.StartDate} onChange={handleEmployeeDetailsChange} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Age</Form.Label><Form.Control type="number" name="Age" value={employeeDetailsForm.Age} onChange={handleEmployeeDetailsChange} required /></Form.Group>
            <Button variant="primary" type="submit">Save Employee</Button>
            <Button variant="secondary" className="ms-2" onClick={handleCloseEmployeeModal}>Cancel</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UserManagement;