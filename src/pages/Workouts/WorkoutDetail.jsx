import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { getUserSchedule } from "../../api/api";

const days = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
];

export default function WorkoutDetail() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const data = await getUserSchedule();
        setSchedule(data);
      } catch (err) {
        console.error("❌ Fetch schedule error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const handleDayClick = (day) => {
    navigate("/select-groups", {
      state: { day, currentSelection: schedule[day.toLowerCase()] || [] },
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#1C2128] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md mx-auto bg-[#262B33] rounded-2xl shadow-2xl p-6 flex flex-col gap-5">
        {/* Header */}
        <h2 className="text-white text-2xl font-bold">Workout Schedule</h2>
        <p className="text-gray-400 text-sm">Your weekly workout plan at a glance.</p>

        {/* Days List */}
        <div className="flex flex-col gap-3">
          {days.map((day) => (
            <div
              key={day}
              className="bg-[#32383F] rounded-xl px-4 py-3 cursor-pointer hover:bg-[#3B414A] transition-shadow shadow-sm flex flex-col gap-1"
              onClick={() => handleDayClick(day)}
            >
              <div className="text-[#FACC15] font-semibold text-lg">{day}</div>
              <div className="text-white text-sm">
                {schedule[day.toLowerCase()]?.length > 0
                  ? schedule[day.toLowerCase()].join(", ")
                  : <span className="text-gray-500 italic">No muscle groups selected</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
