// src/pages/BlogFeed.jsx
import { Link } from "react-router-dom";

export default function BlogFeed() {
  // Sample blog posts — replace later with API data
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
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Latest Blog Posts</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            to={`/blog/${post.id}`}
            key={post.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300"
          >
            {/* Image */}
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />

            {/* Card Content */}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-600">
                {post.author} • {post.date}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
