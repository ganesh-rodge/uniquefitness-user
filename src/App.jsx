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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LivePhoto />} />
        <Route path="/ForgotPassword" element={<Footer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
