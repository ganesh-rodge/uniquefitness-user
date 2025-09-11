import React from "react";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

// Example diet detail data (should be passed via navigation or fetched)
const dietDetail = {
  title: "Keto Diet Plan",
  description:
    "This diet plan is designed to help you achieve ketosis, a metabolic state where your body burns fat for fuel instead of carbohydrates. It includes a variety of low-carb foods and is high in healthy fats.",
  calories: 300,
  protein: 12,
  carbs: 45,
  fats: 8,
  micronutrients: "Vitamins: A, C, D, E | Minerals: Calcium, Iron",
};

export default function DietDetail() {
  const navigate = useNavigate();
  // const location = useLocation();
  // const dietDetail = location.state?.dietDetail || {};

  return (
    <div className="min-h-screen bg-[#181A1B] flex flex-col items-center justify-center px-2 py-8">
      <div className="border-4 border-[#2196F3] rounded-xl p-6 w-full max-w-md mx-auto bg-[#10151F] flex flex-col gap-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#EAB308] font-semibold mb-2">
          <FaArrowLeft /> Back to Diet Plans
        </button>
        <h2 className="text-white text-2xl font-bold mb-2">{dietDetail.title}</h2>
        <p className="text-gray-300 mb-4">{dietDetail.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="bg-[#EAB308] text-black font-bold rounded-md py-3 text-center text-lg">{dietDetail.calories} kcal</div>
          <div className="bg-[#232A36] text-white font-semibold rounded-md py-3 text-center">Protein: {dietDetail.protein}g</div>
          <div className="bg-[#232A36] text-white font-semibold rounded-md py-3 text-center">Carbs: {dietDetail.carbs}g</div>
          <div className="bg-[#232A36] text-white font-semibold rounded-md py-3 text-center">Fats: {dietDetail.fats}g</div>
        </div>
        <div className="text-gray-300 text-sm mb-4">{dietDetail.micronutrients}</div>
        <div className="flex gap-4 justify-end">
          <button className="bg-[#EAB308] text-black font-bold rounded-md px-4 py-2 flex items-center gap-2 transition hover:bg-yellow-400">
            <FaEdit /> Edit
          </button>
          <button className="bg-red-600 text-white font-bold rounded-md px-4 py-2 flex items-center gap-2 transition hover:bg-red-700">
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
