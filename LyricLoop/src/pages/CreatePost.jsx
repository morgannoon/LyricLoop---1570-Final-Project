import { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPost } from "../api";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/CreatePost.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const isLoggedIn = useMemo(() => !!user, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isLoggedIn) {
      setError("Please log in to create a post.");
      return;
    }

    setLoading(true);
    try {
      await createPost(title, content, image);
      setSuccess("Post created! Redirecting to feed...");
      setTitle("");
      setContent("");
      setImage("");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError(err?.response?.data?.error || "Unable to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <h1 className="create-post-title">Create a New Post</h1>

      {!isLoggedIn && (
        <div className="create-post-warning">
          You need to be logged in to post.{" "}
          <Link to="/login" className="create-post-login-link">Go to login</Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="create-post-form">
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="create-post-input"
          />
        </label>

        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
            className="create-post-textarea"
          />
        </label>

        <label>
          Image URL (optional):
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="create-post-input"
          />
        </label>

        {error && <div className="create-post-error">{error}</div>}
        {success && <div className="create-post-success">{success}</div>}

        <button type="submit" className="create-post-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit Post"}
        </button>
      </form>
    </div>
  );
}
