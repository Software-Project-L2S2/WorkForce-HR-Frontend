// filepath: /Users/pawanhasthika/Documents/project/SoftwareProject-2ndYear/Frondend/my-react-app/src/App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Employeeprofile } from './EmployeeProfile/Employeeprofile';
import LeaveManagement from './LeaveManagement/Leavemanagement';
import LeaveRequestForm from './EmployeeLeaveRequest/Employeeleaverequest';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Links */}
        <nav>
          <ul>
            <li><Link to="/">Employee Profile</Link></li>
            <li><Link to="/leave-management">Leave Management</Link></li>
            <li><Link to="/leave-request">Leave Request Form</Link></li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Employeeprofile />} />
          <Route path="/leave-management" element={<LeaveManagement />} />
          <Route path="/leave-request" element={<LeaveRequestForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;