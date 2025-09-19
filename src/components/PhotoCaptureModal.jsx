// components/PhotoCaptureModal.jsx
import React, { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import { updatePhoto } from "../api/api";
import { toast } from "react-toastify";

export default function PhotoCaptureModal({ onClose, onPhotoUpdated }) {
  const [stream, setStream] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [faceDetected, setFaceDetected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading face-api models:", err);
        setError("Failed to load face detection models.");
        setIsLoading(false);
      }
    };
    loadModels();
    return () => stopCamera();
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const startCamera = async () => {
    if (isLoading) return setError("Loading models...");

    setImage(null);
    setError("");
    setFaceDetected(false);

    try {
      const streamData = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      setStream(streamData);

      intervalRef.current = setInterval(async () => {
        if (videoRef.current) {
          const detections = await faceapi.detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 })
          );
          setFaceDetected(detections.length > 0);
        }
      }, 200);
    } catch (err) {
      setError("Camera permission denied.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (intervalRef.current) clearInterval(intervalRef.current);
    setFaceDetected(false);
  };

  const takePhoto = () => {
    if (!faceDetected) return setError("No face detected. Align face and try again.");
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth || 384;
    canvas.height = video.videoHeight || 384;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL("image/jpeg");
    setImage(imageDataUrl);
    stopCamera();
  };

  const handleUpload = async () => {
  if (!image) return toast.error("Please capture a photo first.");
  setUploading(true);

  try {
    // ✅ Convert base64 -> File object
    const res = await fetch(image);
    const blob = await res.blob();
    const file = new File([blob], "profile.jpg", { type: "image/jpeg" });

    await updatePhoto(file);
    toast.success("Profile photo updated!");
    onPhotoUpdated(image);
    onClose();
  } catch (error) {
    console.error("Photo upload error:", error);
    toast.error("Failed to update photo.");
  } finally {
    setUploading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#10151F] p-6 rounded-xl w-full max-w-sm flex flex-col items-center">
        <h2 className="text-white text-lg font-bold mb-4">Update Profile Photo</h2>

        <div className={`w-48 h-48 rounded-full overflow-hidden border-4 ${image ? "border-yellow-500" : faceDetected ? "border-green-500" : "border-red-500"}`}>
          {isLoading ? (
            <p className="text-gray-400 text-sm animate-pulse flex items-center justify-center h-full">
              Loading...
            </p>
          ) : image ? (
            <img src={image} alt="Captured" className="w-full h-full object-cover" />
          ) : stream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              onLoadedMetadata={() => videoRef.current?.play()}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Camera
            </div>
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {!image && (
          <button
            onClick={stream ? takePhoto : startCamera}
            disabled={isLoading}
            className="mt-4 bg-yellow-500 text-black font-bold rounded-md py-2 w-full hover:bg-yellow-400"
          >
            {stream ? "Take Photo" : "Start Camera"}
          </button>
        )}

        {image && (
          <div className="flex flex-col gap-3 w-full mt-4">
            <button onClick={() => { setImage(null); startCamera(); }} className="bg-gray-700 text-white rounded-md py-2 w-full hover:bg-gray-600">
              Retake
            </button>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-blue-600 text-white rounded-md py-2 w-full hover:bg-blue-500"
            >
              {uploading ? "Uploading..." : "Save Photo"}
            </button>
          </div>
        )}

        <button onClick={() => { stopCamera(); onClose(); }} className="mt-3 text-gray-400 hover:text-white">
          Cancel
        </button>
      </div>
    </div>
  );
}
