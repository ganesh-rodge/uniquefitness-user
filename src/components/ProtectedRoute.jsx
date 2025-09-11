import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute(){
    const isLoggedIn = localStorage.getItem("token"); 
  // You can replace this with your real auth check (context, redux, etc.)

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
}