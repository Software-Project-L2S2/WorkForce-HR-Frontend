import { useState, useRef, useEffect } from "react";
import { FaBars, FaSignOutAlt, FaUserCog } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);
  
  return (
    <div className="menu-wrapper">
     
      <button
        ref={toggleButtonRef}
        className="btn btn-dark position-sticky top-2 start-2 z-3 ms-2 mt-2"
        onClick={() => setIsOpen(!isOpen)}
        style={{ zIndex: 1040 }}
      >
        <FaBars />
      </button>
      
     
      <div
        ref={sidebarRef}
        className={`sidebar bg-dark text-white position-fixed top-0 start-0 vh-100 p-3 ${
          isOpen ? "d-block" : "d-none"
        }`}
        style={{ width: "250px", zIndex: 1030 }}
      >
        
        <div className="text-center mb-4">
          <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: "60px", height: "60px" }}>
            <FaUserCog className="fs-3 text-dark" />
          </div>
          <h4 className="mt-2">HR Manager Name</h4>
          <p className="text-secondary">Admin</p>
        </div>
        <div style={{
          height: "calc(100vh - 250px)",
          overflowY: "auto",
          marginBottom: "20px",
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }}>
          
          <ul className="nav flex-column">
            <NavItem to="/" label="Dashboard" currentPath={currentPath} setIsOpen={setIsOpen} />
            <NavItem to="/Workforce" label="Workforce" currentPath={currentPath} setIsOpen={setIsOpen} />
            <NavItem to="/feedback" label="Feed backs" currentPath={currentPath} setIsOpen={setIsOpen} />
            <NavItem to="/SkillGap" label="Skill Gap analysis" currentPath={currentPath} setIsOpen={setIsOpen} />
            <NavItem to="/Projects" label="Projects" currentPath={currentPath} setIsOpen={setIsOpen} />
            <NavItem to="/Notification" label="Notifications" currentPath={currentPath} setIsOpen={setIsOpen} />
            <NavItem to="/employeemangment" label="Employee Management" currentPath={currentPath} setIsOpen={setIsOpen} />
            <NavItem to="/Settings" label="Setting" currentPath={currentPath} setIsOpen={setIsOpen} />
          </ul>
          
         
          <button className="btn btn-danger w-100 mt-4" onClick={() => console.log("Logout clicked")}>
            <FaSignOutAlt className="me-2" /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

// Navigation Item Component
const NavItem = ({ to, label, currentPath, setIsOpen }) => {
  const isActive = currentPath === to;
  
  return (
    <li
      className={`nav-item my-1 ${isActive ? "bg-warning text-dark rounded" : ""}`}
      style={{ cursor: "pointer" }}
    >
      <Link 
        to={to} 
        className="nav-link text-white d-flex justify-content-between align-items-center"
        onClick={() => {
          // Close sidebar on mobile when an item is clicked
          if (window.innerWidth < 992) {
            setIsOpen(false);
          }
        }}
      >
        {label}
      </Link>
    </li>
  );
};

export default Menu;