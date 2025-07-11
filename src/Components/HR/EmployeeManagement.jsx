import React, { useState, useEffect } from "react";
import { getEmployees, searchEmployees, getEmployeeHeadCount } from "../../api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NavBar } from "../Navbar/NavBar";
//import { useAuth } from "./context/AuthContext";

export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const getRoleBadgeClass = (role) => {
  switch (role) {
    case "Admin": return "bg-danger";
    case "HR": return "bg-warning text-dark";
    default: return "bg-primary";
  }
};

export const EmployeeManagement = () => {
  //const { user } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [headCount, setHeadCount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ department:  "", employeeID: "" });

  useEffect(() => {
    fetchEmployees();
    fetchHeadCount();
  }, []);

 const fetchEmployees = async () => {
  try {
    setIsLoading(true);
    const data = filters.department || filters.employeeID
      ? await searchEmployees(filters)
      : await getEmployees();

    
    const safeData = Array.isArray(data) ? data : [];
    const normalizedData = safeData.map(emp => ({
      ...emp,
      startDate: formatDate(emp.startDate),
      email: emp.email || "",
    }));

    setEmployees(normalizedData);
  } catch (error) {
    alert("Error fetching employees: " + error.message);
    setEmployees([]); 
  } finally {
    setIsLoading(false);
  }
};

const fetchHeadCount = async () => {
  try {
    setIsLoading(true);
    const data = await getEmployeeHeadCount();
    setHeadCount(Array.isArray(data) ? data : []);
  } catch (error) {
    alert("Error loading department headcounts: " + error.message);
    setHeadCount([]); 
  } finally {
    setIsLoading(false);
  }
};


  const handleExportData = () => {
    const headers = ['Name', 'ID', 'Department', 'Job Title', 'Start Date', 'Category', 'Gender', 'Email'];
    const csvRows = [
      headers.join(','),
      ...employees.map(emp => [
        emp.employeeName,
        emp.employeeID,
        emp.department,
        emp.jobTitle,
        emp.startDate,
        emp.category,
        emp.gender,
        emp.email,
      ].join(','))
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'employees.csv');
    link.click();
  };

  return (
    <div className="workforce-container">
      <nav className="nav-container">
        <NavBar />
      </nav>

      <div className="d-flex justify-content-between align-items-center my-3">
        <button className="btn btn-success" onClick={handleExportData}>Export</button>
        <button className="btn btn-primary" onClick={() => setShowFilters(!showFilters)}>
          <i className="bi bi-filter"></i> Filter
        </button>
      </div>

      {showFilters && (
        <div className="card p-3 mb-3">
          <h6>Filter Employees</h6>
          <div className="row">
            {['department',  'employeeID'].map((field) => (
              <div className="col-md-4" key={field}>
                <input
                  type="text"
                  className="form-control"
                  placeholder={field.replace(/([A-Z])/g, ' $1').trim()}
                  value={filters[field]}
                  onChange={(e) => setFilters({ ...filters, [field]: e.target.value })}
                />
              </div>
            ))}
          </div>
          <div className="mt-2">
            <button className="btn btn-primary me-2" onClick={fetchEmployees}>Apply Filter</button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                setFilters({ department: "", employeeID: "" });
                fetchEmployees();
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      
      <div className="row gx-0">
       
        <div className="col-md-8">
          <div className="card shadow h-100  ">
            <div className="card-header bg-white">
              <h5>Employee Management</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover employee-table mb-0" 
                >
               
                  <thead className="table-light">
                    <tr>
                      {['Name', 'ID', 'Dept', 'Job Title', 'Start Date', 'Category', 'Gender', 'Email'].map(
                        (header) => (
                          <th key={header}>{header}</th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan="8" className="text-center">Loading...</td>
                      </tr>
                    ) : employees.length > 0 ? (
                      employees.map((emp, index) => (
                        <tr key={index}>
                          <td>{emp.employeeName}</td>
                          <td>{emp.employeeID}</td>
                          <td>{emp.department}</td>
                          <td>{emp.jobTitle}</td>
                          <td>{emp.startDate}</td>
                          <td>{emp.category}</td>
                          <td>{emp.gender}</td>
                          <td>{emp.email}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">No employees found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow h-100">
            <div className="card-header bg-white">
              <h5>Employee Head Count</h5>
            </div>
            <div className="card-body p-0">
          
              <table className="table  table-hover headcount-table mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Department</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="2" className="text-center">Loading...</td>
                    </tr>
                  ) : headCount.length > 0 ? (
                    headCount.map((dept, index) => (
                      <tr key={index}>
                        <td>{dept.department}</td>
                        <td>{dept.count}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
