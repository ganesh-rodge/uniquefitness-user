import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./pages/Auth/Login";
// import Dashboard from "./pages/Dashboard/Dashboard";
import ButtonFull from "./components/ButtonFull";
import ButtonHalf from "./components/ButtonHalf";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import About from "./pages/Screens/About";
import Contact from "./pages/Screens/Contact";
import Privacy from "./pages/Screens/Privacy";
import ResetPassword from "./pages/Auth/ResetPassword";
import LivePhoto from "./pages/Auth/LivePhoto";
import GetDetails from "./pages/Auth/GetDetails";
import Aadhaar from "./pages/Auth/Aadhaar";
import HeightWeight from "./pages/Auth/PhysicalDetails";
import ChangePassword from "./pages/Auth/ChangePassword";
import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import Announcements from "./pages/Announcements/Announcements";
import AnnouncementDetails from "./pages/Announcements/AnnouncementDetails";
import WeightHistory from "./pages/Dashboard/WeightHistory";
import SelectPlan from "./pages/Payments/SelectPlan";
import SelectGroups from "./pages/Workouts/SelectGroups";
import CreateSchedule from "./pages/Workouts/CreateSchedule";
import WorkoutDetail from "./pages/Workouts/WorkoutDetail";
import CreateDiet from "./pages/Dietplans/CreateDiet";
import Dietplan from "./pages/Dietplans/Dietplan";
import DietDetail from "./pages/Dietplans/DeitDetail";
import Register from "./pages/Auth/Register";
// import OtpVerify from "./pages/Auth/OtpVerify";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/livePhoto" element={<LivePhoto />} />
        <Route path="/aadhar" element={<Aadhaar />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/details" element={<GetDetails />} />
        <Route path="/physicalDetails" element={<HeightWeight />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/myProfile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/announcementDetails" element={<AnnouncementDetails />} />
        <Route path="/weight-records" element={<WeightHistory />} />
        <Route path="/select-plan" element={<SelectPlan />} />
        <Route path="/select-groups" element={<SelectGroups />} />
        <Route path="/create-schedule" element={<CreateSchedule />} />
        <Route path="/workout-detail" element={<WorkoutDetail/>} />
        <Route path="/create-diet" element={<CreateDiet/>} />
        <Route path="/diet-plan" element={<Dietplan/>} />
        <Route path="/diet-detail" element={<DietDetail/>} />
        <Route path="/register" element={<Register/>} />
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
