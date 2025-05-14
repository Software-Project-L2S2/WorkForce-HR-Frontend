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
  const [isEditing, setIsEditing] = useState(false);

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
        <Button onClick={() => { setShowForm(true); setShowTable(false); }}>
          Register User
        </Button>{' '}
        <Button onClick={() => { setShowForm(false); setShowTable(true); }}>
          View Users
        </Button>
      </div>

      {showForm && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              readOnly={isEditing}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>{isEditing ? 'New Password (Optional)' : 'Password'}</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required={!isEditing}
            />
          </Form.Group>

          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              disabled={isEditing}
            >
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
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleEdit(u)}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(u.email, u.role)}
                  >
                    Delete
                  </Button>
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
