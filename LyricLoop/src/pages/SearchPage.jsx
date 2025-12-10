import { useEffect, useState } from "react";
import { getUsers, getSongs } from "../api";
import "../styles/SearchPage.css";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const usersData = await getUsers();
        const songsData = await getSongs();

        // Make sure the response is an array
        setUsers(Array.isArray(usersData) ? usersData : []);
        setSongs(Array.isArray(songsData) ? songsData : []);
      } catch (err) {
        setError(err?.response?.data?.error || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter only after data is loaded
  const filteredUsers = users.filter((user) =>
    user.Email.toLowerCase().includes(query.toLowerCase())
  );

  const filteredSongs = songs.filter(
    (song) =>
      song.Title.toLowerCase().includes(query.toLowerCase()) ||
      song.SongURL?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-page-container">
      <h1 className="search-page-title">Search Users & Songs</h1>

      <input
        type="text"
        placeholder="Search for users or songs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {loading && <p>Loading...</p>}
      {error && <p className="no-results">{error}</p>}

      <div className="search-section">
        <h2>Users</h2>
        {filteredUsers.length > 0 ? (
          <ul className="search-list">
            {filteredUsers.map((user) => (
              <li key={user._id || user.UserID} className="search-list-item">
                {user.Email}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-results">No users found.</p>
        )}
      </div>

      <div className="search-section">
        <h2>Songs</h2>
        {filteredSongs.length > 0 ? (
          <ul className="search-list">
            {filteredSongs.map((song) => (
              <li key={song._id} className="search-list-item">
                {song.Title} — {song.SongURL}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-results">No songs found.</p>
        )}
      </div>
    </div>
  );
}
