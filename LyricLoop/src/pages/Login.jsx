import React, { useState } from "react";
import "../styles/Login.css";

/**
 * Props:
 *  - onSubmit({ role, email, password, adminCode? }) : function to handle submit
 *  - initialRole: "user" | "admin" (optional)
 */
export default function Login({ onSubmit = () => {}, initialRole = "user" }) {
  const [role, setRole] = useState(initialRole); // "user" or "admin"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleRole = () => {
    setError("");
    setRole((r) => (r === "user" ? "admin" : "user"));
  };

  const validate = () => {
    if (!email.trim()) return "Email is required.";
    // simple email check
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email.";
    if (!password) return "Password is required.";
    if (role === "admin" && !adminCode.trim()) return "Admin code is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      // call parent handler (replace with real API call)
      await Promise.resolve(onSubmit({ role, email, password, adminCode }));
    } catch (err) {
      setError(err?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="spotify-login-outer">
      <form className="spotify-login-card" onSubmit={handleSubmit} aria-labelledby="login-title">
        <header className="login-header">
          <h1 id="login-title" className="title">
            {role === "user" ? "Sign in to Spotify" : "Admin Portal"}
          </h1>

          <button
            type="button"
            className="role-toggle"
            onClick={toggleRole}
            aria-pressed={role === "admin"}
            aria-label={`Switch to ${role === "user" ? "admin" : "user"} login`}
          >
            Switch to {role === "user" ? "Admin" : "User"}
          </button>
        </header>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@music.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={role === "admin" ? "current-password" : "on"}
            required
          />
        </div>

        {role === "admin" && (
          <div className="field">
            <label htmlFor="adminCode">Admin code</label>
            <input
              id="adminCode"
              name="adminCode"
              type="password"
              placeholder="Enter admin code"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              autoComplete="off"
            />
            <small className="hint">Admins only — your secret management code.</small>
          </div>
        )}

        {error && <div role="alert" className="error">{error}</div>}

        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? "Signing in…" : role === "user" ? "Sign in" : "Sign in as Admin"}
        </button>

        <footer className="login-footer">
          {role === "user" ? (
            <p>
              Don’t have an account? <a href="/signup">Sign up</a>
            </p>
          ) : (
            <p className="admin-note">Admin access is logged. Make sure you have permission.</p>
          )}
        </footer>
      </form>
    </div>
  );
}
