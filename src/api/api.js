import axios from "axios";

const API = axios.create({
  baseURL: "https://uniquefitness.onrender.com/api/v1",
});

// Add Authorization header automatically if token is present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken"); // 🔑 match your Login.js
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// --- API Functions ---
export const loginUser = (formData) => API.post("/user/login", formData);

// ✅ Add this function to fetch logged-in user's data
export const getUserDetails = () => API.get("/user/get-user"); 
// <-- Ensure your backend has `/user/me` or similar route
// If your backend uses `/user/profile` or `/user/:id`, change this accordingly.

export default API;
