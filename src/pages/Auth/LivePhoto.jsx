import React, { useState, useRef, useEffect } from "react";

// The main component for our live photo capture app.
// It handles camera access, face detection, and photo capture.
export default function App() {
  const [stream, setStream] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [faceDetected, setFaceDetected] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Dynamically load the face-api.js library and its models from a CDN.
  useEffect(() => {
    // Create a new script element for the face-api.js library.
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js";
    script.async = true;

    script.onload = async () => {
      // Once the library is loaded, load the face detection models.
      try {
        await window.faceapi.nets.tinyFaceDetector.loadFromUri(
          "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/models/"
        );
        setIsLoading(false); // Models are loaded, so we're no longer loading.
      } catch (err) {
        console.error("Error loading face-api models:", err);
        setError("Failed to load face detection models. Check your network connection.");
        setIsLoading(false);
      }
    };

    script.onerror = () => {
      setError("Failed to load the face detection library. Check your network connection.");
      setIsLoading(false);
    };

    // Append the script to the document body.
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts.
    return () => {
      document.body.removeChild(script);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once.

  // Use an effect to attach the camera stream to the video element.
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Handle cleanup when the component unmounts.
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Function to start the camera and begin face detection.
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

        // Start a continuous loop for face detection.
        intervalRef.current = setInterval(async () => {
          if (videoRef.current) {
            const detections = await window.faceapi.detectAllFaces(
              videoRef.current,
              new window.faceapi.TinyFaceDetectorOptions()
            );
            // Check for a face with a detection score above 0.5.
            setFaceDetected(
              Array.isArray(detections) && detections.some((d) => d.score > 0.5)
            );
          }
        }, 500); // Check every 0.5 seconds.
      } catch (err) {
        setError(
          "Camera permission denied. Please allow camera access in your browser settings."
        );
        console.error(err);
      }
    }
  };

  // Function to capture a photo from the video feed.
  const takePhoto = () => {
    // Prevent taking a photo if no face is detected.
    if (!faceDetected) {
      setError(
        "No face detected. Please align your face in the frame and try again."
      );
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
      stopCamera(); // Stop the camera feed after the photo is taken.
    }
  };

  // Function to stop the camera stream and cleanup resources.
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A1B] px-4 font-sans">
      <div className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4 items-center">
        <h2 className="text-white text-xl font-bold mb-4">Live Photo Capture</h2>

        {/* The main circular display area for the video feed or captured image */}
        <div
          className={`w-48 h-48 rounded-full flex items-center justify-center overflow-hidden relative border-4 ${
            image
              ? "border-yellow-500" // Yellow border when photo is captured
              : faceDetected
              ? "border-green-500" // Green border when a face is detected
              : "border-red-500" // Red border when no face is detected
          }`}
        >
          {isLoading ? (
            <p className="text-gray-400 text-sm animate-pulse">Loading models...</p>
          ) : image ? (
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
            // Inline SVG for the camera icon.
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

        {/* Hidden canvas for drawing the video frame. */}
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {error && (
          <p className="text-red-500 text-sm text-center font-medium">
            {error}
          </p>
        )}

        <button
          onClick={stream ? takePhoto : startCamera}
          className="bg-yellow-500 text-black font-bold rounded-md py-3 w-full transition-transform hover:bg-yellow-400 transform hover:scale-105 active:scale-95 duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : image ? "Take Another Photo" : stream ? "Take Photo" : "Start Camera"}
        </button>

        {/* Retake button is only visible after a photo is captured. */}
        {image && (
          <button
            onClick={() => {
              setImage(null);
              startCamera(); // Restart the camera for a new photo.
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
