import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/AdminDashboard.css";

const API_BASE_URL = "http://localhost:5000/api";

const timeInsights = [
  { title: "Most active hours of the day", detail: "Afternoon / evening spikes" },
  { title: "Uploads per hour", detail: "Peaks around midday" },
  { title: "User activity by weekday", detail: "Wed/Thu strongest" },
  { title: "Daily/weekly usage patterns", detail: "Late sessions rising" },
  { title: "Time heatmaps", detail: "Visual peaks mapped" },
];

export default function AdminTime() {
  const [stats, setStats] = useState({
    activeUsers: "0",
    avgTimePerWeek: 7,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const statsRes = await fetch(`${API_BASE_URL}/admin/stats`);
      if (statsRes.ok) setStats(await statsRes.json());
    } catch (error) {
      console.error('Error loading time page:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading time view...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Time</h1>

      <div className="admin-nav">
        <NavLink to="/admin" className={({ isActive }) => `nav-pill ${isActive ? "active" : ""}`}>
          Overview
        </NavLink>
        <NavLink to="/admin/reports" className={({ isActive }) => `nav-pill ${isActive ? "active" : ""}`}>
          Reports
        </NavLink>
        <NavLink to="/admin/analytics" className={({ isActive }) => `nav-pill ${isActive ? "active" : ""}`}>
          Analytics
        </NavLink>
        <NavLink to="/admin/time" className={({ isActive }) => `nav-pill ${isActive ? "active" : ""}`}>
          Time
        </NavLink>
      </div>

      <div className="content-grid">
        <div className="dashboard-card">
          <h2 className="card-title">Usage Patterns</h2>
          <p className="card-subtitle">
            Tracks time-based activity and usage patterns. Shows peak hours, upload times, busiest
            days, and time-related trends so admins know when users are most active.
          </p>
          <div className="reports-breakdown">
            {timeInsights.map((item) => (
              <div className="report-item" key={item.title}>
                <span className="report-label">{item.title}</span>
                <span className="report-value">{item.detail}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h2 className="card-title">Time Snapshot</h2>
          <div className="stats-grid">
            <div className="mini-stat">
              <span className="mini-stat-value">{stats.avgTimePerWeek}h</span>
              <span className="mini-stat-label">Avg Time / Week</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-value">{stats.activeUsers}</span>
              <span className="mini-stat-label">Active Users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
