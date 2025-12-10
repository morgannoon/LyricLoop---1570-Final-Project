// src/pages/BlogFeed.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { deletePost, getPosts, updatePost } from "../api";
import "../styles/BlogFeed.css";

export default function BlogFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const currentUserId = useMemo(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("user"));
      return stored?._id ? stored._id.toString() : null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError(err?.response?.data?.error || "Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err?.response?.data?.error || "Could not delete the post.");
    }
  };

  const handleEdit = (post) => {
    setEditingId(post._id);
    setEditTitle(post.Title);
    setEditContent(post.Description || "");
  };

  const handleSave = async (id) => {
    try {
      // Find the original post in state
      const originalPost = posts.find((p) => p._id === id);
      if (!originalPost) return;
  
      // Call API to update the post
      await updatePost(
        id,
        editTitle,
        editContent,
        originalPost.SongURL || originalPost.image || ""
      );
  
      // Merge changes into the original post to preserve author info
      const updatedPost = {
        ...originalPost,
        Title: editTitle,
        Description: editContent,
      };
  
      // Update posts in state
      setPosts((prev) =>
        prev.map((p) => (p._id === id ? updatedPost : p))
      );
  
      setEditingId(null);
    } catch (err) {
      setError(err?.response?.data?.error || "Could not update the post.");
    }
  };
  

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="blog-container">
      <div className="blog-title-row">
        <h1 className="blog-title">Latest Blog Posts</h1>
        <Link to="/create" className="create-link">
          + New Post
        </Link>
      </div>

      {error && <div className="blog-error">{error}</div>}
      {loading && <p>Loading posts...</p>}
      {!loading && posts.length === 0 && <p>No posts yet. Be the first to share!</p>}

      <div className="blog-grid">
        {posts.map((post) => {
          const postTitle = post.Title || post.title;
          const postDesc = post.Description || post.content;
          const postImage = post.SongURL || post.image;
          const postAuthor = post.UserID?.Email || post.author?.username || post.author?.email || "Unknown";
          const postAuthorId = post.UserID?._id?.toString() || post.author?._id?.toString() || post.author?._id || null;
          return (
          <div key={post._id} className="blog-card">
            {postImage && <img src={postImage} alt={postTitle} className="blog-image" />}
            <div className="blog-content">
              {editingId === post._id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="edit-input"
                  />
                  <textarea
                    rows={4}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="edit-textarea"
                  />
                  <div className="edit-buttons">
                    <button onClick={() => handleSave(post._id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="blog-post-title">{postTitle}</h2>
                  <p className="blog-meta">
                    {postAuthor} •{" "}
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Just now"}
                  </p>
                  {postDesc && <p className="blog-description">{postDesc}</p>}
                  {postAuthorId === currentUserId && (
                    <div className="post-actions">
                      <button onClick={() => handleEdit(post)}>Edit</button>
                      <button onClick={() => handleDelete(post._id)}>Delete</button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
