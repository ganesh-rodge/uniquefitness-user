import React, { useState } from "react";
import ButtonFull from "../../components/ButtonFull";
import { useNavigate } from "react-router-dom";

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

export default function ForgotPassword() {

  const navigate = useNavigate();

  function handleSend(){
    navigate("/otp-verify")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A1B] px-4">
      <div className="w-full flex flex-col items-center">
        <img
          src="/logoFull.jpeg"
          alt="Unique Health & Fitness Logo"
          className="w-50 h-50 object-contain mb-6 mx-auto"
          style={{ width: 200, height: 200 }}
        />
      </div>
      <div className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4 items-center">
        <h2 className="text-white text-2xl font-bold mb-2 text-center">Forgot Password</h2>
        <p className="text-white text-center mb-4 text-base">
          Enter your email address below and we'll<br />
          send you an OTP to reset your password.
        </p>
        <label className="text-white text-sm font-semibold w-full" htmlFor="email">
          Email Address
        </label>
        <AnimatedInput id="email" type="email" placeholder="you@example.com" />
        <ButtonFull content="Send OTP" onClick={handleSend}/>
      </div>
    </div>
  );
}
