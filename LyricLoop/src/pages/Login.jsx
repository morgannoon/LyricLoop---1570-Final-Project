// src/pages/Login.jsx
import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { loginUser, loginAdmin } from "../api";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  // Set initial mode based on URL
  const [isAdminMode, setIsAdminMode] = useState(location.pathname === "/admin/login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email.trim()) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email.";
    if (!password) return "Password is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) return setError(v);

    setLoading(true);

    try {
      if (isAdminMode) {
        const { token, admin } = await loginAdmin(email, password);
        login({ user: { ...admin, role: "admin" }, token });
        navigate("/admin");
      } else {
        const { token, user } = await loginUser(email, password);
        login({ user: { ...user, role: "user" }, token });
        navigate("/feed");
      }
    } catch (err) {
      setError(err?.response?.data?.error || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsAdminMode((prev) => !prev);
    setError("");
  };

  return (
    <div className="spotify-login-outer">
      <form className="spotify-login-card" onSubmit={handleSubmit} aria-labelledby="login-title">
        <header className="login-header">
          <h1 id="login-title" className="title">
            {isAdminMode ? "Admin Portal" : "Sign in to Spotify"}
          </h1>
          <button type="button" className="toggle-btn" onClick={toggleMode}>
            {isAdminMode ? "Switch to User Login" : "Switch to Admin Login"}
          </button>
        </header>

        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@music.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>

        {!isAdminMode && (
          <footer className="login-footer">
            <p>
              Don’t have an account? <a href="/signup">Sign up</a>
            </p>
          </footer>
        )}
      </form>
    </div>
  );
}
