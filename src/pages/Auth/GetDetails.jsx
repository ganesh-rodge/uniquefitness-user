import React, { useState } from "react";
import { FaUser, FaLock, FaCalendarAlt, FaHome, FaPhoneAlt } from "react-icons/fa";
import ButtonFull from "../../components/ButtonFull";

function AnimatedInput({ id, type, placeholder, icon: Icon, ...props }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="relative mb-2 flex items-center">
      {Icon && <Icon className="absolute left-2 text-[#EAB308] text-lg" />}
      <input
        id={id}
        type={type}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={e => setValue(e.target.value)}
        className="bg-[#232A36] text-white rounded-md px-9 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
        {...props}
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
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A1B] px-4">
      <div className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4 items-center">
        <form className="w-full flex flex-col gap-4">
          <label className="text-white text-sm font-semibold" htmlFor="fullName">Full Name</label>
          <AnimatedInput id="fullName" type="text" placeholder="Enter your full name" icon={FaUser} />

          <label className="text-white text-sm font-semibold" htmlFor="password">Password</label>
          <AnimatedInput id="password" type="password" placeholder="Enter your password" icon={FaLock} />

          <label className="text-white text-sm font-semibold" htmlFor="dob">Date of Birth</label>
          <div className="relative mb-2 flex items-center">
            <FaCalendarAlt className="absolute left-2 text-[#EAB308] text-lg" />
            <input
              id="dob"
              type="date"
              className="bg-[#232A36] text-white rounded-md px-9 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <label className="text-white text-sm font-semibold" htmlFor="address">Address</label>
          <AnimatedInput id="address" type="text" placeholder="Enter your address" icon={FaHome} />

          <label className="text-white text-sm font-semibold" htmlFor="phone">Phone Number</label>
          <AnimatedInput id="phone" type="tel" placeholder="Enter your phone number" icon={FaPhoneAlt} />

          <button
            type="submit"
            className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-full transition hover:bg-yellow-400 transform hover:scale-110 active:scale-95 duration-200 mt-2"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
