import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiArrowRight,
  FiBell,
  FiBook,
  FiLogOut,
  FiRefreshCw,
} from "react-icons/fi";
import "./Dashboard.css";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    totalEmployees: 0,
    activeProjects: 0,
    upcomingProjects: 0,
    completedProjects: 0,
    workforceAnnouncements: 0,
    recentAnnouncements: [],
    recentFeedbacks: [],
    pendingLeaves: 0,
  });
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const navigate = useNavigate();

  // Function to safely fetch data from an endpoint
  const safeFetch = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`API endpoint ${url} returned ${response.status}`);
        return null;
      }
      return await response.json();
    } catch (error) {
      console.warn(`Failed to fetch from ${url}:`, error);
      return null;
    }
  };

  // Function to process employee data and group by department
  const processDepartmentData = (employeesData) => {
    if (!employeesData || !Array.isArray(employeesData)) {
      return [];
    }

    // Group employees by department
    const departmentCounts = {};
    
    employeesData.forEach(employee => {
      // Handle different possible field names for department
      const department = employee.department || employee.Department || employee.dept || 'Unknown';
      
      if (departmentCounts[department]) {
        departmentCounts[department]++;
      } else {
        departmentCounts[department] = 1;
      }
    });

    // Convert to array and sort by count (descending)
    const departmentArray = Object.entries(departmentCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return departmentArray;
  };

  // Function to fetch data from multiple endpoints
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch data from all relevant endpoints with error handling
      const [
        employeesData,
        projectsData,
        announcementsData,
        feedbacksData,
        leavesData
      ] = await Promise.all([
        safeFetch("http://localhost:5202/api/employee"),
        safeFetch("http://localhost:5202/api/projects"),
        safeFetch("http://localhost:5202/api/announcements"),
        safeFetch("http://localhost:5202/api/feedbacks"),
        safeFetch("http://localhost:5202/api/leaverequests")
      ]);

      // Process department data
      const processedDepartmentData = processDepartmentData(employeesData);
      setDepartmentData(processedDepartmentData);

      // Calculate counts and prepare data with null checks
      const dashboardData = {
        totalEmployees: employeesData ? employeesData.length : 0,
        activeProjects: projectsData ? projectsData.filter(project => 
          project.status === 'In Progress' || project.status === 'in progress'
        ).length : 0,
        upcomingProjects: projectsData ? projectsData.filter(project => 
          project.status === 'Pending' || project.status === 'pending'
        ).length : 0,
        completedProjects: projectsData ? projectsData.filter(project => 
          project.status === 'Completed' || project.status === 'completed'
        ).length : 0,
        workforceAnnouncements: announcementsData ? announcementsData.length : 0,
        recentAnnouncements: announcementsData ? announcementsData
          .sort((a, b) => new Date(b.createdAt || b.created_at || b.date) - new Date(a.createdAt || a.created_at || a.date))
          .slice(0, 3)
          .map(ann => ann.title || ann.content?.substring(0, 50) + "..." || "No title") : [],
        recentFeedbacks: feedbacksData ? feedbacksData
          .sort((a, b) => new Date(b.createdAt || b.created_at || b.date) - new Date(a.createdAt || a.created_at || a.date))
          .slice(0, 5)
          .map(feedback => ({
            author: feedback.employeeName || feedback.author || feedback.name || "Anonymous",
            date: feedback.createdAt || feedback.created_at || feedback.date || new Date(),
            note: feedback.content || feedback.note || feedback.message || feedback.feedback || "No content"
          })) : [],
        pendingLeaves: leavesData ? leavesData.filter(leave => 
          leave.status === 'pending' || leave.status === 'Pending'
        ).length : 0
      };

      setCounts(dashboardData);
      setLastUpdated(new Date());
      
      // Log the updated counts for debugging
      console.log('Dashboard data updated:', dashboardData);
      console.log('Department data:', processedDepartmentData);
      
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Set up real-time updates (refresh every 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  // Manual refresh function
  const handleRefresh = () => {
    fetchDashboardData();
  };

  // Focus event listener for when user returns to tab
  useEffect(() => {
    const handleFocus = () => {
      fetchDashboardData();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchDashboardData]);

  // Function to calculate bar height as percentage
  const getBarHeight = (count, maxCount) => {
    if (maxCount === 0) return 0;
    return Math.max((count / maxCount) * 100, 5); // Minimum 5% height for visibility
  };

  // Get max count for scaling bars
  const maxDepartmentCount = departmentData.length > 0 ? Math.max(...departmentData.map(d => d.count)) : 0;

  // Get top 4 departments for display
  const topDepartments = departmentData.slice(0, 4);

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="header-inner">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <nav aria-label="Main navigation">
            <ul className="dashboard-nav">
              <li><Link to="/" className="nav-link active">Dashboard</Link></li>
              <li><Link to="/projects" className="nav-link">Projects</Link></li>
              <li><Link to="/workforceplanning" className="nav-link">Workforce Planning</Link></li>
              <li><Link to="/employee" className="nav-link">Employee</Link></li>
              <li><Link to="/settings" className="nav-link">Settings</Link></li>
              <li><Link to="/usermanagement" className="nav-link">User Management</Link></li>
            </ul>
          </nav>
          <div className="header-icons">
            <FiBell className="header-icon" aria-label="Notifications" />
            <FiUser className="header-icon" aria-label="Profile" />
            <FiRefreshCw 
              className={`header-icon ${loading ? 'spinning' : ''}`} 
              aria-label="Refresh"
              onClick={handleRefresh}
              style={{ cursor: 'pointer' }}
            />
            <FiLogOut className="header-icon" aria-label="Logout" />
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-status">
          <span className="last-updated">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          {loading && <span className="loading-indicator">Updating...</span>}
          {error && <span className="error-indicator">{error}</span>}
        </div>

        <div className="dashboard-grid">
          <section className="dashboard-card card-employees" aria-label="Total Employees">
            <div className="card-header">
              <FiUser className="card-icon" />
              <div>
                <div className="card-title">{counts.totalEmployees}</div>
                <div className="card-subtitle">Total Employees</div>
              </div>
              <FiArrowRight className="arrow-icon" onClick={() => navigate("/employee")} />
            </div>
            <div className="bar-chart">
              {topDepartments.length > 0 ? (
                topDepartments.map((dept, index) => (
                  <div 
                    key={index}
                    className="bar" 
                    style={{ 
                      height: `${getBarHeight(dept.count, maxDepartmentCount)}%`,
                      backgroundColor: `hsl(${index * 60}, 70%, 50%)` // Dynamic colors
                    }}
                    title={`${dept.name}: ${dept.count} employees`}
                  ></div>
                ))
              ) : (
                // Fallback bars if no data
                <>
                  <div className="bar" style={{ height: "70%" }}></div>
                  <div className="bar" style={{ height: "35%" }}></div>
                  <div className="bar" style={{ height: "15%" }}></div>
                  <div className="bar" style={{ height: "60%" }}></div>
                </>
              )}
            </div>
            <div className="bar-labels">
              {topDepartments.length > 0 ? (
                topDepartments.map((dept, index) => (
                  <span key={index} title={`${dept.count} employees`}>
                    {dept.name}
                  </span>
                ))
              ) : (
                // Fallback labels if no data
                <>
                  <span>IT</span>
                  <span>Design</span>
                  <span>Management</span>
                  <span>Finance</span>
                </>
              )}
            </div>
            {/* Display department counts */}
            <div className="department-counts">
              {topDepartments.map((dept, index) => (
                <div key={index} className="dept-count">
                  <span className="dept-name">{dept.name}</span>
                  <span className="dept-number">{dept.count}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-card card-projects" aria-label="Projects">
            <div className="card-header">
              <FiBook className="card-icon" />
              <div className="card-title" style={{ fontSize: "1.3rem" }}>Projects</div>
              <FiArrowRight className="arrow-icon" onClick={() => navigate("/projects")} />
            </div>
            <div className="projects-row">
              <div className="project-box">
                <span className="project-label">Active Projects</span>
                <span className="project-count">{counts.activeProjects}</span>
              </div>
              <div className="project-box">
                <span className="project-label">Pending Projects</span>
                <span className="project-count">{counts.upcomingProjects}</span>
              </div>
              <div className="project-box">
                <span className="project-label">Completed Projects</span>
                <span className="project-count">{counts.completedProjects}</span>
              </div>
            </div>
          </section>

          <section className="dashboard-card card-announcement" aria-label="Announcement">
            <div className="announcement-header">
              <span className="announcement-title">Announcements</span>
              <span className="announcement-count">{counts.workforceAnnouncements}</span>
            </div>
            <div className="vacancy-alert">
              <div>
                <strong>Recent</strong>
                <div className="vacancy-desc">
                  {counts.recentAnnouncements[0] || "No recent announcements"}
                </div>
              </div>
              <FiBell className="vacancy-icon" onClick={() => navigate("/workforceplanning")} />
            </div>
          </section>

          <section className="dashboard-card card-feedback" aria-label="New Feedback">
            <div className="feedback-header">
              <span className="feedback-title">New Feedback</span>
              <span className="feedback-count">{counts.recentFeedbacks.length}</span>
              <button className="btn-create" onClick={() => navigate("/feedback")}>View All</button>
            </div>
            {counts.recentFeedbacks[0] && (
              <div className="feedback-box">
                <div className="feedback-author">{counts.recentFeedbacks[0].author}</div>
                <div className="feedback-date">
                  {new Date(counts.recentFeedbacks[0].date).toLocaleDateString()}
                </div>
                <div className="feedback-note">{counts.recentFeedbacks[0].note}</div>
                <button className="btn-view" onClick={() => navigate("/feedback")}>View</button>
              </div>
            )}
          </section>

          <section className="dashboard-card card-leave" aria-label="Pending Leave Requests">
            <div className="leave-header">
              <span className="leave-title">Pending Leave Requests</span>
              <span className="leave-count">{counts.pendingLeaves}</span>
              <button className="btn-leave" onClick={() => navigate("/leavemanagement")}>View</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;