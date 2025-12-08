import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/AdminDashboard.css";

const API_BASE_URL = "http://localhost:5000/api";

export default function AdminReports() {
  const [stats, setStats] = useState({
    activeUsers: "0",
    avgTimePerWeek: 7,
    totalReports: 0,
    reportsCleared: 0,
    reportsNeedsReview: 0,
    reportsUnderReview: 0,
    totalUsers: 0,
  });
  const [topUsers, setTopUsers] = useState([]);
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const statsRes = await fetch(`${API_BASE_URL}/admin/stats`);
      if (statsRes.ok) setStats(await statsRes.json());

      const usersRes = await fetch(`${API_BASE_URL}/admin/top-users`);
      if (usersRes.ok) setTopUsers(await usersRes.json());

      const songsRes = await fetch(`${API_BASE_URL}/admin/trending-songs`);
      if (songsRes.ok) setTrendingSongs(await songsRes.json());
    } catch (error) {
      console.error('Error loading reports page:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num.toString();
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Reports</h1>

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
          <h2 className="card-title">Reports</h2>
          <p className="card-subtitle">
            Central place for user-submitted issues and flags. Displays reported lyrics, copyright
            concerns, spam, incorrect content, and moderation tasks. Admins can review, update
            statuses, and resolve issues.
          </p>
          <div className="reports-breakdown">
            <div className="report-item">
              <span className="report-label">Total Reports</span>
              <span className="report-value">{stats.totalReports}</span>
            </div>
            <div className="report-item cleared">
              <span className="report-label">Cleared</span>
              <span className="report-value">{stats.reportsCleared}</span>
            </div>
            <div className="report-item needs-review">
              <span className="report-label">Needs Review</span>
              <span className="report-value">{stats.reportsNeedsReview}</span>
            </div>
            <div className="report-item under-review">
              <span className="report-label">Under Review</span>
              <span className="report-value">{stats.reportsUnderReview}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2 className="card-title">Activity Snapshot</h2>
          <div className="stats-grid">
            <div className="mini-stat">
              <span className="mini-stat-value">{formatNumber(stats.activeUsers)}</span>
              <span className="mini-stat-label">Active Users</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-value">{stats.avgTimePerWeek}h</span>
              <span className="mini-stat-label">Avg Time / Week</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-value">{formatNumber(stats.totalUsers)}</span>
              <span className="mini-stat-label">Total Users</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-value">{stats.totalReports}</span>
              <span className="mini-stat-label">Reports Logged</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2 className="card-title">Top Users</h2>
          <div className="user-list">
            {topUsers.map((user) => (
              <div key={user.rank} className="user-item">
                <span className="user-rank">#{user.rank}</span>
                <div className="user-avatar">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <div className="avatar-placeholder">{user.name?.charAt(0)}</div>
                  )}
                </div>
                <span className="user-name">{user.name}</span>
                <span className="user-followers">{formatNumber(user.followers)} followers</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h2 className="card-title">Trending Songs</h2>
          <div className="song-list">
            {trendingSongs.map((song) => (
              <div key={song.rank} className="song-item">
                <span className="song-rank">#{song.rank}</span>
                <div className="song-info">
                  <span className="song-title">{song.title}</span>
                  <span className="song-artist">{song.artist}</span>
                </div>
                <span className="song-plays">{formatNumber(song.plays)} plays</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
