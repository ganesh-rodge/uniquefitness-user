import React, { useState, useRef, useEffect } from "react";

export default function App() {
  const [stream, setStream] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [faceDetected, setFaceDetected] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load face-api.js dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js";
    script.async = true;

    script.onload = async () => {
      try {
        await window.faceapi.nets.tinyFaceDetector.loadFromUri("/models");

        setIsLoading(false);
      } catch (err) {
        console.error("Error loading face-api models:", err);
        setError(
          "Failed to load face detection models. Check your network connection."
        );
        setIsLoading(false);
      }
    };

    script.onerror = () => {
      setError(
        "Failed to load the face detection library. Check your network connection."
      );
      setIsLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    if (isLoading) {
      setError("Face detection models are still loading. Please wait.");
      return;
    }

    setImage(null);
    setError("");
    setFaceDetected(false);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        setStream(streamData);

        intervalRef.current = setInterval(async () => {
          if (videoRef.current) {
            const detections = await window.faceapi.detectAllFaces(
              videoRef.current,
              new window.faceapi.TinyFaceDetectorOptions({
                inputSize: 224,
                scoreThreshold: 0.5,
              })
            );

            if (Array.isArray(detections) && detections.length > 0) {
              setFaceDetected(true);
              setError("");
            } else {
              setFaceDetected(false);
            }
          }
        }, 200); // smoother detection
      } catch (err) {
        setError(
          "Camera permission denied. Please allow camera access in your browser settings."
        );
        console.error(err);
      }
    }
  };

  const takePhoto = () => {
    if (!faceDetected) {
      setError("No face detected. Please align your face in the frame and try again.");
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
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      if (videoRef.current) videoRef.current.srcObject = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setFaceDetected(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A1B] px-4 font-sans">
      <div className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4 items-center">
        <h2 className="text-white text-xl font-bold mb-4">Live Photo Capture</h2>

        {/* Circular video/image container */}
        <div
          className={`w-48 h-48 rounded-full flex items-center justify-center overflow-hidden relative border-4 ${
            image
              ? "border-yellow-500"
              : faceDetected
              ? "border-green-500"
              : "border-red-500"
          }`}
        >
          {isLoading ? (
            <p className="text-gray-400 text-sm animate-pulse">Loading models...</p>
          ) : image ? (
            <img src={image} alt="Captured" className="w-full h-full object-cover" />
          ) : stream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              onLoadedMetadata={() => {
                if (videoRef.current) videoRef.current.play();
              }}
              className="absolute inset-0 w-full h-full object-cover rounded-full"
              style={{ background: "#232A36" }}
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400 text-5xl w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.894-1.788A2 2 0 0110.158 4h3.684a2 2 0 011.664.89l.894 1.788A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

        <button
          onClick={stream ? takePhoto : startCamera}
          className="bg-yellow-500 text-black font-bold rounded-md py-3 w-full transition-transform hover:bg-yellow-400 transform hover:scale-105 active:scale-95 duration-200"
          disabled={isLoading}
        >
          {isLoading
            ? "Loading..."
            : image
            ? "Take Another Photo"
            : stream
            ? "Take Photo"
            : "Start Camera"}
        </button>

        {image && (
          <button
            onClick={() => {
              setImage(null);
              startCamera();
            }}
            className="bg-gray-700 text-white font-bold rounded-md py-3 w-full transition-transform hover:bg-gray-600 transform hover:scale-105 active:scale-95 duration-200"
          >
            Retake
          </button>
        )}
      </div>
    </div>
  );
}
