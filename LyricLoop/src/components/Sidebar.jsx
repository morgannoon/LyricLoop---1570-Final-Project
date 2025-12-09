import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaPlusCircle, FaSearch, FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h1 className="sidebar-logo">My Blog</h1>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
        >
          <FaHome className="nav-icon" />
          <span className="nav-label"></span>
        </NavLink>

        <NavLink
          to="/create"
          className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
        >
          <FaPlusCircle className="nav-icon" />
          <span className="nav-label"></span>
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
        >
          <FaSearch className="nav-icon" />
          <span className="nav-label"></span>
        </NavLink>

        <NavLink
          to="/profile/edit"
          className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
        >
          <FaUserEdit className="nav-icon" />
          <span className="nav-label"></span>
        </NavLink>
      </nav>

      {/* Logout button at the bottom */}
      <button className="nav-item logout-btn" onClick={handleLogout}>
        <FaSignOutAlt className="nav-icon" />
        <span className="nav-label"></span>
      </button>
    </div>
  );
}
