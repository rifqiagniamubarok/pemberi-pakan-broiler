import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import OtomatisPage from "./pages/OtomatisPage";
import ManualPage from "./pages/ManualPage";
import AkunPage from "./pages/AkunPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import LoginAdminPage from "./pages/admin/LoginAdminPage";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Disini tempat mengkonfigurasi setiap link */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/otomatis" element={<OtomatisPage />} />
        <Route path="/manual" element={<ManualPage />} />
        <Route path="/akun" element={<AkunPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/loginadmin" element={<LoginAdminPage />} />
        <Route path="/dashboardadmin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
