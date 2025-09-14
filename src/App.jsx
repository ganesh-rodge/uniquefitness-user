import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";


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
const AnnouncementDetails = lazy(() => import("./pages/Announcements/AnnouncementDetails"));

const SelectPlan = lazy(() => import("./pages/Payments/SelectPlan"));
const SelectGroups = lazy(() => import("./pages/Workouts/SelectGroups"));
const CreateSchedule = lazy(() => import("./pages/Workouts/CreateSchedule"));
const WorkoutDetail = lazy(() => import("./pages/Workouts/WorkoutDetail"));

const CreateDiet = lazy(() => import("./pages/Dietplans/CreateDiet"));
const Dietplan = lazy(() => import("./pages/Dietplans/Dietplan"));
const DietDetail = lazy(() => import("./pages/Dietplans/DeitDetail"));

const Profile = lazy(() => import("./pages/Profile/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));


function App() {
  return (
    
      <Suspense fallback={<Loader/>}>
        <Routes>
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/announcement-details" element={<AnnouncementDetails />} />
              <Route path="/weight-records" element={<WeightHistory />} />
              <Route path="/price-plan" element={<SelectPlan />} />
              <Route path="/select-groups" element={<SelectGroups />} />
              <Route path="/create-schedule" element={<CreateSchedule />} />
              <Route path="/workout" element={<WorkoutDetail/>} />
              <Route path="/create-diet" element={<CreateDiet/>} />
              <Route path="/diet" element={<Dietplan/>} />
              <Route path="/diet-detail" element={<DietDetail/>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>
          </Route>

          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/live-photo" element={<LivePhoto />} />
          <Route path="/aadhar" element={<Aadhaar />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/details" element={<GetDetails />} />
          <Route path="/physical-details" element={<HeightWeight />} />
          <Route element={<Layout />}>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    
  );
}

export default App;
