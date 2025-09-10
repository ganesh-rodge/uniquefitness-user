import React, { useState, useRef, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import * as faceapi from "face-api.js";

export default function LivePhoto() {
  const [stream, setStream] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [faceDetected, setFaceDetected] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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

  // Attach stream to video element
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Start camera
  const startCamera = async () => {
    setImage(null);
    setError("");
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        setStream(streamData);
      } catch (err) {
        setError("Camera permission denied. Please allow camera access.");
        console.error(err);
      }
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  // Detect face continuously
  useEffect(() => {
    let interval;
    if (stream) {
      interval = setInterval(async () => {
        if (videoRef.current) {
          const detections = await faceapi.detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions({
              inputSize: 160,
              scoreThreshold: 0.4,
            })
          );
          setFaceDetected(detections.length > 0);
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [stream]);

  // Take photo
  const takePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth || 384;
      canvas.height = video.videoHeight || 384;

      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const detections = await faceapi.detectAllFaces(
        canvas,
        new faceapi.TinyFaceDetectorOptions({
          inputSize: 160,
          scoreThreshold: 0.4,
        })
      );

      if (!detections || detections.length === 0) {
        setError("No face detected. Please align your face properly.");
        setImage(null);
        return;
      }

      const imageDataUrl = canvas.toDataURL("image/jpeg");
      setImage(imageDataUrl);
      setError("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A1B] px-4">
      <div className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4 items-center">
        <h2 className="text-white text-xl font-bold mb-4">Live Photo</h2>

        {/* Circle Frame */}
        <div
          className={`w-48 h-48 rounded-full border-4 flex items-center justify-center overflow-hidden relative ${
            stream ? (faceDetected ? "border-green-500" : "border-red-500") : "border-[#EAB308]"
          }`}
        >
          {image ? (
            <img src={image} alt="Captured" className="w-full h-full object-cover" />
          ) : stream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover rounded-full"
              style={{ background: "#232A36" }}
            />
          ) : (
            <FaCamera className="text-gray-400 text-5xl" />
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Buttons */}
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
