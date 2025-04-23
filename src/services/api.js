
const API_BASE_URL = "http://localhost:5004/api";

export const getEmployees = async (filters = {}) => {
  try {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v != null)
    );
    const response = await fetch(`${API_BASE_URL}/Employee?${new URLSearchParams(cleanFilters)}`);
    if (!response.ok) throw new Error("Failed to fetch employees");
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const addEmployee = async (employee) => {
  try {
    const response = await fetch("http://localhost:5004/api/Employee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });
    if (!response.ok) {
      const errorData = await response.json(); // Parse server error message
      throw new Error(errorData.message || "Failed to add employee");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Rethrow for handling in the component
  }
};
export const getEmployeeHeadCount = async () => {
  try {
    const response =  await fetch(`${API_BASE_URL}/Employee/DepartmentHeadCount`);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Headcount error:", error);
    return [];
  }
};

export const searchEmployees = async (term) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Employee/search?term=${encodeURIComponent(term)}`);
    if (!response.ok) throw new Error("Search failed");
    return await response.json();
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};