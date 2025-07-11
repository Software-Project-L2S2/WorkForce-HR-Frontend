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

import react from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import LoginForm from './Components/Authentication/LoginForm';
import ForgotPasswordForm from './Components/Authentication/ForgotPasswordForm';
import ResetPasswordForm from './Components/Authentication/ResetPasswordForm';
import Profile from './Components/Authentication/Profile';
import Logout from './Components/Authentication/Logout';

import NavBar from './Components/NavigationBar/NavBar';
 import './Components/NavigationBar/NavBar.css';
import Dashboard from "./Components/Workforce/Dashboard";
import Workforce from "./Components/Workforce/Workforce";
import Feedback from "./Components/Workforce/Feedback";
import Setting from "./Components/Workforce/Setting";
import Requests from "./Components/Workforce/Requests";
import Enrollment from "./Components/Workforce/Enrollment";
import Notification from "./Components/Workforce/Notification";
import Message from "./Components/Workforce/Message";


import AdminDashboard from './Pages/AdminDashboard';
// import HRDashboard from './Pages/HRDashboard';
import UserManagement from './Pages/UserManagement';


const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavBarPaths = ['/login', '/register', '/forgot-password', '/reset-password','/admin-dashboard','/user-management'];

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
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          {/* <Route path="/register" element={<RegisterForm />} /> */}
          <Route path="/login" element={<LoginForm />} />

          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          {/* <Route path="/hr-dashboard" element={<HRDashboard />} /> */}

          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout/>}/>
          

          {/* Home pages */}
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Workforce/*" element={<Workforce />} />
          <Route path="/Requests/*" element={<Requests />} />
          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/Setting" element={<Setting />} />
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/message" element={<Message />} />
          {/* <Route path="/profiles" element={<Profiles />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;



