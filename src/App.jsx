import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./pages/Auth/Login";
// import Dashboard from "./pages/Dashboard/Dashboard";
import ButtonFull from "./components/ButtonFull";
import ButtonHalf from "./components/ButtonHalf";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
