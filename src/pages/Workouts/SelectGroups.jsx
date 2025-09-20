import React, { useState } from "react";
import { FaDumbbell, FaPlus, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { updateUserSchedule } from "../../api/api";
import { toast } from "react-toastify";

const muscleGroups = [
  "Chest", "Back", "Shoulders", "Biceps", "Triceps",
  "Legs", "Abs", "Glutes", "Forearms", "Calves",
  "Cardio", "Rest"
];

export default function SelectGroups() {
  const navigate = useNavigate();
  const location = useLocation();
  const { day, currentSelection } = location.state || {};

  const [selected, setSelected] = useState(currentSelection || []);
  const [loading, setLoading] = useState(false);

  const handleAdd = (group) => {
    if (!selected.includes(group)) setSelected([...selected, group]);
  };

  const handleRemove = (group) => {
    setSelected(selected.filter((g) => g !== group));
  };

  const handleCancel = () => navigate("/workout");

  const handleDone = async () => {
    if (!day) return;
    try {
      setLoading(true);
      const payload = { [day.toLowerCase()]: selected };
      await updateUserSchedule(payload);

      toast.success(`Added schedule for ${day}`);
      navigate("/workout");
    } catch (err) {
      console.error("❌ Error updating schedule:", err);
      toast.error("Failed to update schedule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1C2128] flex flex-col items-center justify-center px-4 py-8">
      <div className="bg-[#262B33] rounded-2xl shadow-2xl p-6 w-full max-w-md flex flex-col gap-5">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl font-bold">
            {day ? `Select Muscle Groups for ${day}` : "Select Muscle Groups"}
          </h2>
          <button
            className="text-[#FACC15] text-2xl hover:text-yellow-400 transition"
            onClick={handleCancel}
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>
        <p className="text-gray-400 text-sm">
          Choose exercises for this day. Click <span className="font-semibold">+</span> to add.
        </p>

        {/* Muscle Groups List */}
        <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-2">
          {muscleGroups.map((group, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-[#32383F] rounded-xl px-4 py-3 hover:bg-[#3B414A] transition"
            >
              <span className="flex items-center gap-3 text-white font-medium">
                <FaDumbbell className="text-[#FACC15]" /> {group}
              </span>
              <button
                className={`bg-[#FACC15] rounded-full p-2 flex items-center justify-center text-black text-lg font-bold transition 
                ${selected.includes(group) ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-400 transform hover:scale-110"}`}
                onClick={() => handleAdd(group)}
                disabled={selected.includes(group)}
                aria-label={`Add ${group}`}
              >
                <FaPlus />
              </button>
            </div>
          ))}
        </div>

        {/* Selected Tags */}
        <div className="flex flex-wrap gap-2 mt-2 mb-4">
          {selected.map((group, idx) => (
            <span
              key={idx}
              className="bg-[#FACC15] text-black font-semibold rounded-full px-4 py-1 flex items-center gap-2 shadow-sm"
            >
              {group}
              <button
                className="text-black hover:text-gray-700 transition"
                onClick={() => handleRemove(group)}
                aria-label={`Remove ${group}`}
              >
                <FaTimes />
              </button>
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <button
          className="bg-[#FACC15] text-black font-bold rounded-lg py-3 w-full mb-2 transition hover:bg-yellow-400 transform hover:scale-105 active:scale-95 duration-200"
          disabled={loading}
          onClick={handleDone}
        >
          {loading ? "Saving..." : "Done"}
        </button>
        <button
          className="text-gray-400 text-sm w-full py-2 hover:text-white transition"
          onClick={handleCancel}
        >
          Cancel
        </button>

      </div>
    </div>
  );
}
