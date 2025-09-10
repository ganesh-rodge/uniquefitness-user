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


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LivePhoto />} />
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
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
