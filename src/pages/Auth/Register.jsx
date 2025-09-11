import React, { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = (e) => {
    e.preventDefault();
    // Send OTP logic
  };

  const handleContinue = (e) => {
    e.preventDefault();
    // Continue logic
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A1B] px-4">
      <div className="flex flex-col items-center w-full">
        <img
          src="/logoFull.jpeg"
          alt="Unique Health & Fitness Logo"
          className="w-80 h-80 object-contain mb-6 mx-auto"
          style={{ maxWidth: 320, maxHeight: 320 }}
        />
      </div>
      <form className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6 items-center">
        <div className="w-full flex flex-col gap-2">
          <label className="text-white text-base font-semibold" htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="bg-[#374151] text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
        <button
          className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-full transition hover:bg-yellow-400"
          onClick={handleSendOtp}
        >
          Send OTP
        </button>
        <div className="w-full flex flex-col gap-2">
          <label className="text-white text-base font-semibold" htmlFor="otp">OTP (6-digit)</label>
          <input
            id="otp"
            name="otp"
            type="text"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="bg-[#374151] text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
        <button
          className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-full transition hover:bg-yellow-400"
          onClick={handleContinue}
        >
          Continue
        </button>
      </form>
    </div>
  );
}
