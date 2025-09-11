import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function CreateSchedule() {
  const [schedule, setSchedule] = useState({});
  const navigate = useNavigate();

  const handleDayClick = (day) => {
    // Navigate to SelectGroups page, pass day info if needed
    navigate("/select-groups", { state: { day } });
  };

  return (
    <div className="min-h-screen bg-[#181A1B] flex flex-col items-center justify-center px-2 py-8">
      <div className="w-full max-w-md mx-auto bg-[#10151F] rounded-xl shadow-lg p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <button onClick={() => navigate(-1)} className="text-[#EAB308] text-lg font-bold flex items-center gap-1">
            <FaArrowLeft /> Back
          </button>
          <h2 className="text-white text-xl font-bold ml-2">Create Workout Schedule</h2>
        </div>
        <p className="text-gray-300 mb-2">Select the muscle groups for each day of the week.</p>
        <div className="flex flex-col gap-4 mb-4">
          {days.map((day) => (
            <div key={day}>
              <div className="text-[#EAB308] font-semibold mb-1">{day}</div>
              <button
                className="w-full bg-white rounded-md py-4 px-2 text-left font-semibold text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onClick={() => handleDayClick(day)}
              >
                {schedule[day] && schedule[day].length > 0
                  ? schedule[day].join(", ")
                  : `Select muscle groups for ${day}`}
              </button>
            </div>
          ))}
        </div>
        <button className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-full mb-2 transition hover:bg-yellow-400 transform hover:scale-105 active:scale-95 duration-200">
          Save Schedule
        </button>
        <button className="text-gray-400 w-full py-2">Cancel</button>
      </div>
    </div>
  );
}
