import React from "react";

const schedule = {
  Monday: ["Chest", "Triceps"],
  Tuesday: ["Back", "Biceps"],
  Wednesday: ["Legs"],
  Thursday: ["Shoulders"],
  Friday: ["Chest", "Triceps"],
  Saturday: ["Cardio"],
  Sunday: ["Rest day"],
};

export default function WorkoutDetail() {
  return (
    <div className="min-h-screen bg-[#181A1B] flex flex-col items-center justify-center px-2 py-8">
      <div className="w-full max-w-md mx-auto bg-[#10151F] rounded-xl shadow-lg p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-white text-2xl font-bold">Workout Schedule</h2>
          <button className="bg-[#EAB308] text-black font-bold rounded-md px-4 py-2 transition hover:bg-yellow-400">
            Edit Schedule
          </button>
        </div>
        <p className="text-gray-300 mb-2">Your weekly workout plan.</p>
        <div className="flex flex-col gap-4 mb-4">
          {Object.entries(schedule).map(([day, groups]) => (
            <div key={day} className="bg-[#232A36] rounded-lg px-4 py-3">
              <div className="text-[#EAB308] font-semibold mb-1">{day}</div>
              <div className="text-white text-base">
                {groups.map((g, idx) => (
                  <div key={idx}>{g}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
