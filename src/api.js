import axios from 'axios';

const API_URL = 'http://localhost:5164/api';



export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};


export const isAuthenticated = () => {
  return !!getAuthToken();
};


const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Authentication token expired or invalid. Redirecting to login...');
   
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      
     
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


const handleApiError = (error) => {
  console.error('API Error:', error);
  if (error.response) {

    console.error('Response data:', error.response.data);
    console.error('Status code:', error.response.status);
    
    if (error.response.status !== 401) {
      throw new Error(error.response.data.message || 'Server error occurred');
    }
  } else if (error.request) {
    
    console.error('No response received:', error.request);
    throw new Error('No response from server. Please check your connection.');
  } else {
    
    console.error('Request error:', error.message);
    throw new Error('Error in request setup: ' + error.message);
  }
};

// Login function
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/Auth/login`, credentials);
    
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userRole', response.data.role);
      console.log('Login successful, token stored');
    }
    
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  window.location.href = '/login';
};

// Get all employees
export const getEmployees = async () => {
  try {
    const response = await apiClient.get('/employees');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Search employees with filters
export const searchEmployees = async (filters) => {
  try {
    const response = await apiClient.get('/employees', { params: filters });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Add new employee
export const addEmployee = async (employeeData) => {
  try {
    const response = await apiClient.post('/employees', employeeData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get department headcount
export const getEmployeeHeadCount = async () => {
  try {
    const response = await apiClient.get('/employees/headcount');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update employee
export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await apiClient.put(`/employees/${id}`, employeeData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete employee
export const deleteEmployee = async (id) => {
  try {
    const response = await apiClient.delete(`/employees/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get employee by ID
export const getEmployeeById = async (id) => {
  try {
    const response = await apiClient.get(`/employees/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Create project
export const createProject = async (projectData) => {
  try {
    const response = await apiClient.post('/projects', projectData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export default {
  getEmployees,
  searchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployeeHeadCount,
  createProject,
  login,
  logout,
  isAuthenticated,
  getAuthToken
};
