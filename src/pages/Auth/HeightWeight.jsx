import React, { useState } from "react";
import { FaRulerVertical, FaWeight } from "react-icons/fa";

export default function HeightWeight() {
  const [form, setForm] = useState({ height: "", weight: "", gender: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submit logic
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
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl mx-auto flex flex-col gap-6 items-center"
      >
        <div className="w-full flex flex-col gap-2">
          <label className="text-white text-base font-semibold" htmlFor="height">
            Height
          </label>
          <div className="relative">
            <FaRulerVertical className="absolute left-3 top-3 text-[#EAB308] text-lg" />
            <input
              id="height"
              name="height"
              type="text"
              value={form.height}
              onChange={handleChange}
              placeholder="e.g. . ft"
              className="bg-[#374151] text-white rounded-md pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-white text-base font-semibold" htmlFor="weight">
            Weight
          </label>
          <div className="relative">
            <FaWeight className="absolute left-3 top-3 text-[#EAB308] text-lg" />
            <input
              id="weight"
              name="weight"
              type="text"
              value={form.weight}
              onChange={handleChange}
              placeholder="e.g. kg"
              className="bg-[#374151] text-white rounded-md pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-white text-base font-semibold">Gender</label>
          <div className="flex gap-6 items-center text-white">
            <label className="flex items-center gap-2">
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
            <label className="flex items-center gap-2">
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
            <label className="flex items-center gap-2">
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
        </div>
        <button
          type="submit"
          className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-full max-w-md transition hover:bg-yellow-400 transform hover:scale-105 active:scale-95 duration-200 mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
