import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import RegistrationRoute from "./components/RegistrationRoute"; // 
import { useRegistration } from "./context/RegistrationContext";
import Loader from "./components/Loader";
import {ToastContainer} from 'react-toastify'


const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword"));
const LivePhoto = lazy(() => import("./pages/Auth/LivePhoto"));
const Aadhaar = lazy(() => import("./pages/Auth/Aadhaar"));
const GetDetails = lazy(() => import("./pages/Auth/GetDetails"));
const HeightWeight = lazy(() => import("./pages/Auth/PhysicalDetails"));
const ChangePassword = lazy(() => import("./pages/Auth/ChangePassword"));

const About = lazy(() => import("./pages/Screens/About"));
const Contact = lazy(() => import("./pages/Screens/Contact"));
const Privacy = lazy(() => import("./pages/Screens/Privacy"));

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const WeightHistory = lazy(() => import("./pages/Dashboard/WeightHistory"));

const Announcements = lazy(() => import("./pages/Announcements/Announcements"));
// const AnnouncementDetails = lazy(() => import("./pages/Announcements/AnnouncementDetails"));

const SelectPlan = lazy(() => import("./pages/Payments/SelectPlan"));
const SelectGroups = lazy(() => import("./pages/Workouts/SelectGroups"));
// const CreateSchedule = lazy(() => import("./pages/Workouts/CreateSchedule"));
const WorkoutDetail = lazy(() => import("./pages/Workouts/WorkoutDetail"));

const CreateDiet = lazy(() => import("./pages/Dietplans/CreateDiet"));
const Dietplan = lazy(() => import("./pages/Dietplans/Dietplan"));
const DietDetail = lazy(() => import("./pages/Dietplans/DeitDetail"));

const Profile = lazy(() => import("./pages/Profile/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));
const OtpVerify = lazy(() => import("./pages/Auth/OtpVerify"))


function App() {
  const { registrationData } = useRegistration();

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verify" element={<OtpVerify />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<Layout />}>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
          </Route>

          {/* Registration Protected Routes */}
          <Route 
            path="/details" 
            element={
              <RegistrationRoute requiredCondition={registrationData.signupToken}>
                <GetDetails />
              </RegistrationRoute>
            } 
          />
          <Route 
            path="/physical-details" 
            element={
              <RegistrationRoute requiredCondition={registrationData.fullName && registrationData.password}>
                <HeightWeight />
              </RegistrationRoute>
            } 
          />
          <Route 
            path="/live-photo" 
            element={
              <RegistrationRoute requiredCondition={registrationData.height && registrationData.weight}>
                <LivePhoto />
              </RegistrationRoute>
            } 
          />
          <Route 
            path="/aadhar" 
            element={
              <RegistrationRoute requiredCondition={registrationData.livePhotoUrl}>
                <Aadhaar />
              </RegistrationRoute>
            } 
          />

          {/* User Protected Routes (requires accessToken) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/announcements" element={<Announcements />} />
              {/* <Route path="/announcement-details" element={<AnnouncementDetails />} /> */}
              <Route path="/weight-records" element={<WeightHistory />} />
              <Route path="/price-plan" element={<SelectPlan />} />
              <Route path="/select-groups" element={<SelectGroups />} />
              {/* <Route path="/create-schedule" element={<CreateSchedule />} /> */}
              <Route path="/workout" element={<WorkoutDetail />} />
              <Route path="/create-diet" element={<CreateDiet />} />
              <Route path="/diet" element={<Dietplan />} />
              <Route path="/diet-detail" element={<DietDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={3000}       // 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </>
  );
}

export default App;