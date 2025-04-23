import axios from "axios";

const API_BASE_URL = "http://localhost:5202/api/employee"; // Ensure correct backend port

// Fetch a Single Employee by ID
export const fetchEmployeeById = async (employeeId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${employeeId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee ${employeeId}:`, error);
    return null; // Return null if request fails
  }
};

// Fetch All Employees
export const fetchAllEmployees = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};

// Create a New Employee Profile
export const createEmployeeProfile = async (employeeData) => {
  try {
    const response = await axios.post(API_BASE_URL, employeeData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating employee profile:", error);
    return null;
  }
};

// Update an Employee Profile
export const updateEmployeeProfile = async (employeeId, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${employeeId}`, updatedData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating employee ${employeeId}:`, error);
    return null;
  }
};

// Delete an Employee Profile
export const deleteEmployeeProfile = async (employeeId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${employeeId}`);
    return true;
  } catch (error) {
    console.error(`Error deleting employee ${employeeId}:`, error);
    return false;
  }
};
