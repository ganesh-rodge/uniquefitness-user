import React, { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";

export default function Aadhaar() {
  const fileInputRef = useRef(null);
  const [aadhaarImage, setAadhaarImage] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAadhaarImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleCapture = async () => {
    // Implement camera capture logic if needed
    alert("Camera capture not implemented in this demo.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A1B] px-4">
      <img
        src="/logoFull.jpeg"
        alt="Unique Health & Fitness Logo"
        className="w-48 h-48 object-contain mb-6 mx-auto"
      />
      <div className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4 items-center">
        <h2 className="text-white text-xl font-bold mb-4 text-center">Upload Aadhaar Photo</h2>
        <button
          onClick={handleUploadClick}
          className="border-2 border-[#EAB308] bg-transparent text-[#EAB308] font-bold rounded-md py-2 w-full flex items-center justify-center gap-2 transition hover:bg-[#EAB308] hover:text-black"
        >
          <FaUpload className="text-[#EAB308] text-lg" /> Upload from Files
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
        <button
          onClick={handleCapture}
          className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-full transition hover:bg-yellow-400 transform hover:scale-105 active:scale-95 duration-200"
        >
          Capture from Camera
        </button>
        <button
          disabled={!aadhaarImage}
          className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-full transition hover:bg-yellow-400 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
