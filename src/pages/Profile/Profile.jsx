import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { getProfile } from "../../api/api";
import PhotoCaptureModal from "../../components/PhotoCaptureModal";

const initialProfile = {
  name: "John Doe",
  phone: "+1 234 567 890",
  email: "john.doe@example.com",
  dob: "1990-01-01",
  gender: "Male",
  height: "180 cm",
  weight: "75 kg",
  address: "123 Main St,\nAnytown, USA",
  livePhotoUrl: null,
};

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const navigate = useNavigate();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await getProfile();
      if (response?.data?.data) {
        const user = response.data.data;
        setProfile({
          name: user.fullName || initialProfile.name,
          phone: user.phone || initialProfile.phone,
          email: user.email || initialProfile.email,
          dob: user.dob || initialProfile.dob,
          gender: user.gender || initialProfile.gender,
          height: user.height ? `${user.height} cm` : initialProfile.height,
          weight: user.weight ? `${user.weight} kg` : initialProfile.weight,
          address: user.address || initialProfile.address,
          livePhotoUrl: user.livePhotoUrl || null,
        });
      } else {
        toast.error("Failed to fetch user profile: Empty data");
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
      toast.error("Failed to fetch user profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    toast.success("Logged Out!");
    navigate("/", { replace: true });
  };

  const handleEdit = (field) => {
    setEditField(field);
    setEditValue(profile[field]);
  };

  const handleSave = () => {
    setProfile((prev) => ({ ...prev, [editField]: editValue }));
    setEditField("");
    setEditValue("");
  };

  const handlePassword = () => {
    navigate("/change-password");
  };

  const handlePhotoClick = () => {
    setShowPhotoModal(true);
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A1B] px-4">
      <h1 className="text-white text-4xl font-bold mb-1 text-center">My Profile</h1>
      <p className="text-gray-300 text-center mb-4">Manage your account information</p>
      <div className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4 items-center">
        {/* Profile Image with Camera Button */}
        <div className="relative mb-2 w-36 h-36">
          {profile.livePhotoUrl ? (
            <img
              src={profile.livePhotoUrl}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-2 border-[#EAB308]"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-gray-300 flex items-center justify-center text-gray-400 text-xl font-bold">
              No Photo
            </div>
          )}

          {/* Camera button overlay */}
          <button
            onClick={handlePhotoClick}
            className="absolute bottom-0 right-0 bg-[#EAB308] text-black p-2 rounded-full shadow-lg hover:bg-yellow-400 transition"
          >
            <FaCamera />
          </button>
        </div>

        <div className="w-full text-white text-base flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 w-32">Name:</span>
            <span className="flex-1">{profile.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 w-32">Phone Number:</span>
            <span className="flex-1">{profile.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 w-32">Email:</span>
            <span className="flex-1">{profile.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 w-32">DOB:</span>
            <span className="flex-1">
              {profile.dob ? new Date(profile.dob).toLocaleDateString() : ""}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 w-32">Gender:</span>
            <span className="flex-1">{profile.gender}</span>
          </div>

          {["height", "weight", "address"].map((field) => (
            <div className="flex items-center gap-2" key={field}>
              <span className="text-gray-400 w-32">
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </span>
              {editField === field ? (
                <>
                  <input
                    className="bg-[#232A36] text-white rounded px-2 py-1 w-40 focus:outline-none"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button onClick={handleSave} className="text-[#EAB308] font-bold ml-2">
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 whitespace-pre-line">{profile[field]}</span>
                  <button
                    onClick={() => handleEdit(field)}
                    className="ml-2 text-[#EAB308] hover:text-yellow-400"
                  >
                    <FaPencilAlt />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4 w-full mt-6">
          <button
            className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-1/2 transition hover:bg-yellow-400 transform hover:scale-105 active:scale-95 duration-200 cursor-pointer"
            onClick={handleLogout}
          >
            Log Out
          </button>
          <button
            className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-1/2 transition hover:bg-yellow-400 transform hover:scale-105 active:scale-95 duration-200"
            onClick={handlePassword}
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Camera Modal */}
      {showPhotoModal && (
        <PhotoCaptureModal
          onClose={() => setShowPhotoModal(false)}
          onPhotoUpdated={(newPhoto) =>
            setProfile((prev) => ({ ...prev, livePhotoUrl: newPhoto }))
          }
        />
      )}
    </div>
  );
}
