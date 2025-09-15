import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../../context/RegistrationContext";

export default function PhysicalDetails() {
  const { registrationData, updateRegistrationData } = useRegistration();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    height: registrationData.height || "",
    weight: registrationData.weight || "",
    gender: registrationData.gender || "male",
  });

  // ✅ New state to track if we should navigate
  const [shouldNavigate, setShouldNavigate] = useState(false);

  // ✅ useEffect to watch for context changes and navigate
  useEffect(() => {
    // This condition checks if we're ready to navigate AND if the context has been updated with the height
    if (shouldNavigate && registrationData.height === form.height) {
      navigate("/live-photo");
    }
  }, [shouldNavigate, registrationData, form, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Update context with the new form data
    updateRegistrationData(form);

    // 2. Set the flag to true. This will trigger the useEffect.
    setShouldNavigate(true);
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
        <input
          id="height"
          name="height"
          type="text"
          value={form.height}
          onChange={handleChange}
          placeholder="e.g. 5.8 ft"
          className="bg-[#232A36] text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <label className="text-white text-sm font-semibold w-full" htmlFor="weight">
          Weight
        </label>
        <input
          id="weight"
          name="weight"
          type="text"
          value={form.weight}
          onChange={handleChange}
          placeholder="e.g. 70 kg"
          className="bg-[#232A36] text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <label className="text-white text-sm font-semibold w-full" htmlFor="gender">
          Gender
        </label>
        <div className="flex gap-4 w-full text-white items-center">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={form.gender === "Male"}
              onChange={handleChange}
              className="accent-[#EAB308]"
            />
            Male
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={form.gender === "Female"}
              onChange={handleChange}
              className="accent-[#EAB308]"
            />
            Female
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={form.gender === "Other"}
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
          Next
        </button>
      </form>
    </div>
  );
}