import React from "react";
import { FaWeight } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const weightData = [
  { date: "05 Sep", weight: 75 },
  { date: "06 Sep", weight: 73 },
  { date: "11 Sep", weight: 70 },
  { date: "18 Sep", weight: 74 },
  { date: "09 Sep", weight: 75 },
];

export default function WeightHistory() {
  return (
    <div className="min-h-screen bg-[#181A1B] flex flex-col items-center justify-center px-2 py-8">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-white text-3xl font-bold mb-1 flex items-center gap-2">
          <FaWeight className="text-[#EAB308]" /> Weight History
        </h1>
        <p className="text-gray-300 mb-4">Track your progress over time</p>
        <div className="bg-[#232A36] rounded-lg overflow-hidden shadow mb-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 text-white font-semibold">Date</th>
                <th className="py-3 px-4 text-right text-white font-semibold">Weight</th>
              </tr>
            </thead>
            <tbody>
              {weightData.map((entry, idx) => (
                <tr key={idx} className="border-b border-gray-700 last:border-b-0">
                  <td className="py-2 px-4 font-bold text-white">{entry.date}</td>
                  <td className="py-2 px-4 text-right text-[#EAB308] font-bold">{entry.weight} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Recharts Bar Chart */}
        <div className="bg-[#232A36] rounded-lg p-4 shadow flex flex-col gap-2">
          <div className="text-white font-semibold mb-2">Weight Trend</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weightData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#E5E7EB" />
              <YAxis stroke="#E5E7EB" unit=" kg" />
              <Tooltip contentStyle={{ background: '#232A36', border: 'none', color: '#fff' }} labelStyle={{ color: '#EAB308' }} />
              <Bar dataKey="weight" fill="#EAB308" radius={[6, 6, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
