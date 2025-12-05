import { useState } from "react";
import "../styles/SearchPage.css";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  // Sample users and songs data
  const users = [
    { id: 1, name: "Morgan" },
    { id: 2, name: "Alex" },
    { id: 3, name: "Taylor" },
  ];

  const songs = [
    { id: 1, title: "Lost in the Echo", artist: "Linkin Park" },
    { id: 2, title: "Dreams", artist: "Fleetwood Mac" },
    { id: 3, title: "Blinding Lights", artist: "The Weeknd" },
  ];

  // Filter based on query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
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

      <div className="search-section">
        <h2>Users</h2>
        {filteredUsers.length > 0 ? (
          <ul className="search-list">
            {filteredUsers.map((user) => (
              <li key={user.id} className="search-list-item">
                {user.name}
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
              <li key={song.id} className="search-list-item">
                {song.title} — {song.artist}
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
