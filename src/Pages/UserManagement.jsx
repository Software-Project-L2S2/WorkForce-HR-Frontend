import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Container, Table } from 'react-bootstrap';
import API from '../api';

const UserManagement = () => {
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
  //new
   const [showHrProfileForm, setShowHrProfileForm] = useState(false);
   const [showWorkforceForm, setShowWorkforceForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


//new
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

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/api/UserManagement/registered-users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  useEffect(() => {
    if (showTable) fetchUsers();
  }, [showTable]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
//new
const handleHrProfileChange = (e) => {
    setHrProfileForm({ ...hrProfileForm, [e.target.name]: e.target.value });
  };

  const handleWorkforceChange = (e) => {
  setWorkforceProfileForm({ ...workforceProfileForm, [e.target.name]: e.target.value });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
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
        await API.post('/api/Auth/register-user', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage('User registered successfully.');
      }

      setSuccess(true);
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'admin',
      });
      setIsEditing(false);
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data || 'Action failed.');
      setSuccess(false);
    }
  };


  //new

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
      setMessage(err.response?.data || 'Failed to add HR profile.');
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
      WorkforceId: '',
      Department: '',
      JobTitle: '',
      JobCategory: '',
      Email: ''
    });
  } catch (err) {
    setMessage(err.response?.data || 'Failed to add Workforce profile.');
    setSuccess(false);
  }
};





  const handleDelete = async (email, role) => {
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
  };

  return (
    <Container>
      <h2>User Management</h2>

      {message && (
        <Alert variant={success ? 'success' : 'danger'}>{message}</Alert>
      )}

      <div className="mb-3">
    <Button onClick={() => { setShowForm(true); setShowTable(false); setShowHrProfileForm(false); setShowWorkforceForm(false); }}>
    Register User
  </Button>{' '}
  <Button onClick={() => { setShowForm(false); setShowTable(true); setShowHrProfileForm(false); setShowWorkforceForm(false); }}>
    View Users
  </Button>{' '}
  <Button onClick={() => { setShowForm(false); setShowTable(false); setShowHrProfileForm(true); setShowWorkforceForm(false); }}>
    Add HR Profile
  </Button>{' '}
  <Button onClick={() => { setShowForm(false); setShowTable(false); setShowHrProfileForm(false); setShowWorkforceForm(true); }}>
    Add Workforce Profile
  </Button>
      </div>

      {showForm && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="firstName" value={form.firstName} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="lastName" value={form.lastName} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required readOnly={isEditing} />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>{isEditing ? 'New Password (Optional)' : 'Password'}</Form.Label>
            <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required={!isEditing} />
          </Form.Group>
          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="role">
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
        </Form>
      )}

      {showHrProfileForm && (
        <Form onSubmit={handleHrProfileSubmit}>
          <Form.Group controlId="Email">
            <Form.Label>HR Email</Form.Label>
            <Form.Control type="email" name="Email" value={hrProfileForm.Email} onChange={handleHrProfileChange} required />
          </Form.Group>
          <Form.Group controlId="HRId">
            <Form.Label>HR ID</Form.Label>
            <Form.Control type="text" name="HRId" value={hrProfileForm.HRId} onChange={handleHrProfileChange} required />
          </Form.Group>
          <Form.Group controlId="Department">
            <Form.Label>Department</Form.Label>
            <Form.Control type="text" name="Department" value={hrProfileForm.Department} onChange={handleHrProfileChange} required />
          </Form.Group>
          <Form.Group controlId="Gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control type="text" name="Gender" value={hrProfileForm.Gender} onChange={handleHrProfileChange} required />
          </Form.Group>
          <Form.Group controlId="StartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" name="StartDate" value={hrProfileForm.StartDate} onChange={handleHrProfileChange} required />
          </Form.Group>
          <Form.Group controlId="Contact">
            <Form.Label>Contact</Form.Label>
            <Form.Control type="text" name="Contact" value={hrProfileForm.Contact} onChange={handleHrProfileChange} required />
          </Form.Group>
          <Form.Group controlId="Accounts">
            <Form.Label>Accounts</Form.Label>
            <Form.Control type="text" name="Accounts" value={hrProfileForm.Accounts} onChange={handleHrProfileChange} required />
          </Form.Group>
          <Button type="submit">Add HR Profile</Button>
        </Form>
      )}


      {showWorkforceForm && (
  <Form onSubmit={handleWorkforceSubmit}>
    <Form.Group controlId="Email">
      <Form.Label>Workforce Email</Form.Label>
      <Form.Control type="email" name="Email" value={workforceProfileForm.Email} onChange={handleWorkforceChange} required />
    </Form.Group>
    <Form.Group controlId="WorkforceId">
      <Form.Label>Workforce ID</Form.Label>
      <Form.Control type="text" name="WorkforceId" value={workforceProfileForm.WorkforceId} onChange={handleWorkforceChange} required />
    </Form.Group>
    <Form.Group controlId="Department">
      <Form.Label>Department</Form.Label>
      <Form.Control type="text" name="Department" value={workforceProfileForm.Department} onChange={handleWorkforceChange} required />
    </Form.Group>
    <Form.Group controlId="JobTitle">
      <Form.Label>Job Title</Form.Label>
      <Form.Control type="text" name="JobTitle" value={workforceProfileForm.JobTitle} onChange={handleWorkforceChange} required />
    </Form.Group>
    <Form.Group controlId="JobCategory">
      <Form.Label>Job Category</Form.Label>
      <Form.Control type="text" name="JobCategory" value={workforceProfileForm.JobCategory} onChange={handleWorkforceChange} required />
    </Form.Group>
    <Button type="submit">Add Workforce Profile</Button>
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
                  <Button size="sm" variant="warning" onClick={() => handleEdit(u)}>Edit</Button>{' '}
                  <Button size="sm" variant="danger" onClick={() => handleDelete(u.email, u.role)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserManagement;
