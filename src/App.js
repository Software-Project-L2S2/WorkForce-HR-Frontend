import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import RegisterForm from './Components/Authentication/RegisterForm';
import LoginForm from './Components/Authentication/LoginForm';
import ForgotPasswordForm from './Components/Authentication/ForgotPasswordForm';
import ResetPasswordForm from './Components/Authentication/ResetPasswordForm';
import Profile from './Components/Authentication/Profile';

import NavBar from './Components/NavigationBar/NavBar';
 import './Components/NavigationBar/NavBar.css';
import Dashboard from "./Components/Dashboard";
import Workforce from "./Components/Workforce";
import Feedback from "./Components/Feedback";
import Setting from "./Components/Setting";
import Requests from "./Components/Requests";
import Enrollment from "./Components/Enrollment";
import Notification from "./Components/Notification";
import Message from "./Components/Message";


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

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
          <Route path="/profile" element={<Profile />} />

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



