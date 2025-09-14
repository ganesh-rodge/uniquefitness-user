import React, { useState } from "react";
import { changePassword } from "../../api/api";
import Loader from "../../components/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AnimatedInput({ id, type, placeholder, name, value, onChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative mb-2 w-full">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={onChange}
        className="bg-[#232A36] text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
        required
      />
      <span
        className={`absolute left-4 top-2 text-gray-400 pointer-events-none transition-all duration-300 ${
          focused || value ? "opacity-0 -translate-y-2" : "opacity-100"
        }`}
      >
        {placeholder}
      </span>
    </div>
  );
}

export default function ChangePassword() {
  const [formData, setFormData] = useState({ oldPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.oldPassword || !formData.newPassword) {
      setMessage("Please enter both Old Password and New Password ❌");
      return;
    }

    try {
      setLoading(true);
      console.log("📤 formData being sent:", formData);

      await changePassword(formData);
      setMessage("Change Password successful ✅");
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response);
      setMessage(error.response?.data?.message || "Change Password Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A1B] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-white text-2xl font-bold mb-1">Change Password</h2>
        <p className="text-gray-300 text-sm mb-4">
          Keep your account secure by updating your password.
        </p>

        <label className="text-white text-sm font-semibold" htmlFor="oldPassword">
          Old Password
        </label>
        <AnimatedInput
          id="oldPassword"
          name="oldPassword"
          type={showPassword ? "text" : "password"}
          value={formData.oldPassword}
          onChange={handleChange}
          placeholder="Enter old password"
        />

        <label className="text-white text-sm font-semibold" htmlFor="newPassword">
          New Password
        </label>
        <AnimatedInput
          id="newPassword"
          name="newPassword"
          type={showPassword ? "text" : "password"}
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Enter new password"
        />

        <p className="text-gray-400 text-xs mb-2">
          Password must be at least 8 characters with a mix of letters and numbers.
        </p>

        <button
          type="submit"
          className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-full transition hover:bg-yellow-400 transform hover:scale-110 active:scale-95 duration-200 mt-2"
        >
          Change Password
        </button>
        {message && <p className="text-center text-sm text-gray-300 mt-2">{message}</p>}
      </form>
    </div>
  );
}
