import React, { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";

export default function FaceCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);

  // Load models
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    };
    loadModels();
  }, []);

  // Start camera
  useEffect(() => {
    if (!capturedImage) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        });
    }
  }, [capturedImage]);

  // Detect face
  useEffect(() => {
    const interval = setInterval(async () => {
      if (videoRef.current && !capturedImage) {
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        );

        setFaceDetected(detections.length > 0);

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.strokeStyle = detections.length > 0 ? "green" : "red";
        context.lineWidth = 4;
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height / 2, 120, 0, 2 * Math.PI);
        context.stroke();
      }
    }, 200);

    return () => clearInterval(interval);
  }, [capturedImage]);

  // Capture photo
  const capture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    setCapturedImage(canvas.toDataURL("image/png"));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!capturedImage ? (
        <div className="relative">
          <video ref={videoRef} autoPlay muted className="rounded-lg" />
          <canvas
            ref={canvasRef}
            width={640}
            height={480}
            className="absolute top-0 left-0"
          />
          <button
            onClick={capture}
            disabled={!faceDetected}
            className={`mt-4 px-6 py-2 rounded-lg text-white ${
              faceDetected
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Capture
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <img
            src={capturedImage}
            alt="Captured"
            className="w-64 h-64 object-cover rounded-full border-4 border-green-500"
          />
          <div className="flex gap-4">
            <button
              onClick={() => setCapturedImage(null)}
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Retake
            </button>
            <button
              onClick={() => console.log("Next button clicked")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
