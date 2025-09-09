import React, { useState } from "react";
import Button from "../../components/ButtonFull";
import { FaUser, FaLock, FaKey, FaUserPlus } from "react-icons/fa";

function AnimatedInput({ id, type, placeholder, icon: Icon }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="relative mb-2 flex items-center">
      {Icon && <Icon className="absolute left-2 text-gray-400 text-lg" />}
      <input
        id={id}
        type={type}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        className={`bg-[#232A36] text-white rounded-md px-9 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400`}
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

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#000000] px-4">
      <h2 className="text-white text-4xl mb-2 mt-2 text-center">Welcome to</h2>
      <img
        src="/logoFull.jpeg"
        alt="Unique Health & Fitness Logo"
        className="w-50 object-contain mb-3 mx-auto"
      />
      <div className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4">
        <label className="text-white text-sm font-semibold" htmlFor="username">
          Username
        </label>
        <AnimatedInput id="username" type="text" placeholder="Enter your username" icon={FaUser} />
        <label className="text-white text-sm font-semibold" htmlFor="password">
          Password
        </label>
        <AnimatedInput id="password" type="password" placeholder="Enter your password" icon={FaLock} />
        <Button content="Login" />
        <div className="flex justify-between items-center mt-2 text-sm">
          <a href="#" className="flex items-center text-white hover:underline gap-1">
            <FaKey className="text-[#EAB308]" /> Forgot Password?
          </a>
          <a href="#" className="flex items-center text-[#EAB308] hover:underline font-semibold gap-1">
            <FaUserPlus className="text-[#EAB308]" /> Join Us
          </a>
        </div>
      </div>
    </div>
  );
}