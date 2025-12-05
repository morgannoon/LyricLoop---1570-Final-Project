import axios from "axios";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_SECRET;

// Get access token
export async function getToken() {
  const res = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
      },
    }
  );

  return res.data.access_token;
}

export async function searchTrack(query) {
  const token = await getToken();
  const res = await axios.get(
    `https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data.tracks.items;
}
