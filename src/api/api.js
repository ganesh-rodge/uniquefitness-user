import axios from "axios";

const API = axios.create({
  baseURL: "https://uniquefitness.onrender.com/api/v1",
  withCredentials: true
});

// Add Authorization header automatically if token is present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    console.log("📌 Using token:", token);
  }
  return req;
});

// --- Auth APIs ---
export const loginUser = (formData) => API.post("/user/login", formData);

export const changePassword = (formData) => 
  API.patch("/user/change-password", formData);

// ---OTP APIs ---
// --- OTP APIs ---
export const sendOtp = (email) => API.post("/user/send-otp", { email });
export const verifyOtp = (email, otp) =>
  API.post("/user/verify-otp", { email, otp });


export default API;
