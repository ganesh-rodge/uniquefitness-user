import React, { useState } from "react";
import { FaPlus, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const initialPlans = [
  { title: "Oats + Milk", calories: 300 },
  { title: "Keto Meal", calories: 500 },
  { title: "Protein Shake", calories: 200 },
  { title: "Salad Bowl", calories: 150 },
  { title: "Grilled Chicken", calories: 350 },
  { title: "Fruit Smoothie", calories: 250 },
];

export default function Dietplan() {
  const [plans, setPlans] = useState(initialPlans);
  const navigate = useNavigate();

  const handleAddPlan = () => {
    navigate("/create-diet", { state: { addPlan: (plan) => setPlans([...plans, plan]) } });
  };

  return (
    <div className="min-h-screen bg-[#181A1B] flex flex-col items-center justify-center px-2 py-8">
      <div className="w-full max-w-md mx-auto bg-[#10151F] rounded-xl shadow-lg p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-white text-2xl font-bold">Diet Plans</h2>
          <button className="bg-[#EAB308] rounded-full p-2 text-black text-xl" onClick={handleAddPlan}>
            <FaPlus />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {plans.map((plan, idx) => (
            <button key={idx} className="bg-[#232A36] rounded-lg px-4 py-3 text-left flex items-center justify-between">
              <div>
                <div className="text-white font-bold text-lg">{plan.title}</div>
                <div className="text-gray-300 text-sm">Calories: {plan.calories} kcal</div>
              </div>
              <FaChevronRight className="text-[#EAB308] text-lg" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
