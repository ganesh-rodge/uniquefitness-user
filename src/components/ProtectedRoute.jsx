import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// You can replace this with actual user fetch from context or API
const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

export default function ProtectedRoute() {
  const location = useLocation();
  const token = localStorage.getItem("accessToken");
  const user = getUserFromLocalStorage(); // get logged-in user info

  // If no token → redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If user exists but has no schedule, restrict access
  if (user && (!user.schedule || Object.keys(user.schedule).length === 0)) {
    // Allow /create-schedule and /select-groups only
    const allowed = ["/create-schedule", "/select-groups"];
    if (!allowed.includes(location.pathname)) {
      return <Navigate to="/create-schedule" replace />;
    }
  }

  // All other cases → allow access
  return <Outlet />;
}
