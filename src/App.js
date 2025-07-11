import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import LoginForm from './Authentication/LoginForm';
import ForgotPasswordForm from './Authentication/ForgotPasswordForm';
import ResetPasswordForm from './Authentication/ResetPasswordForm';
import Profile from './Authentication/Profile'
import { Hrdashboard } from "./Components/HR/Hrdashboard";
import EmployeeManagement from "./Components/HR/EmployeeManagement"; 
import { SkillGap } from './Components/HR/SkillGap';
import Projects  from './Components/HR/Projects';
import 'react-datepicker/dist/react-datepicker.css';
import {Feedback} from "./Components/HR/Feedback";
import {Workforce} from "./Components/HR/Workforce";
import {Settings} from "./Components/HR/Settings";
import {Notification} from "./Components/HR/Notification";
import { AdminEmployeeManagement } from './AdminEmployeeManagement';
import {User} from "./Components/HR/User";
import { NavBar } from './Components/Navbar/NavBar';
import UserManagement from './Components/HR/UserManagement';





const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavBarPaths = ['/login', '/register', '/forgot-password', '/reset-password'];

  return (
    <>
      {!hideNavBarPaths.includes(location.pathname) && <NavBar />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
  <Route path="/" element={<Navigate to="/Login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
          <Route path="/profile" element={<Profile />} />


          < Route path="/hrdashboard" element={<Hrdashboard/>} />
          <Route path="workforce" element={<Workforce />} />
          <Route path="skillgap" element={<SkillGap />} />
          <Route path="employeemangment" element={<EmployeeManagement />} />
          <Route path="projects" element={<Projects />} />
        <Route path="settings" element={<Settings/>}/>
        <Route path="feedback" element={<Feedback/>}/>
        <Route path="notification" element={<Notification/>}/>
        <Route path="user" element={<User/>}/> 
         <Route path="adminemployeemangment" element={<AdminEmployeeManagement />} />
         <Route path="usermanagement" element={<UserManagement />} />

      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
