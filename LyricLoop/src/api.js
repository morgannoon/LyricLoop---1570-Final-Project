import axios from "axios";

// Base URLs for backend (primary + fallback)
const PRIMARY_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const SECONDARY_BASE = import.meta.env.VITE_API_BASE ? null : "http://localhost:5000/api";

// Token helpers
const getToken = () => localStorage.getItem("userToken");
export const setAuthToken = (token) => {
  if (token) localStorage.setItem("userToken", token);
  else localStorage.removeItem("userToken");
};

// Axios instance factory with auth header
const createInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
  });

  instance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return instance;
};

const primary = createInstance(PRIMARY_BASE);
const secondary = SECONDARY_BASE ? createInstance(SECONDARY_BASE) : null;

const withFallback = async (fn) => {
  try {
    return await fn(primary);
  } catch (err) {
    if (secondary) return await fn(secondary);
    throw err;
  }
};

// ---------- AUTH ----------

export const loginUser = async (email, password) =>
  withFallback(async (instance) => {
    const res = await instance.post("/auth/login", { Email: email, Password: password });
    return res.data; // { token, user }
  });

export const loginAdmin = async (email, password) =>
  withFallback(async (instance) => {
    const res = await instance.post("/auth/admin/login", { Email: email, Password: password });
    return res.data; // { token, admin }
  });

export const registerUser = async (userId, email, password, profileImageUrl = "") =>
  withFallback(async (instance) => {
    const res = await instance.post("/auth/register", {
      UserID: userId,
      Email: email,
      Password: password,
      ProfileImageURL: profileImageUrl,
    });
    return res.data;
  });

export const logoutUser = () => {
  setAuthToken(null);
  localStorage.removeItem("user");
};

// ---------- POSTS ----------

export const getPosts = async () =>
  withFallback(async (instance) => {
    const res = await instance.get("/posts");
    return res.data;
  });

export const createPost = async (
  title,
  content,
  image,
  songId = null,
  songTitle = "",
  songArtist = ""
) =>
  withFallback(async (instance) => {
    const res = await instance.post("/posts", {
      Title: title,
      Description: content,
      SongURL: image,
      SongID: songId,
      SongTitle: songTitle,
      Artist: songArtist,
    });
    return res.data;
  });

export const updatePost = async (id, title, content, image) =>
  withFallback(async (instance) => {
    const res = await instance.put(`/posts/${id}`, { Title: title, Description: content, SongURL: image });
    return res.data;
  });

export const deletePost = async (id) =>
  withFallback(async (instance) => {
    const res = await instance.delete(`/posts/${id}`);
    return res.data;
  });

// ---------- SEARCH (USERS & SONGS) ----------

// Get all users
export const getUsers = async () =>
  withFallback(async (instance) => {
    const res = await instance.get("/search/users"); // backend route: /search/users
    return res.data;
  });

// Get all songs
export const getSongs = async () =>
  withFallback(async (instance) => {
    const res = await instance.get("/search/songs"); // backend route: /search/songs
    return res.data;
  });
