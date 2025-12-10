import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { createPost, getSongs } from "../api";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/CreatePost.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [songMode, setSongMode] = useState("existing"); // "existing" or "new"
  const [existingSongId, setExistingSongId] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { user } = useContext(AuthContext);
  const isLoggedIn = useMemo(() => !!user, [user]);

  useEffect(() => {
    if (songMode === "existing") {
      const fetchSongs = async () => {
        try {
          const data = await getSongs();
          setSongs(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error("Failed to load songs:", err);
        }
      };
      fetchSongs();
    }
  }, [songMode]);

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
      let songInfo = {};
      if (songMode === "existing") {
        if (!existingSongId) {
          setError("Please select a song from the list.");
          setLoading(false);
          return;
        }
        songInfo.SongID = existingSongId;
      } else {
        // new song
        if (!songTitle || !songArtist) {
          setError("Please provide both title and artist for the new song.");
          setLoading(false);
          return;
        }
        songInfo.songTitle = songTitle;
        songInfo.songArtist = songArtist;
      }

      await createPost(title, content, image, songInfo.songTitle, songInfo.songArtist, songInfo.SongID);

      setSuccess("Post created successfully!");
      setTitle("");
      setContent("");
      setImage("");
      setSongTitle("");
      setSongArtist("");
      setExistingSongId("");
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

        {/* Song Mode Switch */}
        <div className="song-mode-switch">
          <label>
            <input
              type="radio"
              value="existing"
              checked={songMode === "existing"}
              onChange={() => setSongMode("existing")}
            />{" "}
            Use Existing Song
          </label>
          <label>
            <input
              type="radio"
              value="new"
              checked={songMode === "new"}
              onChange={() => setSongMode("new")}
            />{" "}
            Add New Song
          </label>
        </div>

        {songMode === "existing" && (
          <label>
            Select Song:
            <select
              value={existingSongId}
              onChange={(e) => setExistingSongId(e.target.value)}
              className="create-post-input"
            >
              <option value="">-- Select a song --</option>
              {songs.map((song) => (
                <option key={song._id} value={song._id}>
                  {song.Title} — {song.Artist}
                </option>
              ))}
            </select>
          </label>
        )}

        {songMode === "new" && (
          <>
            <label>
              Song Title:
              <input
                type="text"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                className="create-post-input"
              />
            </label>

            <label>
              Artist:
              <input
                type="text"
                value={songArtist}
                onChange={(e) => setSongArtist(e.target.value)}
                className="create-post-input"
              />
            </label>
          </>
        )}

        {error && <div className="create-post-error">{error}</div>}
        {success && <div className="create-post-success">{success}</div>}

        <button type="submit" className="create-post-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit Post"}
        </button>
      </form>
    </div>
  );
}
