import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import OtomatisPage from "./pages/OtomatisPage";
import ManualPage from "./pages/ManualPage";
import AkunPage from "./pages/AkunPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/welcome" element={<LandingPage />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/otomatis" element={<OtomatisPage />} />
        <Route path="/manual" element={<ManualPage />} />
        <Route path="/akun" element={<AkunPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
