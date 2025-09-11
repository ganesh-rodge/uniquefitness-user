import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function CreateDiet() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    micronutrients: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#232A36] flex flex-col items-center justify-center px-2 py-8">
      <div className="bg-[#10151F] rounded-xl shadow-lg p-6 w-full max-w-sm flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-white text-lg font-bold">Create Diet Plan</h2>
          <button className="text-[#EAB308] text-xl"><FaTimes /></button>
        </div>
        <form className="flex flex-col gap-3">
          <div>
            <label className="text-white text-sm font-semibold" htmlFor="title">Diet Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., Oats + Milk"
              className="w-full bg-white rounded-md px-3 py-2 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="text-white text-sm font-semibold" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter a short description of this diet plan..."
              className="w-full bg-white rounded-md px-3 py-2 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows={2}
            />
          </div>
          <div>
            <label className="text-white text-sm font-semibold" htmlFor="calories">Calories</label>
            <input
              id="calories"
              name="calories"
              type="text"
              value={form.calories}
              onChange={handleChange}
              placeholder="e.g., 300 kcal"
              className="w-full bg-white rounded-md px-3 py-2 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="text-white text-sm font-semibold" htmlFor="protein">Protein (g)</label>
            <input
              id="protein"
              name="protein"
              type="text"
              value={form.protein}
              onChange={handleChange}
              placeholder="e.g., 12"
              className="w-full bg-white rounded-md px-3 py-2 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="text-white text-sm font-semibold" htmlFor="carbs">Carbs (g)</label>
            <input
              id="carbs"
              name="carbs"
              type="text"
              value={form.carbs}
              onChange={handleChange}
              placeholder="e.g., 45"
              className="w-full bg-white rounded-md px-3 py-2 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="text-white text-sm font-semibold" htmlFor="fats">Fats (g)</label>
            <input
              id="fats"
              name="fats"
              type="text"
              value={form.fats}
              onChange={handleChange}
              placeholder="e.g., 8"
              className="w-full bg-white rounded-md px-3 py-2 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="text-white text-sm font-semibold" htmlFor="micronutrients">Optional – Micronutrients</label>
            <input
              id="micronutrients"
              name="micronutrients"
              type="text"
              value={form.micronutrients}
              onChange={handleChange}
              placeholder="Vitamin A, C, Iron, etc."
              className="w-full bg-white rounded-md px-3 py-2 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button type="button" className="text-gray-400 w-full py-2">Cancel</button>
            <button type="submit" className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-full transition hover:bg-yellow-400">
              Save Diet Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
