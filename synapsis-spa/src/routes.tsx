import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import { AuthProvider } from "./_components/Auth/AuthContext/AuthContext";
import PrivateRoute from "./_components/Auth/PrivateRoute/PrivateRoute";
import Login from "./Pages/Login/Login";

export default function AppRouter() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
