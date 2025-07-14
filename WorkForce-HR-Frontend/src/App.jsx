import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginForm from './Components/Authentication/LoginForm';
import ForgotPasswordForm from './Components/Authentication/ForgotPasswordForm';
import ResetPasswordForm from './Components/Authentication/ResetPasswordForm';
import WorkforcePlanning from "./WorkforcePlanning";
import Projects from "./Projects";
import Settings from "./Settings";
import Employee from "./Employee";
import LeaveManagement from "./LeaveManagement";
import Feedback from "./Feedback";
import Dashboard from "./Dashboard";
import Hrdashboard from "./Hrdashboard";
import UserManagement from './Pages/UserManagement';
import Layout from './Components/Layout';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      <Route path="/reset-password" element={<ResetPasswordForm />} />
      
      {/* Protected Routes inside Layout */}
      <Route path="/" element={<Layout />}>
        <Route path="userManagement" element={<UserManagement />} />
        <Route path="workforceplanning" element={<WorkforcePlanning />} />
        <Route path="projects" element={<Projects />} />
        <Route path="settings" element={<Settings />} />
        <Route path="leavemanagement" element={<LeaveManagement />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="hrdashboard" element={<Hrdashboard />} />
        <Route path="feedback" element={<Feedback />} />
        
        {/* --- ROUTING MODIFICATION --- */}
        {/* New route to handle viewing a profile via email */}
        <Route path="employee/profile/:email" element={<Employee />} />
        
        {/* A default employee page or a search prompt */}
        <Route path="employee" element={<Employee />} />
        
        {/* Keep ID-based route for any legacy links or functionality */}
        <Route path="employee/:employeeId" element={<Employee />} />
      </Route>
    </Routes>
  );
}

export default App;