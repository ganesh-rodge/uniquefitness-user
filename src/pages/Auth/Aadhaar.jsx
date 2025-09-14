import React, { useState, useRef, useEffect } from "react";
import { useRegistration } from "../../context/RegistrationContext";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

// ✅ NEW HELPER FUNCTION: Convert a Base64 Data URL to a Blob
const dataURLtoBlob = (dataurl) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export default function AadhaarCapture() {
  const { registrationData, updateRegistrationData } = useRegistration();
  const navigate = useNavigate();

  const [stream, setStream] = useState(null);
  const [image, setImage] = useState(registrationData.aadhaarPhotoUrl || null); // Note: using aadhaarPhotoUrl from context
  const [error, setError] = useState("");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start rear camera
  const startCamera = async () => {
    setImage(null);
    setError("");
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // rear camera
      });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
    } catch (err) {
      setError("Camera access denied or not available.");
      console.error(err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      if (videoRef.current) videoRef.current.srcObject = null;
    }
  };

  // Capture photo inside rectangle frame
  const captureAadhaarPhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Dynamic rectangle frame (centered)
    const frameWidth = video.videoWidth * 0.8;
    const frameHeight = video.videoHeight * 0.5;
    const x = (video.videoWidth - frameWidth) / 2;
    const y = (video.videoHeight - frameHeight) / 2;

    canvas.width = frameWidth;
    canvas.height = frameHeight;

    const context = canvas.getContext("2d");
    context.drawImage(video, x, y, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

    const imageDataUrl = canvas.toDataURL("image/jpeg");
    setImage(imageDataUrl);
    stopCamera();

    // ✅ Update the context with the captured photo URL
    updateRegistrationData((prev) => ({ ...prev, aadhaarPhotoUrl: imageDataUrl }));
  };

  // ✅ UPDATED: The handleSubmit function to use FormData
  const handleSubmit = async () => {
    if (!image) {
      setError("Please capture Aadhaar photo before submitting.");
      return;
    }
    
    // ✅ Get all the final data from the context
    const { 
        fullName, password, dob, address, phone, 
        height, weight, gender, livePhotoUrl, signupToken 
    } = registrationData;

    if (!signupToken) {
      setError("Registration token is missing. Please restart the registration process.");
      return;
    }

    try {
      // ✅ Convert both Base64 strings to File objects using the helper function
      const livePhotoBlob = dataURLtoBlob(livePhotoUrl);
      const aadhaarBlob = dataURLtoBlob(image);
      const livePhotoFile = new File([livePhotoBlob], "live-photo.jpeg", { type: "image/jpeg" });
      const aadhaarFile = new File([aadhaarBlob], "aadhaar-photo.jpeg", { type: "image/jpeg" });

      // ✅ Create the FormData object
      const formData = new FormData();
      
      // Append all your text data
      formData.append("fullName", fullName);
      formData.append("password", password);
      formData.append("dob", dob);
      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("height", height);
      formData.append("weight", weight);
      formData.append("gender", gender);
      formData.append("signupToken", signupToken);

      // Append the actual image files with the correct field names for the backend
      formData.append("livePhoto", livePhotoFile);
      formData.append("aadhaarPhoto", aadhaarFile);
      
      const res = await API.post("/user/register", formData, {
        headers: {
          // Axios automatically sets Content-Type to multipart/form-data
          Authorization: `Bearer ${signupToken}`,
        },
      });

      if (res.data.success) {
        console.log("Registration successful:", res.data);
        localStorage.removeItem('signupToken');
        navigate("/dashboard");
      } else {
        setError(res.data.message || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to register. Please try again.");
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A1B] px-4 font-sans">
      <div className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4 items-center">
        <h2 className="text-white text-xl font-bold mb-4">Capture Aadhaar Card</h2>

        <div className="relative w-full h-64 bg-gray-800 flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Dynamic rectangle frame overlay */}
          {!image && (
            <div
              className="absolute border-4 border-yellow-400 pointer-events-none"
              style={{
                width: "80%",
                height: "50%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          )}

          {/* Show captured image */}
          {image && (
            <img
              src={image}
              alt="Aadhaar"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {error && (
          <p className="text-red-500 text-sm text-center font-medium">{error}</p>
        )}

        {!image && (
          <button
            onClick={stream ? captureAadhaarPhoto : startCamera}
            className="bg-yellow-500 text-black font-bold rounded-md py-3 w-full transition-transform hover:bg-yellow-400 transform hover:scale-105 active:scale-95 duration-200"
          >
            {stream ? "Capture Aadhaar" : "Start Camera"}
          </button>
        )}

        {image && (
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => {
                setImage(null);
                startCamera();
              }}
              className="bg-gray-700 text-white font-bold rounded-md py-3 w-full transition-transform hover:bg-gray-600 transform hover:scale-105 active:scale-95 duration-200"
            >
              Retake
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white font-bold rounded-md py-3 w-full transition-transform hover:bg-blue-500 transform hover:scale-105 active:scale-95 duration-200"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}