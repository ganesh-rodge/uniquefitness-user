import React, { useState, useRef, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import * as faceapi from "face-api.js";

export default function LivePhoto() {
  const [stream, setStream] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [faceDetected, setFaceDetected] = useState(false); // ✅ track face presence
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      } catch (err) {
        console.error("Error loading face-api models:", err);
      }
    };
    loadModels();
  }, []);

  // Attach stream to video
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const startCamera = async () => {
    setImage(null);
    setError("");
    setFaceDetected(false);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        setStream(streamData);

        // Start live face detection loop
        intervalRef.current = setInterval(async () => {
          if (videoRef.current) {
            const detections = await faceapi.detectAllFaces(
              videoRef.current,
              new faceapi.TinyFaceDetectorOptions()
            );
            setFaceDetected(detections.length > 0);
          }
        }, 500); // check every 0.5s
      } catch (err) {
        setError(
          "Camera permission denied. Please allow camera access in your browser settings."
        );
        console.error(err);
      }
    }
  };

  const takePhoto = async () => {
    if (!faceDetected) {
      setError("Please align your face properly in the frame.");
      return;
    }

    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      const width = video.videoWidth > 0 ? video.videoWidth : 384;
      const height = video.videoHeight > 0 ? video.videoHeight : 384;

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, width, height);

      const imageDataUrl = canvas.toDataURL("image/jpeg");
      setImage(imageDataUrl);
      setError("");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setFaceDetected(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A1B] px-4">
      <div className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4 items-center">
        <h2 className="text-white text-xl font-bold mb-4">Live Photo</h2>

        {/* Circle with dynamic border color */}
        <div
          className={`w-48 h-48 rounded-full flex items-center justify-center overflow-hidden relative border-4 ${
            image
              ? "border-[#EAB308]" // Yellow border when photo captured
              : faceDetected
              ? "border-green-500"
              : "border-red-500"
          }`}
        >
          {image ? (
            <img
              src={image}
              alt="Captured"
              className="w-full h-full object-cover"
            />
          ) : stream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              onLoadedMetadata={() => {
                if (videoRef.current) {
                  videoRef.current.play();
                }
              }}
              className="absolute inset-0 w-full h-full object-cover rounded-full"
              style={{ background: "#232A36" }}
            />
          ) : (
            <FaCamera className="text-gray-400 text-5xl" />
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          onClick={stream ? takePhoto : startCamera}
          className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-full transition hover:bg-yellow-400 transform hover:scale-105 active:scale-95 duration-200"
        >
          {stream ? "Take Photo" : "Capture Live Photo"}
        </button>

        <button
          disabled={!image}
          onClick={stopCamera}
          className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-full transition hover:bg-yellow-400 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
