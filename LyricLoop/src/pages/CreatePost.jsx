import { useState } from "react";
import "../styles/CreatePost.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ title, content, image });

    setTitle("");
    setContent("");
    setImage("");

    alert("Post submitted! (Check console for data)");
  };

  return (
    <div className="create-post-container">
      <h1 className="create-post-title">Create a New Post</h1>

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

        <button type="submit" className="create-post-button">
          Submit Post
        </button>
      </form>
    </div>
  );
}
