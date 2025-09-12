import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("accessToken");

  // If no token → redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Allow access to nested routes
}
