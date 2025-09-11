import React from "react";
import { FaUser, FaDumbbell, FaRunning, FaBicycle, FaBullhorn, FaAppleAlt, FaChartLine, FaCreditCard } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#181A1B] px-2 py-6 md:px-4 md:py-8">
      <div className="flex flex-col gap-4 items-start max-w-7xl mx-auto w-full">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-4 w-full">
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-400 text-lg font-bold">
            <FaUser className="text-4xl" />
          </div>
          <div className="flex-1">
            <h2 className="text-white text-2xl font-bold">Welcome, Jane Doe</h2>
            <p className="text-gray-400">Membership Status: <span className="text-[#EAB308] font-semibold">Active</span></p>
          </div>
        </div>
        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {/* Workout Plan */}
          <div className="bg-[#10151F] rounded-lg p-6 flex flex-col gap-2 min-h-[180px]">
            <h3 className="text-white text-lg font-bold mb-2 flex items-center gap-2"><FaDumbbell className="text-[#EAB308]" /> Workout Plan</h3>
            <div className="flex flex-col gap-1 text-gray-300">
              <span className="flex items-center gap-2"><FaDumbbell className="text-[#EAB308]" /> Squats</span>
              <span className="flex items-center gap-2"><FaRunning className="text-[#EAB308]" /> Running</span>
              <span className="flex items-center gap-2"><FaBicycle className="text-[#EAB308]" /> Cycling</span>
            </div>
            <button className="mt-4 bg-[#EAB308] text-black font-bold rounded-md py-2 px-4 w-fit transition hover:bg-yellow-400 transform hover:scale-105 active:scale-95 duration-200">View All</button>
          </div>
          {/* Diet Plan */}
          <div className="bg-[#10151F] rounded-lg p-6 min-h-[180px]">
            <h3 className="text-white text-lg font-bold mb-2 flex items-center gap-2"><FaAppleAlt className="text-[#EAB308]" /> Diet Plan</h3>
            <div className="text-gray-300">
              <div>Today's Meals:</div>
              <div className="flex items-center gap-2"><FaAppleAlt className="text-[#EAB308]" /> Breakfast: Smoothie (250 kcal)</div>
              <div className="flex items-center gap-2"><FaAppleAlt className="text-[#EAB308]" /> Lunch: Quinoa Bowl (400 kcal)</div>
              <div className="flex items-center gap-2"><FaAppleAlt className="text-[#EAB308]" /> Dinner: Grilled Fish (500 kcal)</div>
            </div>
          </div>
          {/* Progress Tracker */}
          <div className="bg-[#10151F] rounded-lg p-6 min-h-[180px]">
            <h3 className="text-white text-lg font-bold mb-2 flex items-center gap-2"><FaChartLine className="text-[#EAB308]" /> Progress Tracker</h3>
            <div className="text-gray-300 mt-2">
              <div className="font-semibold mb-1">Weight History:</div>
              <ul className="text-sm space-y-1">
                <li>01 Jan 2024: <span className="text-[#EAB308] font-semibold">75 kg</span></li>
                <li>01 Feb 2024: <span className="text-[#EAB308] font-semibold">74 kg</span></li>
                <li>01 Mar 2024: <span className="text-[#EAB308] font-semibold">73 kg</span></li>
                <li>01 Apr 2024: <span className="text-[#EAB308] font-semibold">72 kg</span></li>
              </ul>
            </div>
          </div>
        </div>
        {/* Announcements & Payments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4">
          <div className="bg-[#10151F] rounded-lg p-6 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <FaBullhorn className="text-[#EAB308] text-lg" />
              <span className="text-white font-bold">New Yoga Classes Starting!</span>
              <span className="text-gray-400 ml-auto text-xs">05 Sep 2025 · Friday</span>
            </div>
            <p className="text-gray-300">We're excited to announce that morning yoga sessions will begin from next week. Register at the front desk!</p>
          </div>
          <div className="bg-[#10151F] rounded-lg p-6 flex flex-col gap-2">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2"><FaCreditCard className="text-[#EAB308]" /> Payments & Membership</h3>
            <div className="text-gray-300">Current Plan: Gold</div>
            <div className="text-gray-300">Expiry Date: 2024-01-15</div>
            <button className="mt-4 bg-[#EAB308] text-black font-bold rounded-md py-2 px-4 w-fit transition hover:bg-yellow-400 transform hover:scale-105 active:scale-95 duration-200">Renew/Upgrade</button>
          </div>
        </div>
      </div>
    </div>
  );
}
