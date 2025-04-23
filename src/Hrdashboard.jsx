import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import './Hrdashboard.css';
import {Menu} from './Menu/Menu';
import { Link } from 'react-router-dom';





export const Hrdashboard = () => {
  const chartRef = useRef(null);
  const barChartRef = useRef(null);
  const workforceChartRef = useRef(null);
  const attritionChart = useRef(null);
  const barChart = useRef(null);
  const workforceChart = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (attritionChart.current) attritionChart.current.destroy();
    if (barChart.current) barChart.current.destroy();
    if (workforceChart.current) workforceChart.current.destroy();

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

    if (workforceChartRef.current) {
      workforceChart.current = new Chart(workforceChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          datasets: [
            { label: 'Promotions', data: [30, 20, 25, 35], backgroundColor: '#0AA43B' },
            { label: 'Exit', data: [50, 40, 60, 80], backgroundColor: '#EC5A5A' },
            { label: 'New Hire', data: [20, 25, 30, 45], backgroundColor: '#FFC20E' },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Workforce Tenders (3 months)' },
          },
        },
      });
    }

    if (chartRef.current) {
      attritionChart.current = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [
            {
              label: 'Attrition Rate',
              data: [5, 10, 15, 30, 10, 20, 25],
              borderColor: '#253D90',
              tension: 0.4,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Attrition Rate' },
          },
        },
      });
    }
  }, []);

  return (
    <div className="hr-dashboard container-fluid">

<nav className="navbar navbar-expand bg-white shadow-sm  fixed-top py-2">
       {/* Menu on Left Top */}
            <div className=" fixed-menu">
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
         {/* Notification button */}
                   <Link to="/notification" className="btn btn-light rounded-circle me-2 shadow-sm d-flex align-items-center justify-content-center"
                     style={{ width: '40px', height: '40px' }}
                     data-bs-toggle="tooltip"
                     title="Notifications">
                     <i className="bi bi-bell fs-5 text-secondary"></i>
                   </Link>

          {/* Profile button */}
          <button className="btn btn-light rounded-circle me-2 shadow-sm d-flex align-items-center justify-content-center" 
          style={{ width: '40px', height: '40px' }}
          data-bs-toggle="tooltip"
          title="Profile">
            <i className="bi bi-person-fill fs-5 text-secondary"></i>
          </button>

          {/* Logout button */}
          <button className="btn btn-danger rounded-circle shadow-sm d-flex align-items-center justify-content-center" 
          style={{ width: '40px', height: '40px' }}
          data-bs-toggle="tooltip"
          title="Logout">
            <i className="bi bi-box-arrow-right fs-5 text-white"></i>
          </button>
        </div>
      </nav>

      

      <div className="row main-content" style={{ marginTop: '30px' }}>
        {/* Main Content */}
        <div className="col-md-12">
          {/* Stats Cards */}
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card bg-warning text-dark h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-people-fill me-2"></i> Total Employees
                  </h5>
                  <h2 className="card-text">1200</h2>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-primary text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-briefcase-fill me-2"></i> Open Jobs
                  </h5>
                  <h2 className="card-text">5</h2>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-calendar-event me-2"></i> Projects
                  </h5>
                  <h2 className="card-text">8</h2>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-warning text-dark h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-chat-right-text me-2"></i> Feedbacks
                  </h5>
                  <h2 className="card-text">50</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="row mt-4 g-4">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Workforce Tenders</h5>
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

          {/* Attrition Rate and Upcoming Events Section */}
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Attrition Rate</h5>
                  <canvas ref={chartRef}></canvas>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Upcoming Events</h5>
                  <ul className="list-group">
                    <li className="list-group-item">Team Meeting - Tomorrow</li>
                    <li className="list-group-item">Payroll Deadline - Friday</li>
                    <li className="list-group-item">Quarterly Review - Next Week</li>
                  </ul>
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
