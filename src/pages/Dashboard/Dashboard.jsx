import React, { useState } from "react";
import {
  FaUser,
  FaDumbbell,
  FaRunning,
  FaBicycle,
  FaBullhorn,
  FaAppleAlt,
  FaChartLine,
  FaCreditCard,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRenew = () => {
    try {
      setLoading(true);
      navigate("/price-plan");
    } catch (error) {
      console.log(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleWorkout = () => {
    try {
      setLoading(true);
      navigate("/workout");
    } catch (error) {
      console.log(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleProfile = () => {
    try {
      setLoading(true);
      navigate("/profile");
    } catch (error) {
      console.log(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  // Sample weight history data
  const weightHistory = [
    { date: "Jan", weight: 75 },
    { date: "Feb", weight: 74 },
    { date: "Mar", weight: 73 },
    { date: "Apr", weight: 72 },
  ];

  return (
    <div className="min-h-screen bg-[#1C2128] px-4 py-8">
      <div className="flex flex-col gap-6 items-start max-w-7xl mx-auto w-full">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6 w-full">
          <div
            className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-4xl font-bold cursor-pointer hover:ring-4 hover:ring-[#FACC15] transition"
            onClick={handleProfile}
          >
            <FaUser />
          </div>
          <div className="flex-1">
            <h2 className="text-white text-2xl font-bold">Welcome, Jane Doe</h2>
            <p className="text-gray-400 text-sm">
              Membership Status:{" "}
              <span className="text-[#FACC15] font-semibold">Active</span>
            </p>
          </div>
        </div>

        {/* Main Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {/* Workout Plan */}
          <div className="bg-[#262B33] rounded-2xl p-6 flex flex-col gap-3 min-h-[200px] shadow-lg hover:shadow-2xl transition">
            <h3 className="text-white text-lg font-bold mb-2 flex items-center gap-2">
              <FaDumbbell className="text-[#FACC15]" /> Workout Plan
            </h3>
            <div className="flex flex-col gap-1 text-gray-300">
              <span className="flex items-center gap-2">
                <FaDumbbell className="text-[#FACC15]" /> Squats
              </span>
              <span className="flex items-center gap-2">
                <FaRunning className="text-[#FACC15]" /> Running
              </span>
              <span className="flex items-center gap-2">
                <FaBicycle className="text-[#FACC15]" /> Cycling
              </span>
            </div>
            <button
              onClick={handleWorkout}
              className="mt-4 bg-[#FACC15] text-black font-bold rounded-lg py-2 px-4 w-fit transition hover:bg-yellow-400 transform hover:scale-105 active:scale-95 duration-200 cursor-pointer"
            >
              View All
            </button>
          </div>

          {/* Diet Plan */}
          <div className="bg-[#262B33] rounded-2xl p-6 min-h-[200px] shadow-lg hover:shadow-2xl transition">
            <h3 className="text-white text-lg font-bold mb-2 flex items-center gap-2">
              <FaAppleAlt className="text-[#FACC15]" /> Diet Plan
            </h3>
            <div className="text-gray-300 text-sm flex flex-col gap-1">
              <div>Today's Meals:</div>
              <div className="flex items-center gap-2">
                <FaAppleAlt className="text-[#FACC15]" /> Breakfast: Smoothie (250 kcal)
              </div>
              <div className="flex items-center gap-2">
                <FaAppleAlt className="text-[#FACC15]" /> Lunch: Quinoa Bowl (400 kcal)
              </div>
              <div className="flex items-center gap-2">
                <FaAppleAlt className="text-[#FACC15]" /> Dinner: Grilled Fish (500 kcal)
              </div>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="bg-[#262B33] rounded-2xl p-6 min-h-[200px] shadow-lg hover:shadow-2xl transition">
            <h3 className="text-white text-lg font-bold mb-2 flex items-center gap-2">
              <FaChartLine className="text-[#FACC15]" /> Progress Tracker
            </h3>
            <div className="text-gray-300 mt-2 text-sm">
              <div className="font-semibold mb-2">Weight History:</div>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={weightHistory} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="date" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1C2128", border: "none" }}
                    itemStyle={{ color: "#FACC15" }}
                  />
                  <Bar dataKey="weight" fill="#FACC15" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Announcements & Payments Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-6">
          {/* Announcement Card */}
          <div className="bg-[#262B33] rounded-2xl p-6 flex flex-col gap-2 shadow-lg hover:shadow-2xl transition">
            <div className="flex items-start gap-2 mb-2">
              <FaBullhorn className="text-[#FACC15] mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">New Yoga Classes Starting!</span>
                  <span className="text-gray-400 text-xs">05 Sep 2025 · Friday</span>
                </div>
                <p className="text-gray-300 text-sm mt-1">
                  We're excited to announce that morning yoga sessions will begin from next week. Register at the front desk!
                </p>
              </div>
            </div>
          </div>

          {/* Payments Card */}
          <div className="bg-[#262B33] rounded-2xl p-6 flex flex-col gap-2 shadow-lg hover:shadow-2xl transition">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <FaCreditCard className="text-[#FACC15]" /> Payments & Membership
            </h3>
            <div className="text-gray-300 text-sm flex flex-col gap-1">
              <div>Current Plan: Gold</div>
              <div>Expiry Date: 2024-01-15</div>
            </div>
            <button
              onClick={handleRenew}
              className="mt-4 bg-[#FACC15] text-black font-bold rounded-lg py-2 px-4 w-fit transition hover:bg-yellow-400 transform hover:scale-105 active:scale-95 duration-200 cursor-pointer"
            >
              Renew/Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
