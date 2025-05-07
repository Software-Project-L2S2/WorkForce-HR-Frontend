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