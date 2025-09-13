import React, { useState } from "react";
import { FaDumbbell, FaPlus, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const muscleGroups = [
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Legs",
  "Abs",
  "Glutes",
  "Forearms",
  "Calves",
  "Cardio",
];

export default function SelectGroups() {
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdd = (group) => {
    if (!selected.includes(group)) {
      setSelected([...selected, group]);
    }
  };

  const handleRemove = (group) => {
    setSelected(selected.filter((g) => g !== group));
  };

  function handleCancel(){
    try {
      setLoading(true)

      navigate("/create-schedule")
    } catch (error) {
      console.log(error?.response?.data)
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#232A36] flex flex-col items-center justify-center px-2 py-8">
      <div className="bg-[#181A1B] rounded-xl shadow-lg p-6 w-full max-w-md flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-white text-lg font-bold">Select Muscle Groups</h2>
          <button className="text-[#EAB308] text-xl cursor-pointer" onClick={handleCancel}><FaTimes /></button>
        </div>
        <p className="text-gray-300 mb-2">Add the exercises for this day.</p>
        <div className="flex flex-col gap-3 mb-2">
          {muscleGroups.map((group, idx) => (
            <div key={idx} className="flex items-center justify-between bg-[#374151] rounded-lg px-4 py-3">
              <span className="flex items-center gap-2 text-white font-semibold">
                <FaDumbbell className="text-[#EAB308]" /> {group}
              </span>
              <button
                className="bg-[#EAB308] rounded-full p-2 flex items-center justify-center text-black text-lg font-bold hover:bg-yellow-400 transition cursor-pointer"
                onClick={() => handleAdd(group)}
                disabled={selected.includes(group)}
              >
                <FaPlus />
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {selected.map((group, idx) => (
            <span key={idx} className="bg-[#EAB308] text-black font-semibold rounded-full px-4 py-1 flex items-center gap-2">
              {group}
              <button className="text-black cursor-pointer" onClick={() => handleRemove(group)}><FaTimes /></button>
            </span>
          ))}
        </div>
        <button
          className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-full mb-2 transition hover:bg-yellow-400 transform hover:scale-105 active:scale-95 duration-200 cursor-pointer"
          disabled={selected.length === 0}
        >
          Done
        </button>
        <button className="text-gray-400 w-full py-2 cursor-pointer" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}
