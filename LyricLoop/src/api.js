import axios from "axios";

// Base URLs for backend (primary + fallback). Primary defaults to root server,
// fallback to /api for the ESM backend. Override with VITE_API_BASE to lock in a single base.
const PRIMARY_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const SECONDARY_BASE = import.meta.env.VITE_API_BASE ? null : "http://localhost:5000/api";

// Token helpers
const getToken = () => localStorage.getItem("userToken");
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("userToken", token);
  } else {
    localStorage.removeItem("userToken");
  }
};

// Axios instance factory with auth header
const createInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
  });

  instance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
    if (secondary) {
      return await fn(secondary);
    }
    throw err;
  }
};

// ---------- AUTH ----------
// Send both camelCase and capitalized keys so either backend flavor accepts the payload.
export const loginUser = async (email, password) => {
  return withFallback(async (instance) => {
    const res = await instance.post("/auth/login", {
      email,
      password,
      Email: email,
      Password: password,
    });
    return res.data; // { token, user }
  });
};

export const registerUser = async (username, email, password, profileImageUrl = "") => {
  return withFallback(async (instance) => {
    const res = await instance.post("/auth/register", {
      username,
      email,
      password,
      UserID: username,
      Email: email,
      Password: password,
      ProfileImageURL: profileImageUrl,
    });
    return res.data;
  });
};

export const logoutUser = () => {
  setAuthToken(null);
  localStorage.removeItem("user");
};

// ---------- POSTS ----------
export const getPosts = async () => {
  return withFallback(async (instance) => {
    const res = await instance.get("/posts");
    return res.data;
  });
};

export const createPost = async (title, content, image) => {
  return withFallback(async (instance) => {
    const res = await instance.post("/posts", {
      title,
      content,
      image,
      Title: title,
      Description: content,
      SongURL: image,
    });
    return res.data;
  });
};

export const updatePost = async (id, title, content, image) => {
  return withFallback(async (instance) => {
    const res = await instance.put(`/posts/${id}`, {
      title,
      content,
      image,
      Title: title,
      Description: content,
      SongURL: image,
    });
    return res.data;
  });
};

export const deletePost = async (id) => {
  return withFallback(async (instance) => {
    const res = await instance.delete(`/posts/${id}`);
    return res.data;
  });
};
