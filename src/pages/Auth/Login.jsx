import React, { useState } from "react";
import Button from "../../components/ButtonFull";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { loginUser } from "../../api/api";
import Loader from "../../components/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {toast} from 'react-toastify'

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  if (token) return <Navigate to="/dashboard" replace />;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage("Please enter both email and password ❌");
      return;
    }

    try {
      setLoading(true);
      const res = await loginUser(formData);
      localStorage.setItem("accessToken", res.data.data.accessToken);
       const storedToken = localStorage.getItem("accessToken");
      console.log("📌 Token stored in localStorage:", storedToken);
      localStorage.setItem("refreshToken", res.data.data.refreshToken);

      toast.success("Login successful ✅");
      navigate("/dashboard");
    } catch (err) {
      console.log(err.response);
      toast.error(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A1B] px-4">
      <h2 className="text-white text-4xl mb-2 mt-2 text-center">Welcome to</h2>
      <img
        src="/logoFull.jpeg"
        alt="Unique Health & Fitness Logo"
        className="w-50 object-contain mb-6 mx-auto"
      />
      <div className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4 relative">
        <label className="text-white text-sm font-semibold" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="text"
          placeholder="Enter your Email Id"
          className="bg-[#232A36] text-white rounded-md px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <label className="text-white text-sm font-semibold" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="bg-[#232A36] text-white rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <span
            className="absolute right-5 top-5 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <Button content="Login" onClick={handleLogin} />
        <div className="flex justify-between items-center mt-2 text-sm">
          <Link to="/reset-password" className="text-white hover:underline">
            Forgot Password?
          </Link>
          <Link to="/register" className="text-[#EAB308] hover:underline font-semibold">
            Join Us
          </Link>
        </div>
        {message && <p className="text-yellow-400 mt-2">{message}</p>}
      </div>
    </div>
  );
}
