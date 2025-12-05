// src/pages/BlogFeed.jsx
import { Link } from "react-router-dom";
import "../styles/BlogFeed.css";

export default function BlogFeed() {
  const posts = [
    {
      id: 1,
      title: "Top 10 Underrated Indie Artists Right Now",
      author: "Morgan",
      date: "Dec 5, 2025",
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800",
    },
    {
      id: 2,
      title: "Why Vinyl Is Making a Massive Comeback",
      author: "Alex",
      date: "Dec 3, 2025",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800",
    },
    {
      id: 3,
      title: "The Science Behind Music That Boosts Productivity",
      author: "Taylor",
      date: "Nov 30, 2025",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800",
    },
  ];

  return (
    <div className="blog-container">
      <h1 className="blog-title">Latest Blog Posts</h1>

      <div className="blog-grid">
        {posts.map((post) => (
          <Link to={`/blog/${post.id}`} key={post.id} className="blog-card">
            <img src={post.image} alt={post.title} className="blog-image" />

            <div className="blog-content">
              <h2 className="blog-post-title">{post.title}</h2>
              <p className="blog-meta">
                {post.author} • {post.date}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
