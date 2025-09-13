import React from "react";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#10151F] px-4 py-8">
      <div className=" rounded-xl shadow-lg p-8 w-full max-w-2xl flex flex-col gap-4 items-center">
        <h1 className="text-white text-3xl font-bold mb-2 text-center">Privacy Policy</h1>
        <p className="text-gray-300 text-center text-base mb-2">
          Unique Health & Fitness Gym is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
        </p>
        <ul className="text-gray-400 text-left list-disc pl-6 space-y-2 w-full">
          <li>We collect personal information such as name, contact details, and fitness preferences only for membership and service purposes.</li>
          <li>Your data is stored securely and is not shared with third parties except as required by law.</li>
          <li>We use your information to provide personalized fitness plans, updates, and communication about our services.</li>
          <li>You may request to access, update, or delete your personal information at any time by contacting us.</li>
          <li>Our website may use cookies to enhance your browsing experience.</li>
        </ul>
        <p className="text-gray-300 text-center text-base mt-4">
          If you have any questions about our privacy policy, please contact us at <span className="text-[#EAB308]">uniquehealthfitness@gmail.com</span>.
        </p>
      </div>
    </div>
  );
}
