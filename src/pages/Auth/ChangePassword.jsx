import React, { useState } from "react";

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
        className={`absolute left-4 top-2 text-gray-400 pointer-events-none transition-all duration-300 ${focused || value ? "opacity-0 -translate-y-2" : "opacity-100"}`}
      >
        {placeholder}
      </span>
    </div>
  );
}

export default function ChangePassword() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Handle password change logic here
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A1B] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-white text-2xl font-bold mb-1">Change Password</h2>
        <p className="text-gray-300 text-sm mb-4">Keep your account secure by updating your password.</p>
        <label className="text-white text-sm font-semibold" htmlFor="oldPassword">
          Old Password
        </label>
        <AnimatedInput
          id="oldPassword"
          name="oldPassword"
          type="password"
          value={form.oldPassword}
          onChange={handleChange}
          placeholder="Enter old password"
        />
        <label className="text-white text-sm font-semibold" htmlFor="newPassword">
          New Password
        </label>
        <AnimatedInput
          id="newPassword"
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
          placeholder="Enter new password"
        />
        <p className="text-gray-400 text-xs mb-2">Password must be at least 8 characters with a mix of letters and numbers.</p>
        <label className="text-white text-sm font-semibold" htmlFor="confirmPassword">
          Confirm New Password
        </label>
        <AnimatedInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm new password"
        />
        <button
          type="submit"
          className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-full transition hover:bg-yellow-400 transform hover:scale-110 active:scale-95 duration-200 mt-2"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
