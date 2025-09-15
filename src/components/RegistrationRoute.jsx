// components/RegistrationRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRegistration } from "../context/RegistrationContext";

export default function RegistrationRoute({ children, requiredCondition }) {
  const { registrationData } = useRegistration();

  if (!requiredCondition) {
    // If the condition is false, redirect the user back to the start of the flow
    return <Navigate to="/register" replace />;
  }

  // If the condition is met, render the child component or nested routes
  return children ? children : <Outlet />;
}