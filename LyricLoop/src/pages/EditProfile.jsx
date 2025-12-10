import { useState } from "react";
import "../styles/EditProfile.css";

export default function EditProfile() {
  // Default values can come from localStorage or API fetch
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [email, setEmail] = useState(storedUser.Email || "");
  const [profilePic, setProfilePic] = useState(storedUser.ProfileImageURL || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just log the updated profile
    console.log({ email, profilePic });

    alert("Profile updated! (Check console for data)");
    // Here you could call an API to update the user's profile in the backend
  };

  return (
    <div className="edit-profile-container">
      <h1 className="edit-profile-title">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="edit-profile-form">
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
            placeholder="https://example.com/image.jpg"
            className="edit-profile-input"
          />
        </label>

        <button type="submit" className="edit-profile-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}
