// src/components/Sidebar.jsx
import { useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaPlusCircle,
  FaSearch,
  FaSignOutAlt,
  FaUserEdit,
  FaChartLine,
  FaFlag,
  FaClock
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const isAdminPage = location.pathname.startsWith("/admin");

  const handleLogout = () => {
    logout();               // clear context
    localStorage.clear();   // clear all storage
    navigate("/login");     // force redirect
  };

  return (
    <div className="sidebar">
      <h1 className="sidebar-logo">{isAdminPage ? "Admin" : "LyricLoop"}</h1>

      <nav className="sidebar-nav">
        {isAdminPage ? (
          <>
            <NavLink to="/admin" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <FaHome className="nav-icon" />
              <span className="nav-label">Dashboard</span>
            </NavLink>

            <NavLink to="/admin/analytics" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <FaChartLine className="nav-icon" />
              <span className="nav-label">Analytics</span>
            </NavLink>

            <NavLink to="/admin/reports" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <FaFlag className="nav-icon" />
              <span className="nav-label">Reports</span>
            </NavLink>

            <NavLink to="/admin/time" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <FaClock className="nav-icon" />
              <span className="nav-label">Time</span>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/feed" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <FaHome className="nav-icon" />
            </NavLink>

            <NavLink to="/create" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <FaPlusCircle className="nav-icon" />
            </NavLink>

            <NavLink to="/search" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <FaSearch className="nav-icon" />
            </NavLink>

            <NavLink to="/profile/edit" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <FaUserEdit className="nav-icon" />
            </NavLink>
          </>
        )}
      </nav>

      <button className="nav-item logout-btn" onClick={handleLogout}>
        <FaSignOutAlt className="nav-icon" />
      </button>
    </div>
  );
}
