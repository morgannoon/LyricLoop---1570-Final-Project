import { NavLink } from "react-router-dom";
import { FaHome, FaPlusCircle, FaSearch } from "react-icons/fa";
import "../styles/Sidebar.css";

export default function Sidebar() {
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
      </nav>
    </div>
  );
}
