import React, { useState, useEffect } from "react";
import "./Workforce.css";

const API_BASE = "http://localhost:5164/api/WorkforceAnalytics";

export const Workforce = () => {
  const [summary, setSummary] = useState(null);
  const [movementData, setMovementData] = useState([]);
  const [attritionData, setAttritionData] = useState([]);


  const API_BASE = "http://localhost:5164/api/WorkforceAnalytics";

useEffect(() => {
  const fetchData = async () => {
    try {
      const summaryRes = await fetch(`${API_BASE}/summary`);
      const summaryData = await summaryRes.json();
      setSummary(summaryData);

      const movementRes = await fetch(`${API_BASE}/movements`);
      const movementData = await movementRes.json();
      setMovementData(movementData);

      const attritionRes = await fetch(`${API_BASE}/attritions`);
      const attritionData = await attritionRes.json();
      setAttritionData(attritionData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);


  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  return (
    <div className="container-fluid vh-100 overflow-auto bg-light Workforce-page">
      <div className="nav-container">
        {/* NavBar would be rendered here */}
      </div>

      <div className="row"> 
        <div className="col-md-12">
          {/* Summary Cards Row */}
          <div className="row g-3 p-3">
            <div className="col-md-3">
              <div className="card bg-success text-dark p-3 shadow">
                <h5>Total Promotions</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <h2>{summary ? summary.totalPromotions : '...'}</h2>
                  <i className="bi bi-arrow-up-circle"></i>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-danger text-dark p-3 shadow">
                <h5>Total Exit</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <h2>{summary ? summary.totalExits : '...'}</h2>
                  <i className="bi bi-arrow-down-circle"></i>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-primary text-dark p-3 shadow">
                <h5>Total Transfer</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <h2>{summary ? summary.totalTransfers : '...'}</h2>
                  <i className="bi bi-arrow-left-right"></i>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-warning text-dark p-3 shadow">
                <h5>Total Attrition</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <h2>{summary ? summary.totalAttritions : '...'}</h2>
                  <i className="bi bi-people-x"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Side-by-Side Tables Row */}
          <div className="row p-3">
            {/* Movements Table */}
            <div className="col-md-6 mb-4 mb-md-0">
              <div className="card h-100">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <h5>Promotions, Transfers, and Exits</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th style={{width: '15%'}}> ID</th>
                          <th style={{width: '20%'}}>Name</th>
                          <th style={{width: '20%'}}>Department</th>
                          <th style={{width: '20%'}}>Status</th>
                          <th style={{width: '25%'}}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {movementData.map((item) => (
                          <tr key={item.id}>
                            <td>{item.employeeId}</td>
                            <td>{item.name}</td>
                            <td>{item.department}</td>
                            <td>
                              <span className={`badge ${
                                item.status === 'Promotion' ? 'bg-success' : 
                                item.status === 'Transfer' ? 'bg-primary' : 
                                'bg-danger'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                            <td>{formatDate(item.date)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Attrition Table */}
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <h5>Details Table for Attrition </h5>
                  <button className="btn btn-sm btn-light">EDIT</button>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th style={{width: '15%'}}>ID</th>
                          <th style={{width: '20%'}}>Name</th>
                          <th style={{width: '15%'}}>Department</th>
                          <th style={{width: '20%'}}>Position</th>
                          <th style={{width: '15%'}}>Exit Date</th>
                          <th style={{width: '15%'}}>Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attritionData.map((item) => (
                          <tr key={item.id}>
                            <td>{item.employeeId}</td>
                            <td>{item.name}</td>
                            <td>{item.department}</td>
                            <td>{item.position}</td>
                            <td>{formatDate(item.exitDate)}</td>
                            <td>{item.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workforce;