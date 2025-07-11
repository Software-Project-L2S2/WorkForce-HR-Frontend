import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import './Hrdashboard.css';
import {Menu} from '../../Menu/Menu';
import { Link } from 'react-router-dom';

const API_BASE_URL = "http://localhost:5164/api/WorkforceAnalytics";

export const Hrdashboard = () => {
  const chartRef = useRef(null);
  const barChartRef = useRef(null);
  const workforceChartRef = useRef(null);
  const attritionChart = useRef(null);
  const barChart = useRef(null);
  const workforceChart = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State for API data
  const [summary, setSummary] = useState(null);
  const [movementData, setMovementData] = useState([]);
  const [attritionData, setAttritionData] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch summary data
      const summaryRes = await fetch(`${API_BASE_URL}/summary`);
      const summaryData = await summaryRes.json();
      setSummary(summaryData);

      // Fetch movement data
      const movementRes = await fetch(`${API_BASE_URL}/movements`);
      const movementData = await movementRes.json();
      setMovementData(movementData);

      // Fetch attrition data
      const attritionRes = await fetch(`${API_BASE_URL}/attritions`);
      const attritionData = await attritionRes.json();
      setAttritionData(attritionData);
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // Process movement data for workforce chart (last 4 months)
  const processWorkforceData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr']; // Last 4 months
    const promotions = [0, 0, 0, 0];
    const exits = [0, 0, 0, 0];
    const transfers = [0, 0, 0, 0];

    // Get current date and calculate last 4 months
    const now = new Date();
    const last4Months = [];
    for (let i = 3; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      last4Months.push(month);
    }

    // Process movement data
    movementData.forEach(item => {
      const itemDate = new Date(item.date);
      const monthIndex = last4Months.findIndex(month => 
        itemDate.getMonth() === month.getMonth() && 
        itemDate.getFullYear() === month.getFullYear()
      );

      if (monthIndex !== -1) {
        if (item.status === 'Promotion') {
          promotions[monthIndex]++;
        } else if (item.status === 'Exits') {
          exits[monthIndex]++;
        } else if (item.status === 'Transfer') {
          transfers[monthIndex]++;
        }
      }
    });

    // Update months array with actual month names
    const monthNames = last4Months.map(date => 
      date.toLocaleString('default', { month: 'short' })
    );

    return {
      labels: monthNames,
      datasets: [
        { label: 'Promotions', data: promotions, backgroundColor: '#0AA43B' },
        { label: 'Exit', data: exits, backgroundColor: '#EC5A5A' },
        { label: 'Transfer', data: transfers, backgroundColor: '#FFC20E' },
      ]
    };
  };

  // Process attrition data for line chart (last 4 months)
  const processAttritionData = () => {
    const now = new Date();
    const last4Months = [];
    const attritionCounts = [];

    // Generate last 4 months
    for (let i = 3; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      last4Months.push(month);
    }

    // Count attritions per month
    last4Months.forEach(month => {
      const count = attritionData.filter(item => {
        const exitDate = new Date(item.exitDate);
        return exitDate.getMonth() === month.getMonth() && 
               exitDate.getFullYear() === month.getFullYear();
      }).length;
      attritionCounts.push(count);
    });

    const monthNames = last4Months.map(date => 
      date.toLocaleString('default', { month: 'short' })
    );

    return {
      labels: monthNames,
      datasets: [
        {
          label: 'Attrition Count',
          data: attritionCounts,
          borderColor: '#253D90',
          backgroundColor: 'rgba(37, 61, 144, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ]
    };
  };

  // Create charts
  useEffect(() => {
    if (loading || !movementData.length) return;

    // Destroy existing charts
    if (attritionChart.current) attritionChart.current.destroy();
    if (barChart.current) barChart.current.destroy();
    if (workforceChart.current) workforceChart.current.destroy();

    // Create workforce chart
    if (workforceChartRef.current) {
      const workforceData = processWorkforceData();
      workforceChart.current = new Chart(workforceChartRef.current, {
        type: 'bar',
        data: workforceData,
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Workforce Tenders (Last 4 months)' },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        },
      });
    }

    // Create attrition chart
    if (chartRef.current) {
      const attritionChartData = processAttritionData();
      attritionChart.current = new Chart(chartRef.current, {
        type: 'line',
        data: attritionChartData,
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Attrition Trend (Last 4 months)' },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        },
      });
    }

    // Keep the employee gaps chart with mock data (since backend not ready)
    if (barChartRef.current) {
      barChart.current = new Chart(barChartRef.current, {
        type: 'bar',
        data: {
          labels: ['IT', 'Marketing', 'HR', 'Finance', 'Sales'],
          datasets: [
            {
              label: 'Employee Gaps',
              data: [50, 30, 10, 15, 20],
              backgroundColor: ['#253D90', '#FFC20E', '#0AA43B', '#EC5A5A', '#5ED603'],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Employee Gaps by Department' },
          },
        },
      });
    }
  }, [movementData, attritionData, loading]);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="hr-dashboard container-fluid">
      <nav className="navbar navbar-expand bg-white shadow-sm fixed-top py-2">
        <div className="fixed-menu">
          <Menu />
        </div>

        <div className="col-md-3 d-flex align-items-center">
          <h2 className="text-primary mb-0 fw-bold dashboard-title">Dashboard</h2>
        </div>

        <div className="col-md-5">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search..." />
          </div>
        </div>

        <div className="col-md-3 d-flex align-items-center justify-content-end">
          <Link to="/notification" className="btn btn-light rounded-circle me-2 shadow-sm d-flex align-items-center justify-content-center"
            style={{ width: '40px', height: '40px' }}
            data-bs-toggle="tooltip"
            title="Notifications">
            <i className="bi bi-bell fs-5 text-secondary"></i>
          </Link>

          <Link to="/user" className="btn btn-light rounded-circle me-2 shadow-sm d-flex align-items-center justify-content-center" 
            style={{ width: '40px', height: '40px' }}
            data-bs-toggle="tooltip"
            title="Profile">
            <i className="bi bi-person-fill fs-5 text-secondary"></i>
          </Link>

          <button className="btn btn-danger rounded-circle shadow-sm d-flex align-items-center justify-content-center" 
            style={{ width: '40px', height: '40px' }}
            data-bs-toggle="tooltip"
            title="Logout">
            <i className="bi bi-box-arrow-right fs-5 text-white"></i>
          </button>
        </div>
      </nav>

      <div className="row main-content" style={{ marginTop: '30px' }}>
        <div className="col-md-12">
          {/* Summary Cards */}
          <div className="row g-4">
            <div className="col-md-3">
              <a href="/EmployeeMangment" className="text-decoration-none">
                <div className="card bg-warning text-dark h-100">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="bi bi-people-fill me-2"></i> Total Employees
                    </h5>
                    <h2 className="card-text">1200</h2>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-3">
              <div className="card bg-primary text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-briefcase-fill me-2"></i> Total Promotions
                  </h5>
                  <h2 className="card-text">{summary?.totalPromotions || 0}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <a href="/Projects" className="text-decoration-none">
                <div className="card bg-success text-white h-100">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="bi bi-arrow-left-right me-2"></i> Total Transfers
                    </h5>
                    <h2 className="card-text">{summary?.totalTransfers || 0}</h2>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-3">
              <a href="/Feedback" className="text-decoration-none">
                <div className="card bg-danger text-white h-100">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="bi bi-people-x me-2"></i> Total Attritions
                    </h5>
                    <h2 className="card-text">{summary?.totalAttritions || 0}</h2>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Charts Row */}
          <div className="row mt-4 g-4">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Workforce Tenders (Last 4 Months)</h5>
                  <canvas ref={workforceChartRef}></canvas>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Employee Gaps by Department</h5>
                  <canvas ref={barChartRef}></canvas>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Attrition Trend (Last 4 Months)</h5>
                  <canvas ref={chartRef}></canvas>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Recent Workforce Changes</h5>
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Department</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {movementData.slice(0, 5).map((item, index) => (
                          <tr key={index}>
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
                            <td>{new Date(item.date).toLocaleDateString()}</td>
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

export default Hrdashboard;