// src/api.js
import axios from "axios";

// --- BASE SETUP ---
const API_BASE = "http://localhost:5000/api";

// Retrieve JWT token from localStorage
const getToken = () => localStorage.getItem("userToken");

// Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to each request if available
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =========================
// AUTH FUNCTIONS
// =========================

// Login user
export const loginUser = async (email, password) => {
  const res = await axiosInstance.post("/auth/login", { email, password });
  return res.data; // returns { token, user }
};

// Register user
export const registerUser = async (username, email, password) => {
  const res = await axiosInstance.post("/auth/register", { username, email, password });
  return res.data;
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("userToken");
};

// =========================
// POSTS FUNCTIONS
// =========================

// Get all posts
export const getPosts = async () => {
  const res = await axiosInstance.get("/posts");
  return res.data;
};

// Create a new post
export const createPost = async (title, content, image) => {
  const res = await axiosInstance.post("/posts", { title, content, image });
  return res.data;
};

// Update a post
export const updatePost = async (id, title, content, image) => {
  const res = await axiosInstance.put(`/posts/${id}`, { title, content, image });
  return res.data;
};

// Delete a post
export const deletePost = async (id) => {
  const res = await axiosInstance.delete(`/posts/${id}`);
  return res.data;
};
