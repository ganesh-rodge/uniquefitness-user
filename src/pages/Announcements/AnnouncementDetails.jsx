import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AnnouncementDetails() {
  return (
    <div className="min-h-screen bg-[#181A1B] flex  justify-center px-2 py-8">
      <div className=" rounded-xl p-6 w-full max-w-lg mx-auto">
        <Link to="/announcements" className="bg-[#10151F] text-[#EAB308] font-semibold rounded-md px-4 py-3 flex items-center gap-2 mb-6 hover:bg-[#232A36] transition">
          <FaArrowLeft /> Back to Announcements
        </Link>
        <h1 className="text-white text-3xl font-bold mb-2">Announcement Title</h1>
        <div className="text-gray-400 mb-4 text-sm">05 Sep 2025 · Friday</div>
        <div className="text-white mb-4">
          This is the content of the announcement. It can include multiple paragraphs, bullet points, and links.
          <ul className="list-disc ml-8 mt-2">
            <li>First bullet point</li>
            <li>Second bullet point</li>
            <li>Third bullet point</li>
          </ul>
        </div>
        <div className="text-white">
          For more details, visit our <a href="#" className="text-[#EAB308] underline">website</a>.
        </div>
      </div>
    </div>
  );
}
