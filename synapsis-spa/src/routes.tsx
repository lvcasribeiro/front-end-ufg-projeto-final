import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/home/Home";
import LandingPage from "./Pages/landing-page/LandingPage";
import LoginPage from "./Pages/login-page/LoginPage";
import CriarContaPage from "./Pages/criar-conta/CriarContaPage";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/criar-conta" element={<CriarContaPage />} />
      </Routes>
    </Router>
  );
}
