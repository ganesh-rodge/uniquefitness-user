import React, { useState } from "react";
import { FaCamera, FaPencilAlt } from "react-icons/fa";

const initialProfile = {
  name: "John Doe",
  phone: "+1 234 567 890",
  email: "john.doe@example.com",
  dob: "1990-01-01",
  gender: "Male",
  height: "180 cm",
  weight: "75 kg",
  address: "123 Main St,\nAnytown, USA",
};

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");

  const handleEdit = (field) => {
    setEditField(field);
    setEditValue(profile[field]);
  };

  const handleSave = () => {
    setProfile((prev) => ({ ...prev, [editField]: editValue }));
    setEditField("");
    setEditValue("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A1B] px-4">
      <h1 className="text-white text-4xl font-bold mb-1 text-center">My Profile</h1>
      <p className="text-gray-300 text-center mb-4">Manage your account information</p>
      <div className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4 items-center">
        <div className="relative mb-2">
          <div className="w-36 h-36 rounded-full bg-gray-300 flex items-center justify-center text-gray-400 text-xl font-bold">
            150 × 150
          </div>
          <button className="absolute right-2 bottom-2 bg-[#EAB308] rounded-full p-2 shadow-lg border-2 border-white">
            <FaCamera className="text-white text-lg" />
          </button>
        </div>
        <div className="w-full text-white text-base flex flex-col gap-2">
          <div className="flex items-center gap-2"><span className="text-gray-400 w-32">Name:</span><span className="flex-1">{profile.name}</span></div>
          <div className="flex items-center gap-2"><span className="text-gray-400 w-32">Phone Number:</span><span className="flex-1">{profile.phone}</span></div>
          <div className="flex items-center gap-2"><span className="text-gray-400 w-32">Email:</span><span className="flex-1">{profile.email}</span></div>
          <div className="flex items-center gap-2"><span className="text-gray-400 w-32">DOB:</span><span className="flex-1">{new Date(profile.dob).toLocaleDateString()}</span></div>
          <div className="flex items-center gap-2"><span className="text-gray-400 w-32">Gender:</span><span className="flex-1">{profile.gender}</span></div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 w-32">Height:</span>
            {editField === "height" ? (
              <>
                <input
                  className="bg-[#232A36] text-white rounded px-2 py-1 w-24 focus:outline-none"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                />
                <button onClick={handleSave} className="text-[#EAB308] font-bold ml-2">Save</button>
              </>
            ) : (
              <>
                <span className="flex-1">{profile.height}</span>
                <button onClick={() => handleEdit("height")}
                  className="ml-2 text-[#EAB308] hover:text-yellow-400">
                  <FaPencilAlt />
                </button>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 w-32">Weight:</span>
            {editField === "weight" ? (
              <>
                <input
                  className="bg-[#232A36] text-white rounded px-2 py-1 w-24 focus:outline-none"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                />
                <button onClick={handleSave} className="text-[#EAB308] font-bold ml-2">Save</button>
              </>
            ) : (
              <>
                <span className="flex-1">{profile.weight}</span>
                <button onClick={() => handleEdit("weight")}
                  className="ml-2 text-[#EAB308] hover:text-yellow-400">
                  <FaPencilAlt />
                </button>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 w-32">Address:</span>
            {editField === "address" ? (
              <>
                <input
                  className="bg-[#232A36] text-white rounded px-2 py-1 w-40 focus:outline-none"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                />
                <button onClick={handleSave} className="text-[#EAB308] font-bold ml-2">Save</button>
              </>
            ) : (
              <>
                <span className="flex-1 whitespace-pre-line">{profile.address}</span>
                <button onClick={() => handleEdit("address")}
                  className="ml-2 text-[#EAB308] hover:text-yellow-400">
                  <FaPencilAlt />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-4 w-full mt-6">
          <button className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-1/2 transition hover:bg-yellow-400 transform hover:scale-105 active:scale-95 duration-200">
            Log Out
          </button>
          <button className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-1/2 transition hover:bg-yellow-400 transform hover:scale-105 active:scale-95 duration-200">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
