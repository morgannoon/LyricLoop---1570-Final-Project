// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import BlogFeed from "./pages/BlogFeed.jsx";
import Login from "./pages/Login.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container" style={{ display: "flex" }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="main-content" style={{ marginLeft: "220px", width: "100%", padding: "20px" }}>
          <Routes>
            {/* Public blog feed */}
            <Route path="/" element={<BlogFeed />} />

            {/* User login */}
            <Route path="/login" element={<Login initialRole="user" />} />

            {/* Admin login */}
            <Route path="/admin/login" element={<Login initialRole="admin" />} />

            {/* Create Post placeholder */}
            <Route path="/create" element={<h2>Create Post Page</h2>} />

            {/* Search placeholder */}
            <Route path="/search" element={<h2>Search Page</h2>} />

            {/* Catch-all redirects to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
