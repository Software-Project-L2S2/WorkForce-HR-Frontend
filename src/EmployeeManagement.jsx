import React, { useState, useEffect } from "react";
import { getEmployees, searchEmployees, getEmployeeHeadCount, addEmployee as apiAddEmployee } from "./services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NavBar } from "./Navbar/NavBar";

export const EmployeeManagement = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [headCount, setHeadCount] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({ department: "", jobTitle: "", employeeID: "" });
    const [newEmployee, setNewEmployee] = useState({
        employeeName: "",
        employeeID: "",
        department: "",
        jobTitle: "",
        startDate: "",
        category: "Full-Time",
        gender: "Male"
    });

    useEffect(() => {
        fetchEmployees();
        fetchHeadCount();
    }, []);

    const fetchEmployees = async () => {
        try {
            const data = filters.department || filters.jobTitle || filters.employeeID
                ? await searchEmployees(filters)
                : await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching employees:", error);
            alert("Error fetching employees: " + error.message);
        }
    };

    const fetchHeadCount = async () => {
        try {
            setIsLoading(true);
            const data = await getEmployeeHeadCount();
            console.log('Headcount Data:', data);
            setHeadCount(data);
        } catch (error) {
            console.error("Error fetching headcount:", error);
            alert("Error loading department headcounts: " + error.message);
            setHeadCount([])
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddEmployee = async () => {
        try {
            const requiredFields = ['employeeName', 'employeeID', 'department', 'jobTitle', 'startDate'];
            requiredFields.forEach(field => {
                if (!newEmployee[field]?.toString().trim()) {
                    throw new Error(`${field.replace(/([A-Z])/g, ' $1')} is required`);
                }
            });

            const isoDate = new Date(newEmployee.startDate).toISOString();
            

            const payload = {
                EmployeeName: newEmployee.employeeName,
                EmployeeID: newEmployee.employeeID,
                Department: newEmployee.department,
                JobTitle: newEmployee.jobTitle,
                StartDate: isoDate,
                Category: newEmployee.category,
                Gender: newEmployee.gender
              };

            const savedEmployee = await apiAddEmployee(payload);
            setEmployees(prev => [...prev, savedEmployee]);
            setShowAddModal(false);
            await fetchHeadCount();
            
            setNewEmployee({
                employeeName: "",
                employeeID: "",
                department: "",
                jobTitle: "",
                startDate: "",
                category: "Full-Time",
                gender: "Male"
            });
        } catch (error) {
            alert("Error adding employee: " + error.message);
        }
    };

    return (
       <div className="workforce-container">
             <nav className="nav-container">
                   <NavBar/>
                   </nav>
       

            <div className="d-flex justify-content-between align-items-center my-3">
                <button className="btn btn-success">Export</button>
                <button className="btn btn-primary" onClick={() => setShowFilters(!showFilters)}>
                    <i className="bi bi-filter"></i> Filter
                </button>
            </div>

            {showFilters && (
                <div className="card p-3 mb-3">
                    <h6>Filter Employees</h6>
                    <div className="row">
                        {['department', 'jobTitle', 'employeeID'].map((field) => (
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
                    <button className="btn btn-primary mt-2" onClick={fetchEmployees}>Apply Filter</button>
                </div>
            )}

            <div className="row">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-header bg-white d-flex justify-content-between align-items-center">
                            <h5>Employee Management</h5>
                            <button className="btn btn-sm btn-primary" onClick={() => setShowAddModal(true)}>
                                <i className="bi bi-person-plus"></i> Add Employee
                            </button>
                        </div>
                        <div className="card-body p-0">
                            <table className="table table-hover">
                                <thead className="table-light">
                                    <tr>
                                        {['Name', 'ID', 'Dept', 'Job Title', 'Start Date', 'Category', 'Gender'].map(
                                            (header) => (
                                                <th key={header}>{header}</th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.length > 0 ? (
                                        employees.map((emp, index) => (
                                            <tr key={index}>
                                                {['employeeName', 'employeeID', 'department', 'jobTitle', 'startDate', 'category', 'gender'].map(
                                                    (field) => (
                                                        <td key={field}>{emp[field]}</td>
                                                    )
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center">No employees found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-header bg-white">
                            <h5>Employee Head Count</h5>
                        </div>
                        <div className="card-body p-0">
                        <table className="table">
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

            {showAddModal && (
                <div className="modal d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Employee</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                {[
                                    { key: 'employeeName', label: 'Employee Name', type: 'text' },
                                    { key: 'employeeID', label: 'Employee ID', type: 'text' },
                                    { key: 'department', label: 'Department', type: 'text' },
                                    { key: 'jobTitle', label: 'Job Title', type: 'text' },
                                    { 
                                        key: 'startDate', 
                                        label: 'Start Date', 
                                        type: 'date',
                                        pattern: '\\d{4}-\\d{2}-\\d{2}'
                                    },
                                    { 
                                        key: 'category', 
                                        label: 'Category', 
                                        type: 'select',
                                        options: ['Full-Time', 'Part-Time', 'Contractor']
                                    },
                                    { 
                                        key: 'gender', 
                                        label: 'Gender', 
                                        type: 'select',
                                        options: ['Male', 'Female', 'Other']
                                    }
                                ].map((field) => (
                                    <div className="mb-3" key={field.key}>
                                        <label className="form-label">{field.label}</label>
                                        {field.type === 'select' ? (
                                            <select
                                                className="form-select"
                                                value={newEmployee[field.key]}
                                                onChange={(e) => setNewEmployee({
                                                    ...newEmployee,
                                                    [field.key]: e.target.value
                                                })}
                                            >
                                                {field.options.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type={field.type}
                                                className="form-control"
                                                required={['employeeName', 'employeeID', 'startDate'].includes(field.key)}
                                                value={newEmployee[field.key]}
                                                onChange={(e) => setNewEmployee({
                                                    ...newEmployee,
                                                    [field.key]: e.target.value
                                                })}
                                                {...(field.type === 'date' && {
                                                    pattern: field.pattern,
                                                    onKeyDown: (e) => e.preventDefault()
                                                })}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleAddEmployee}>Add Employee</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeManagement;