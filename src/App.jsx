import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WorkforcePlanning from "./WorkforcePlanning";
import Projects from "./Projects";
import Settings from "./Settings";
import Employee from "./Employee";
import LeaveManagement from "./LeaveManagement";
import Feedback from "./Feedback";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WorkforcePlanning />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/Employee" element={<Employee />} />
        <Route path="/LeaveManagement" element={<LeaveManagement />} />
        <Route path="/Feedback" element={<Feedback />} />
      </Routes>
    </Router>
  );
}

export default App;