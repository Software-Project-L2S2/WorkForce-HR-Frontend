import { useState, useRef, useEffect } from "react";
import { FaBars, FaSignOutAlt, FaUserCog } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard"); // Track active item
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
    {/* Toggle Button */}
    <button
      ref={toggleButtonRef}
      className="btn btn-dark position-sticky top-2 start-2 z-3 ms-2 mt-2"
      onClick={() => setIsOpen(!isOpen)}
      style={{ zIndex: 1040 }}
    >
      <FaBars />
    </button>

      {/* Sidebar */}
      <div
       ref={sidebarRef}
        className={`sidebar bg-dark text-white position-fixed top-0 start-0 vh-100 p-3 ${
          isOpen ? "d-block" : "d-none"
        }`}
        style={{ width: "250px" , zIndex:1030 }}
      >
        {/* Profile Section */}
        <div className="text-center mb-4">
          <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: "60px", height: "60px" }}>
            <FaUserCog className="fs-3 text-dark" />
          </div>
          <h4 className="mt-2">HR Manager Name</h4>
          <p className="text-secondary">Admin</p>
        </div>
        <div style={{ 
          height: "calc(100vh - 250px)", // Adjust based on your header/footer height
          overflowY: "auto",
          marginBottom: "20px",
          scrollbarWidth:"none",
            msOverflowStyle: "none"
        }}>
        {/* Navigation Links */}
        <ul className="nav flex-column">
          <NavItem label="Dashboard" activeItem={activeItem} setActiveItem={setActiveItem} />
          <NavItem label="Feed backs" activeItem={activeItem} setActiveItem={setActiveItem} />
          <NavItem label="Jobs" activeItem={activeItem} setActiveItem={setActiveItem} />
          <NavItem label="Skill Gap analysis" activeItem={activeItem} setActiveItem={setActiveItem} />
          <NavItem label="Projects" activeItem={activeItem} setActiveItem={setActiveItem} />
          <NavItem label="Notifications" activeItem={activeItem} setActiveItem={setActiveItem} />
          <NavItem label="Employee Management" activeItem={activeItem} setActiveItem={setActiveItem} />
          <NavItem label="Setting" activeItem={activeItem} setActiveItem={setActiveItem} />
        </ul>

        {/* Logout Button */}
        <button className="btn btn-danger w-100 mt-4">
          <FaSignOutAlt className="me-2" /> Log Out
        </button>
      </div>
    </div>
    </div>
  );
};

// Navigation Item Component
const NavItem = ({ label, activeItem, setActiveItem }) => {
  return (
    <li
      className={`nav-item my-1 ${activeItem === label ? "bg-warning text-dark rounded" : ""}`}
      onClick={() => setActiveItem(label)}
      style={{ cursor: "pointer" }}
    >
      <a href="#" className="nav-link text-white d-flex justify-content-between align-items-center">
        {label}
      </a>
    </li>
  );
};

export default Menu;
