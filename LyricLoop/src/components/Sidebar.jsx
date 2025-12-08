import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaPlusCircle, FaSearch, FaSignOutAlt, FaUserEdit, FaChartLine, FaFlag, FaClock } from "react-icons/fa";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on an admin page
  const isAdminPage = location.pathname.startsWith("/admin");

  // Example logout function
  const handleLogout = () => {
    localStorage.removeItem("userToken"); // adjust based on your auth
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h1 className="sidebar-logo">{isAdminPage ? "Admin" : "LyricLoop"}</h1>

      <nav className="sidebar-nav">
        {isAdminPage ? (
          <>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
            >
              <FaHome className="nav-icon" />
              <span className="nav-label">Dashboard</span>
            </NavLink>

            <NavLink
              to="/admin/stats"
              className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
            >
              <FaChartLine className="nav-icon" />
              <span className="nav-label">Stats</span>
            </NavLink>

            <NavLink
              to="/admin/reports"
              className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
            >
              <FaFlag className="nav-icon" />
              <span className="nav-label">Reports</span>
            </NavLink>

            <NavLink
              to="/admin/time"
              className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
            >
              <FaClock className="nav-icon" />
              <span className="nav-label">Time</span>
            </NavLink>
          </>
        ) : (
          <>
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
          </>
        )}
      </nav>

      {/* Logout button at the bottom */}
      <button className="nav-item logout-btn" onClick={handleLogout}>
        <FaSignOutAlt className="nav-icon" />
        <span className="nav-label"></span>
      </button>
    </div>
  );
}
