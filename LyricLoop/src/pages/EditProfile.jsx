import { useState } from "react";
import "../styles/EditProfile.css";

export default function EditProfile() {
  const [username, setUsername] = useState("Morgan"); // default username
  const [email, setEmail] = useState("morgan@example.com"); // default email
  const [profilePic, setProfilePic] = useState(""); // URL of profile picture

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just log the updated profile
    console.log({ username, email, profilePic });

    alert("Profile updated! (Check console for data)");
  };

  return (
    <div className="edit-profile-container">
      <h1 className="edit-profile-title">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="edit-profile-form">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="edit-profile-input"
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="edit-profile-input"
          />
        </label>

        <label>
          Profile Picture URL:
          <input
            type="text"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
            className="edit-profile-input"
          />
        </label>

        {profilePic && (
          <div className="profile-pic-preview">
            <p>Preview:</p>
            <img src={profilePic} alt="Profile Preview" />
          </div>
        )}

        <button type="submit" className="edit-profile-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}
