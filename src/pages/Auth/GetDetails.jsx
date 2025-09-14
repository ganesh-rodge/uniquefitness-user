import React, { useState, useCallback } from "react";
import { FaUser, FaLock, FaCalendarAlt, FaHome, FaPhoneAlt } from "react-icons/fa";
import { useRegistration } from "../../context/RegistrationContext";
import { useNavigate } from "react-router-dom";

function AnimatedInput({ id, type, placeholder, icon: Icon, value, onChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative mb-2 flex items-center">
      {Icon && <Icon className="absolute left-2 text-[#EAB308] text-lg" />}
      <input
        id={id}
        type={type}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={onChange}
        className="bg-[#232A36] text-white rounded-md px-9 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
        required
      />
      <span
        className={`absolute left-9 top-2 text-gray-400 pointer-events-none transition-all duration-300
          ${focused || value ? "opacity-0 -translate-y-2" : "opacity-100"}
        `}
      >
        {placeholder}
      </span>
    </div>
  );
}

export default function GetDetails() {
  const { registrationData, updateRegistrationData } = useRegistration();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: registrationData.fullName || "",
    password: registrationData.password || "",
    dob: registrationData.dob || "",
    address: registrationData.address || "",
    phone: registrationData.phone || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Update the context with the new data from this form
    updateRegistrationData(formData);

    // 2. Navigate to the next page immediately
    navigate("/physical-details");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A1B] px-4">
      <div className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4 items-center">
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="fullName" className="text-white text-sm font-semibold">Full Name</label>
          <AnimatedInput id="fullName" type="text" placeholder="Enter your full name" icon={FaUser} value={formData.fullName} onChange={handleChange} />

          <label htmlFor="password" className="text-white text-sm font-semibold">Password</label>
          <AnimatedInput id="password" type="password" placeholder="Enter your password" icon={FaLock} value={formData.password} onChange={handleChange} />

          <label htmlFor="dob" className="text-white text-sm font-semibold">Date of Birth</label>
          <div className="relative mb-2 flex items-center">
            <FaCalendarAlt className="absolute left-2 text-[#EAB308] text-lg" />
            <input
              id="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              className="bg-[#232A36] text-white rounded-md px-9 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <label htmlFor="address" className="text-white text-sm font-semibold">Address</label>
          <AnimatedInput id="address" type="text" placeholder="Enter your address" icon={FaHome} value={formData.address} onChange={handleChange} />

          <label htmlFor="phone" className="text-white text-sm font-semibold">Phone Number</label>
          <AnimatedInput id="phone" type="tel" placeholder="Enter your phone number" icon={FaPhoneAlt} value={formData.phone} onChange={handleChange} />

          <button type="submit" className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-full hover:bg-yellow-400 transition transform hover:scale-110 active:scale-95 mt-2">Next</button>
        </form>
      </div>
    </div>
  );
}