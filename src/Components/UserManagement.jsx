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
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No authentication token found. Please login again.');
        setSuccess(false);
        return;
      }

      const res = await API.get('/api/UserManagement/registered-users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      const errorMsg = err.response?.data?.message || err.response?.data || 'Failed to fetch users';
      setMessage(errorMsg);
      setSuccess(false);
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
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No authentication token found. Please login again.');
        setSuccess(false);
        setLoading(false);
        return;
      }

      // Validate form data
      if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.phoneNumber.trim()) {
        setMessage('All fields are required.');
        setSuccess(false);
        setLoading(false);
        return;
      }

      if (!isEditing && !form.password.trim()) {
        setMessage('Password is required for new users.');
        setSuccess(false);
        setLoading(false);
        return;
      }

      if (isEditing) {
        const updatePayload = {
          email: form.email,
          role: form.role.toLowerCase(), // Ensure lowercase
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          phoneNumber: form.phoneNumber.trim(),
        };

        console.log('Updating user with payload:', updatePayload);

        await API.put('/api/UserManagement/update-user', updatePayload, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        setMessage('User updated successfully.');
      } else {
        // For registration, ensure role is lowercase
        const registerPayload = {
          ...form,
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          phoneNumber: form.phoneNumber.trim(),
          role: form.role.toLowerCase()
        };

        console.log('Registering user with payload:', registerPayload);

        await API.post('/api/Auth/register-user', registerPayload, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
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
      
      // Refresh the user list if it's currently shown
      if (showTable) {
        await fetchUsers();
      }
    } catch (err) {
      console.error('Operation failed:', err);
      
      // More detailed error handling
      let errorMessage = 'Operation failed.';
      
      if (err.response) {
        // Server responded with error status
        if (err.response.status === 401) {
          errorMessage = 'Unauthorized. Please login again.';
        } else if (err.response.status === 403) {
          errorMessage = 'Access denied. You don\'t have permission to perform this action.';
        } else if (err.response.status === 409) {
          errorMessage = 'User with this email already exists.';
        } else if (err.response.data) {
          errorMessage = typeof err.response.data === 'string' 
            ? err.response.data 
            : err.response.data.message || JSON.stringify(err.response.data);
        }
      } else if (err.request) {
        // Network error
        errorMessage = 'Network error. Please check your connection.';
      }
      
      setMessage(errorMessage);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (email, role) => {
    if (!window.confirm(`Are you sure you want to delete user ${email}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No authentication token found. Please login again.');
        setSuccess(false);
        return;
      }

      // Fixed endpoint name to match backend
      await API.delete('/api/UserManagement/delete-user', {
        headers: { Authorization: `Bearer ${token}` },
        params: { email, role: role.toLowerCase() }, // Ensure lowercase
      });
      
      setMessage('User deleted successfully.');
      setSuccess(true);
      await fetchUsers();
    } catch (err) {
      console.error('Delete failed:', err);
      const errorMsg = err.response?.data?.message || err.response?.data || 'Delete failed.';
      setMessage(errorMsg);
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
      role: user.role.toLowerCase(), // Convert to lowercase for form
    });
    setIsEditing(true);
    setShowForm(true);
    setShowTable(false);
  };

  const resetForm = () => {
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      role: 'admin',
    });
    setIsEditing(false);
    setMessage('');
  };

  return (
    <Container style={{ marginTop: '100px', padding: '20px' }}>
      <h2>User Management</h2>

      {message && (
        <Alert variant={success ? 'success' : 'danger'} dismissible onClose={() => setMessage('')}>
          {message}
        </Alert>
      )}

      <div className="mb-3">
        <Button 
          onClick={() => { 
            resetForm();
            setShowForm(true); 
            setShowTable(false); 
          }}
          disabled={loading}
        >
          Register User
        </Button>{' '}
        <Button 
          onClick={() => { 
            setShowForm(false); 
            setShowTable(true); 
          }}
          disabled={loading}
        >
          View Users
        </Button>
        {showForm && (
          <Button 
            variant="secondary" 
            onClick={() => {
              resetForm();
              setShowForm(false);
            }}
            disabled={loading}
            className="ms-2"
          >
            Cancel
          </Button>
        )}
      </div>

      {showForm && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstName" className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group controlId="lastName" className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              readOnly={isEditing}
              disabled={loading}
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>{isEditing ? 'New Password (Optional)' : 'Password'}</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required={!isEditing}
              disabled={loading}
            />
          </Form.Group>

          <Form.Group controlId="phoneNumber" className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group controlId="role" className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              disabled={isEditing || loading}
            >
              <option value="admin">Admin</option>
              <option value="hr">HR</option>
              <option value="workforce">Workforce</option>
            </Form.Control>
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            disabled={loading}
          >
            {loading ? 'Processing...' : (isEditing ? 'Update User' : 'Register User')}
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
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No users found</td>
              </tr>
            ) : (
              users.map((u) => (
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
                      disabled={loading}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(u.email, u.role)}
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserManagement;