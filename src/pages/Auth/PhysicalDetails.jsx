import React, { useState } from "react";
import { FaRulerVertical, FaWeight, FaEye, FaEyeSlash } from "react-icons/fa";

function AnimatedInput({ id, type, placeholder, name, value, onChange, icon: Icon }) {
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="relative mb-2 w-full flex items-center">
      {Icon && <Icon className="absolute left-2 text-[#EAB308] text-lg" />}
      <input
        id={id}
        name={name}
        type={isPassword && show ? "text" : type}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={onChange}
        className="bg-[#232A36] text-white rounded-md px-9 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-10"
        required
      />
      <span
        className={`absolute left-9 top-2 text-gray-400 pointer-events-none transition-all duration-300 ${focused || value ? "opacity-0 -translate-y-2" : "opacity-100"}`}
      >
        {placeholder}
      </span>
      {isPassword && (
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShow((s) => !s)}
          className="absolute right-2 text-gray-400 hover:text-[#EAB308] focus:outline-none"
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
}

export default function HeightWeight() {
  const [form, setForm] = useState({ height: "", weight: "", gender: "", password: "" });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A1B] px-4">
      <img
        src="/logoFull.jpeg"
        alt="Unique Health & Fitness Logo"
        className="w-48 h-48 object-contain mb-6 mx-auto"
      />
      <form
        onSubmit={handleSubmit}
        className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4 items-center"
      >
        <label className="text-white text-sm font-semibold w-full" htmlFor="height">
          Height
        </label>
        <AnimatedInput
          id="height"
          name="height"
          type="text"
          value={form.height}
          onChange={handleChange}
          placeholder="e.g. 5.8 ft"
          icon={FaRulerVertical}
        />
        <label className="text-white text-sm font-semibold w-full" htmlFor="weight">
          Weight
        </label>
        <AnimatedInput
          id="weight"
          name="weight"
          type="text"
          value={form.weight}
          onChange={handleChange}
          placeholder="e.g. 70 kg"
          icon={FaWeight}
        />
        <label className="text-white text-sm font-semibold w-full" htmlFor="password">
          Password
        </label>
        <AnimatedInput
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
        <label className="text-white text-sm font-semibold w-full" htmlFor="gender">
          Gender
        </label>
        <div className="flex gap-4 w-full text-white items-center">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={form.gender === "male"}
              onChange={handleChange}
              className="accent-[#EAB308]"
            />
            Male
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={form.gender === "female"}
              onChange={handleChange}
              className="accent-[#EAB308]"
            />
            Female
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="gender"
              value="other"
              checked={form.gender === "other"}
              onChange={handleChange}
              className="accent-[#EAB308]"
            />
            Other
          </label>
        </div>
        <button
          type="submit"
          className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-full transition hover:bg-yellow-400 transform hover:scale-110 active:scale-95 duration-200 mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
