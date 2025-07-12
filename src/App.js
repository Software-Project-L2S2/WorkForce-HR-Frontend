// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-datepicker/dist/react-datepicker.css';
// import './App.css';

// // Authentication
// import LoginForm from './Components/Authentication/LoginForm';
// import ForgotPasswordForm from './Components/Authentication/ForgotPasswordForm';
// import ResetPasswordForm from './Components/Authentication/ResetPasswordForm';
// import Profile from './Components/Authentication/Profile';
// import Logout from './Components/Authentication/Logout';

// // HR Components
// import { Hrdashboard } from './Components/HR/Hrdashboard';
// import EmployeeManagement from './Components/HR/EmployeeManagement';
// import { SkillGap } from './Components/HR/SkillGap';
// import Projects from './Components/HR/Projects';
// import { Feedback as HRFeedback } from './Components/HR/Feedback';
// import { Workforce as HRWorkforce } from './Components/HR/Workforce';
// import { Settings as HRSettings } from './Components/HR/Settings';
// import { Notification as HRNotification } from './Components/HR/Notification';
// import { User } from './Components/HR/User';

// // Workforce Components
// import Dashboard from './Components/Workforce/Dashboard';
// import Workforce from './Components/Workforce/Workforce';
// import Feedback from './Components/Workforce/Feedback';
// import Setting from './Components/Workforce/Setting';
// import Requests from './Components/Workforce/Requests';
// import Enrollment from './Components/Workforce/Enrollment';
// import Notification from './Components/Workforce/Notification';
// import Message from './Components/Workforce/Message';

// // Admin Pages
// import AdminDashboard from './Pages/AdminDashboard';
// import UserManagement from './Pages/UserManagement';

// // Navigation
// import { NavBar  as HRNavbar} from './Components/Navbar/NavBar';
// import './Components/Navbar/NavBar.css';

// import './Components/WorkforceNavigationBar/NavBar.css';
// import {NavBar as WorkforceNavbar} from './Components/WorkforceNavigationBar/NavBar.jsx';


// // src/api.js
// import axios from 'axios';


// // Layout component to conditionally show NavBar
// const Layout = ({ children }) => {
//   const location = useLocation();
//   const hideNavBarPaths = [
//     '/login',
//     '/register',
//     '/forgot-password',
//     '/reset-password',
//     '/admin-dashboard',
//     '/user-management',
//     '/HR/hrdashboard',
//   ];

//   return (
//     <>
//       {!hideNavBarPaths.includes(location.pathname) && <NavBar />}
//       {children}
//     </>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />

//           {/* Auth */}
//           <Route path="/login" element={<LoginForm />} />
//           <Route path="/forgot-password" element={<ForgotPasswordForm />} />
//           <Route path="/reset-password" element={<ResetPasswordForm />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/logout" element={<Logout />} />

//           {/* Admin */}
//           <Route path="/admin-dashboard" element={<AdminDashboard />} />
//           <Route path="/user-management" element={<UserManagement />} />

//           {/* Workforce */}
//           <Route path="/Workforce/Dashboard" element={<Dashboard />} />
//           <Route path="/Workforce/Workforce/*" element={<Workforce />} />
//           <Route path="/Workforce/Requests/*" element={<Requests />} />
//           <Route path="/Workforce/Feedback" element={<Feedback />} />
//           <Route path="/Workforce/Setting" element={<Setting />} />
//           <Route path="/Workforce/enrollment" element={<Enrollment />} />
//           <Route path="/Workforce/notification" element={<Notification />} />
//           <Route path="/Workforce/message" element={<Message />} />

//           {/* HR */}
//           <Route path="/HR/hrdashboard" element={<Hrdashboard />} />
//           <Route path="/HR/workforce" element={<HRWorkforce />} />
//           <Route path="/HR/skillgap" element={<SkillGap />} />
//           <Route path="/HR/employeemangment" element={<EmployeeManagement />} />
//           <Route path="/HR/projects" element={<Projects />} />
//           <Route path="/HR/settings" element={<HRSettings />} />
//           <Route path="/HR/feedback" element={<HRFeedback />} />
//           <Route path="/HR/notification" element={<HRNotification />} />
//           <Route path="/HR/user" element={<User />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// };

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-datepicker/dist/react-datepicker.css';
// import './App.css';

// // Authentication
// import LoginForm from './Components/Authentication/LoginForm';
// import ForgotPasswordForm from './Components/Authentication/ForgotPasswordForm';
// import ResetPasswordForm from './Components/Authentication/ResetPasswordForm';
// import Profile from './Components/Authentication/Profile';
// import Logout from './Components/Authentication/Logout';

// // HR Components
// import { Hrdashboard } from './Components/HR/Hrdashboard';
// import EmployeeManagement from './Components/HR/EmployeeManagement';
// import { SkillGap } from './Components/HR/SkillGap';
// import Projects from './Components/HR/Projects';
// import { Feedback as HRFeedback } from './Components/HR/Feedback';
// import { Workforce as HRWorkforce } from './Components/HR/Workforce';
// import { Settings as HRSettings } from './Components/HR/Settings';
// import { Notification as HRNotification } from './Components/HR/Notification';
// import { User } from './Components/HR/User';

// // Workforce Components
// import Dashboard from './Components/Workforce/Dashboard';
// import Workforce from './Components/Workforce/Workforce';
// import Feedback from './Components/Workforce/Feedback';
// import Setting from './Components/Workforce/Setting';
// import Requests from './Components/Workforce/Requests';
// import Enrollment from './Components/Workforce/Enrollment';
// import Notification from './Components/Workforce/Notification';
// import Message from './Components/Workforce/Message';

// // Admin Pages
// import AdminDashboard from './Pages/AdminDashboard';
// import UserManagement from './Pages/UserManagement';

// // Navigation Bars
// import { NavBar as HRNavbar } from './Components/Navbar/NavBar.jsx';
// import {  NavBar as WorkforceNavbar } from './Components/WorkforceNavigationBar/NavBar.jsx';

// import './Components/Navbar/NavBar.css';
// import './Components/WorkforceNavigationBar/NavBar.css';

// // Layout component to conditionally show NavBar based on path
// const Layout = ({ children }) => {
//   const location = useLocation();
//   const path = location.pathname.toLowerCase();

//   // Paths without navbar
//   const hideNavBarPaths = [
//     '/login',
//     '/register',
//     '/forgot-password',
//     '/reset-password',
//     '/admin-dashboard',
//     '/user-management',
//   ];

//   if (hideNavBarPaths.includes(path)) {
//     return <>{children}</>;
//   }

//   if (path.startsWith('/workforce')) {
//     return (
//       <>
//         <WorkforceNavbar />
//         {children}
//       </>
//     );
//   }

//   if (path.startsWith('/hr')) {
//     return (
//       <>
//         <HRNavbar />
//         {children}
//       </>
//     );
//   }

//   // Default fallback (no navbar)
//   return <>{children}</>;
// };

// const App = () => {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />

//           {/* Auth */}
//           <Route path="/login" element={<LoginForm />} />
//           <Route path="/forgot-password" element={<ForgotPasswordForm />} />
//           <Route path="/reset-password" element={<ResetPasswordForm />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/logout" element={<Logout />} />

//           {/* Admin */}
//           <Route path="/admin-dashboard" element={<AdminDashboard />} />
//           <Route path="/user-management" element={<UserManagement />} />

//           {/* Workforce */}
//           <Route path="/workforce/dashboard" element={<Dashboard />} />
//           <Route path="/workforce/workforce/*" element={<Workforce />} />
//           <Route path="/workforce/requests/*" element={<Requests />} />
//           <Route path="/workforce/feedback" element={<Feedback />} />
//           <Route path="/workforce/setting" element={<Setting />} />
//           <Route path="/workforce/enrollment" element={<Enrollment />} />
//           <Route path="/workforce/notification" element={<Notification />} />
//           <Route path="/workforce/message" element={<Message />} />

//           {/* HR */}
//           <Route path="/hr/hrdashboard" element={<Hrdashboard />} />
//           <Route path="/hr/workforce" element={<HRWorkforce />} />
//           <Route path="/hr/skillgap" element={<SkillGap />} />
//           <Route path="/hr/employeemangment" element={<EmployeeManagement />} />
//           <Route path="/hr/projects" element={<Projects />} />
//           <Route path="/hr/settings" element={<HRSettings />} />
//           <Route path="/hr/feedback" element={<HRFeedback />} />
//           <Route path="/hr/notification" element={<HRNotification />} />
//           <Route path="/hr/user" element={<User />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// };

// export default App;



import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

// Authentication
import LoginForm from './Components/Authentication/LoginForm';
import ForgotPasswordForm from './Components/Authentication/ForgotPasswordForm';
import ResetPasswordForm from './Components/Authentication/ResetPasswordForm';
import Profile from './Components/Authentication/Profile';
import Logout from './Components/Authentication/Logout';

// HR Components
import { Hrdashboard } from './Components/HR/Hrdashboard';
import EmployeeManagement from './Components/HR/EmployeeManagement';
import { SkillGap } from './Components/HR/SkillGap';
import Projects from './Components/HR/Projects';
import { Feedback as HRFeedback } from './Components/HR/Feedback';
import { Workforce as HRWorkforce } from './Components/HR/Workforce';
import { Settings as HRSettings } from './Components/HR/Settings';
import { Notification as HRNotification } from './Components/HR/Notification';
import { User } from './Components/HR/User';

// Workforce Components
import Dashboard from './Components/Workforce/Dashboard';
import Workforce from './Components/Workforce/Workforce';
import Feedback from './Components/Workforce/Feedback';
import Setting from './Components/Workforce/Setting';
// import Requests from './Components/Workforce/Requests';
import Enrollment from './Components/Workforce/Enrollment';
import Notification from './Components/Workforce/Notification';
import Message from './Components/Workforce/Message';


import PersonalDetails from "./Components/Workforce/PersonalDetails";
import ContactDetails from "./Components/Workforce/ContactDetails";
import EducationDetails from "./Components/Workforce/EducationDetails";
import JobDetails from "./Components/Workforce/JobDetails";


import Requests from './Components/Workforce/Requests';
import LeaveRequests from './Components/Workforce/LeaveRequests';
import TrainingProgram from './Components/Workforce/TrainingProgram';
import Promotion from './Components/Workforce/Promotion';
import Transfer from './Components/Workforce/Transfer';


// Admin Pages
import AdminDashboard from './Pages/AdminDashboard';
import UserManagement from './Pages/UserManagement';

// Navigation Bars
import { NavBar as HRNavbar } from './Components/HR/Navbar/NavBar.jsx';
import WorkforceNavbar from './Components/WorkforceNavigationBar/NavBar.jsx'; // default export

import './Components/HR/Navbar/NavBar.css';
import './Components/WorkforceNavigationBar/NavBar.css';

// Layout component to conditionally show NavBar based on path
const Layout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  
  // Paths without navbar
  const hideNavBarPaths = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/admin-dashboard',
    '/user-management',
  ];
  
  // Check if user is authenticated for protected routes
  const isAuthenticated = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return !!token;
  };

  // If not authenticated and trying to access protected route, redirect to login
  if (!isAuthenticated() && !hideNavBarPaths.includes(location.pathname)) {
    window.location.href = '/login';
    return null;
  }

  if (hideNavBarPaths.includes(path)) {
    return <>{children}</>;
  }

  if (path.startsWith('/workforce')) {
    return (
      <>
        <WorkforceNavbar />
        {children}
      </>
    );
  }

  if (path.startsWith('/hr')) {
    return (
      <>
        <HRNavbar />
        {children}
      </>
    );
  }

  // Default fallback (no navbar)
  return <>{children}</>;
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Auth */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />

          {/* Admin */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-management" element={<UserManagement />} />

          {/* Workforce */}
          <Route path="/workforce/dashboard" element={<Dashboard />} />
          <Route path="/workforce/workforce/*" element={<Workforce />} />


          <Route path="/workforce/personal" element={<PersonalDetails />} />
          <Route path="/workforce/contact" element={<ContactDetails />} />
          <Route path="/workforce/education" element={<EducationDetails />} />
          <Route path="/workforce/job" element={<JobDetails />} />

          <Route path="/workforce/requests" element={<Requests />} />
          <Route path="/workforce/requests/leaverequests" element={<LeaveRequests />} />
          <Route path="/workforce/requests/trainingprogram" element={<TrainingProgram />} />
          <Route path="/workforce/requests/promotion" element={<Promotion />} />
          <Route path="/workforce/requests/transfer" element={<Transfer />} />


          <Route path="/enrollment" element={<Enrollment />} />



          





          <Route path="/workforce/requests/*" element={<Requests />} />
          <Route path="/workforce/requests/leave-requests" element={<Requests />} />
          <Route path="/workforce/feedback" element={<Feedback />} />
          <Route path="/workforce/setting" element={<Setting />} />
          <Route path="/workforce/enrollment" element={<Enrollment />} />
          <Route path="/workforce/notification" element={<Notification />} />
          <Route path="/workforce/message" element={<Message />} />

          {/* HR */}
          <Route path="/hr/hrdashboard" element={<Hrdashboard />} />
          <Route path="/hr/workforce" element={<HRWorkforce />} />
          <Route path="/hr/skillgap" element={<SkillGap />} />
          <Route path="/hr/employeemangment" element={<EmployeeManagement />} />
          <Route path="/hr/projects" element={<Projects />} />
          <Route path="/hr/settings" element={<HRSettings />} />
          <Route path="/hr/feedback" element={<HRFeedback />} />
          <Route path="/hr/notification" element={<HRNotification />} />
          <Route path="/hr/user" element={<User />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;



