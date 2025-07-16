import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <h1></h1>
      {/* This is where child components like LoginForm will render */}
      <Outlet />
    </div>
  );
}

export default Layout;
