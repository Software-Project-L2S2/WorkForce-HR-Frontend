import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from './components/ProtectedRoute';
import WorkforcePlanning from "./WorkforcePlanning";
import Projects from "./Projects";
import Settings from "./Settings";
import Employee from "./Employee";
import LeaveManagement from "./LeaveManagement";
import Feedback from "./Feedback";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";

// Main App Component
function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Register" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/workforceplanning" element={<WorkforcePlanning />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/leavemanagement" element={<LeaveManagement />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/feedback" element={<Feedback />} />
      </Route>

      <Route path="*" element={<Navigate to={isAuthenticated ? "/workforceplanning" : "/register"} />} />
    </Routes>
  );
}

// App Wrapper Component
export default function AppWrapper() {
  return (
    <App />
  );
}