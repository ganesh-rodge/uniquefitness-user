import React from "react";
import Button from "../../components/ButtonFull";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { loginUser } from "../../api/api";
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

     if (!formData.email || !formData.password) {
      setMessage("Please enter both username and password ❌");
      return;
    }


    try {
      const res = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      // Save token from response
      localStorage.setItem("accessToken", res.data.accessToken); // adjust if token key is different

      setMessage("Login successful ✅");
      navigate("/dashboard"); // redirect
    } catch (err) {
      console.log(err.response); // debug
      setMessage(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A1B] px-4">
      <h2 className="text-white text-4xl mb-2 mt-2 text-center">Welcome to</h2>
      <img
        src="/logoFull.jpeg"
        alt="Unique Health & Fitness Logo"
        className="w-50 object-contain mb-6 mx-auto"
      />
      <div className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4">
        <label className="text-white text-sm font-semibold" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          className="bg-[#232A36] text-white rounded-md px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={formData.email}
          onChange={(e)=>setFormData({...formData, email:e.target.value})}
        />
        <label className="text-white text-sm font-semibold" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="bg-[#232A36] text-white rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={formData.password}
          onChange={(e)=>setFormData({...formData, password: e.target.value})}
        />
        < Button content="Login" onClick={handleLogin} />
        <div className="flex justify-between items-center mt-2 text-sm">
          <Link to="/forgot-password" className="text-white hover:underline">
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