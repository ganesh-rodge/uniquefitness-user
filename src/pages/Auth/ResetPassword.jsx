import React, { useState } from "react";
import ButtonFull from "../../components/ButtonFull";
import {  useNavigate } from "react-router-dom";

function AnimatedInput({ id, type, placeholder }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  

  return (
    <div className="relative mb-2">
      <input
        id={id}
        type={type}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={e => setValue(e.target.value)}
        className="bg-[#232A36] text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
        required
      />
      <span
        className={`absolute left-4 top-2 text-gray-400 pointer-events-none transition-all duration-300
          ${focused || value ? "opacity-0 -translate-y-2" : "opacity-100"}
        `}
      >
        {placeholder}
      </span>
    </div>
  );
}

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate()

  function handleReset(){
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A1B] px-4">
      <img
        src="/logoFull.jpeg"
        alt="Unique Health & Fitness Logo"
        className="w-48 h-48 object-contain mb-6 mx-auto"
      />
      <div className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4 items-center">
        <h2 className="text-white text-2xl font-bold mb-2 text-center">Reset Password</h2>
        <form className="w-full flex flex-col gap-4">
          <div className="flex gap-2 items-center w-full">
            <AnimatedInput id="email" type="email" placeholder="user@example.com" />
            <button
              type="button"
              className="bg-[#EAB308] text-black font-bold rounded-md px-4 py-2 transition hover:bg-yellow-400 whitespace-nowrap transform hover:scale-110 active:scale-95 duration-200"
            >
              Send OTP
            </button>
          </div>
          <AnimatedInput id="otp" type="text" placeholder="Enter OTP" />
          <AnimatedInput id="newPassword" type="password" placeholder="New Password" />
          <AnimatedInput id="confirmPassword" type="password" placeholder="Confirm New Password" />
          <ButtonFull
            content={"Reset Password"}
            onClick={handleReset}
          />
           
          
        </form>
      </div>
    </div>
  );
}
