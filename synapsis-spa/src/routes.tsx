import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/home/Home";
import { AuthProvider } from "./_components/Auth/AuthContext/AuthContext";
import PrivateRoute from "./_components/Auth/PrivateRoute/PrivateRoute";
import Login from "./Pages/Login/Login";

import LandingPage from "./Pages/landing-page/LandingPage";
import LoginPage from "./Pages/login-page/LoginPage";
import CriarContaPage from "./Pages/criar-conta/CriarContaPage";

export default function AppRouter() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/criar-conta" element={<CriarContaPage />} />          
          <Route index element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
