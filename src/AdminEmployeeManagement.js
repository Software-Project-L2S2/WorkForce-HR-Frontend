import React, { useState, useEffect } from "react";
import { getEmployees, addEmployee } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NavBar } from "./Navbar/NavBar";

const initialForm = {
  employeeName: "",
  employeeID: "",
  department: "",
  jobTitle: "",
  startDate: "",
  category: "",
  gender: "",
  email: "",
  role: "Employee",
};

const getRoleBadgeClass = (role) => {
  switch (role) {
    case "Admin": return "bg-danger";
    case "HR": return "bg-warning text-dark";
    default: return "bg-primary";
  }
};

export const AdminEmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      alert("Error fetching employees: " + error.message);
      setEmployees([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setFormError("");
    // Basic validation
    if (!form.employeeName || !form.employeeID || !form.department) {
      setFormError("Name, ID, and Department are required.");
      return;
    }
    try {
      await addEmployee(form);
      setShowAddModal(false);
      setForm(initialForm);
      fetchEmployees();
    } catch (error) {
      setFormError("Failed to add employee: " + error.message);
    }
  };

  return (
    <div className="workforce-container">
      <nav className="nav-container">
        <NavBar />
      </nav>

      <div className="d-flex justify-content-between align-items-center my-3">
        <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
          <i className="bi bi-plus-circle"></i> Add Employee
        </button>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form onSubmit={handleAddEmployee}>
                <div className="modal-header">
                  <h5 className="modal-title">Add Employee</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAddModal(false)}></button>
                </div>
                <div className="modal-body">
                  {formError && <div className="alert alert-danger">{formError}</div>}
                  <div className="mb-2">
                    <input type="text" className="form-control" placeholder="Name" value={form.employeeName}
                      onChange={e => setForm({ ...form, employeeName: e.target.value })} required />
                  </div>
                  <div className="mb-2">
                    <input type="text" className="form-control" placeholder="ID" value={form.employeeID}
                      onChange={e => setForm({ ...form, employeeID: e.target.value })} required />
                  </div>
                  <div className="mb-2">
                    <input type="text" className="form-control" placeholder="Department" value={form.department}
                      onChange={e => setForm({ ...form, department: e.target.value })} required />
                  </div>
                  <div className="mb-2">
                    <input type="text" className="form-control" placeholder="Job Title" value={form.jobTitle}
                      onChange={e => setForm({ ...form, jobTitle: e.target.value })} />
                  </div>
                  <div className="mb-2">
                    <input type="date" className="form-control" placeholder="Start Date" value={form.startDate}
                      onChange={e => setForm({ ...form, startDate: e.target.value })} />
                  </div>
                  <div className="mb-2">
                    <input type="text" className="form-control" placeholder="Category" value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })} />
                  </div>
                  <div className="mb-2">
                    <select className="form-control" value={form.gender}
                      onChange={e => setForm({ ...form, gender: e.target.value })}>
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <input type="email" className="form-control" placeholder="Email" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="mb-2">
                    <select className="form-control" value={form.role}
                      onChange={e => setForm({ ...form, role: e.target.value })}>
                      <option value="Employee">Employee</option>
                      <option value="HR">HR</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Add</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="card shadow">
        <div className="card-header bg-white">
          <h5>Employee Management (Admin)</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  {['Name', 'ID', 'Dept', 'Job Title', 'Start Date', 'Category', 'Gender', 'Email', 'Role'].map(
                    (header) => (
                      <th key={header}>{header}</th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="9" className="text-center">Loading...</td>
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
                      <td>
                        <span className={`badge ${getRoleBadgeClass(emp.role)}`}>
                          {emp.role}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">No employees found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEmployeeManagement;
