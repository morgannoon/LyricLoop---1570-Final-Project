import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/BlogFeed.css";

export default function BlogFeed() {
  // Sample posts (simulate current logged-in user's posts)
  const initialPosts = [
    {
      id: 1,
      title: "Top 10 Underrated Indie Artists Right Now",
      author: "Morgan",
      date: "Dec 5, 2025",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800",
      userOwned: true,
    },
    {
      id: 2,
      title: "Why Vinyl Is Making a Massive Comeback",
      author: "Alex",
      date: "Dec 3, 2025",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800",
      userOwned: false,
    },
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Delete post
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  // Start editing
  const handleEdit = (post) => {
    setEditingPost(post.id);
    setEditTitle(post.title);
    setEditContent(post.content || "");
  };

  // Save edited post
  const handleSave = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, title: editTitle, content: editContent } : post
      )
    );
    setEditingPost(null);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingPost(null);
  };

  return (
    <div className="blog-container">
      <h1 className="blog-title">Latest Blog Posts</h1>
      <div className="blog-grid">
        {posts.map((post) => (
          <div key={post.id} className="blog-card">
            <img src={post.image} alt={post.title} className="blog-image" />
            <div className="blog-content">
              {editingPost === post.id ? (
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
                    <button onClick={() => handleSave(post.id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="blog-post-title">{post.title}</h2>
                  <p className="blog-meta">{post.author} • {post.date}</p>
                  {post.userOwned && (
                    <div className="post-actions">
                      <button onClick={() => handleEdit(post)}>Edit</button>
                      <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
