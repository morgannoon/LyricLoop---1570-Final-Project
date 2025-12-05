// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import BlogFeed from "./pages/BlogFeed.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main blog feed */}
        <Route path="/" element={<BlogFeed />} />

        {/* User login (default mode) */}
        <Route path="/login" element={<Login initialRole="user" />} />

        {/* Admin login */}
        <Route path="/admin/login" element={<Login initialRole="admin" />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
