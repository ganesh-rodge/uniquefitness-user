import React, { useState, useRef } from "react";
import { FaCamera } from "react-icons/fa";

export default function LivePhoto() {
  const [stream, setStream] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    setImage(null);
    setError("");
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        setStream(streamData);
        if (videoRef.current) {
          videoRef.current.srcObject = streamData;
        }
      } catch (err) {
        setError("Camera permission denied. Please allow camera access in your browser settings.");
        console.error(err);
      }
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const imageDataUrl = canvas.toDataURL("image/jpeg");
      setImage(imageDataUrl);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A1B] px-4">
      <div className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4 items-center">
        <h2 className="text-white text-xl font-bold mb-4">Live Photo</h2>
        <div className="w-48 h-48 rounded-full bg-[#232A36] border-4 border-[#EAB308] flex items-center justify-center overflow-hidden">
          {image ? (
            <img src={image} alt="Captured" className="w-full h-full object-cover" />
          ) : stream ? (
            <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
          ) : (
            <FaCamera className="text-gray-400 text-5xl" />
          )}
        </div>
        <canvas ref={canvasRef} style={{ display: "none" }} />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          onClick={stream ? takePhoto : startCamera}
          className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-full transition hover:bg-yellow-400 transform hover:scale-105 active:scale-95 duration-200"
        >
          {stream ? "Take Photo" : "Capture Live Photo"}
        </button>
        <button
          disabled={!image}
          className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-full transition hover:bg-yellow-400 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
