import axios from "axios";

const API = axios.create({
  baseURL: "https://uniquefitness.onrender.com/api/v1",
  withCredentials: true,
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

// --- OTP APIs ---
export const sendOtp = (email) => API.post("/user/send-otp", { email });
export const verifyOtp = (email, otp) =>
  API.post("/user/verify-otp", { email, otp });

export const forgotPassword = (email) =>
  API.post("/user/forgot-password", { email });

export const resetPassword = (email, otp, newPassword) =>
  API.post("/user/reset-password", { email, otp, newPassword });

export const getProfile = () => API.get("/user/get-user");

// ✅ Fixed: Upload photo using FormData
export const updatePhoto = async (file) => {
  try {
    const formData = new FormData();
    formData.append("livePhoto", file); // make sure field name matches backend

    const response = await API.patch("/user/update-photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    console.error("📸 Photo upload API error:", error.response?.data || error.message);
    throw error;
  }
};

export default API;
