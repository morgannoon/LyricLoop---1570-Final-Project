// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import BlogFeed from "./pages/BlogFeed.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminReports from "./pages/AdminReports.jsx";
import AdminAnalytics from "./pages/AdminAnalytics.jsx";
import AdminTime from "./pages/AdminTime.jsx";

import "./App.css";

// Layout wrapper to hide sidebar on login or signup pages
function Layout({ children }) {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/login" ||
    location.pathname === "/admin/login" ||
    location.pathname === "/signup";

  return (
    <div className="app-container" style={{ display: "flex" }}>
      {!hideSidebar && <Sidebar />}
      <div
        className="main-content"
        style={{
          marginLeft: hideSidebar ? "0" : "180px",
          width: "100%",
          padding: "20px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public blog feed */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* User login */}
          <Route path="/login" element={<Login initialRole="user" />} />

          {/* Admin login */}
          <Route path="/admin/login" element={<Login initialRole="admin" />} />

          {/* Sign up */}
          <Route path="/signup" element={<SignUp />} />

          {/* Create Post page */}
          <Route path="/create" element={<CreatePost />} />

          {/* Search page */}
          <Route path="/search" element={<SearchPage />} />

          {/* Edit Profile page */}
          <Route path="/profile/edit" element={<EditProfile />} />

          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/time" element={<AdminTime />} />

          {/* Catch-all redirects to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
