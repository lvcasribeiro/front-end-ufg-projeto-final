import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/home/Home";
import CriarContaPage from "./Pages/criar-conta/CriarContaPage";

import { AuthProvider } from "./_components/Auth/AuthContext/AuthContext";
import PrivateRoute from "./_components/Auth/PrivateRoute/PrivateRoute";
import Login from "./Pages/login/Login";
import AdicionarNotaPage from "./Pages/adicionar-nota/AdicionarNotaPage";
import PerfilPage from "./Pages/perfil/PerfilPage";
import NotasPage from "./Pages/notas/NotasPage";
import TagsPage from "./Pages/tags/TagsPage";
import UsuariosPage from "./Pages/usuarios/UsuariosPage";


export default function AppRouter() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/criar-conta" element={<CriarContaPage />} />  

            <Route path="/home" element={<PrivateRoute />}>      
              <Route index element={<Home />} />
              <Route path="/home/perfil" element={<PerfilPage />} />
              <Route path="/home/minhas-notas" element={<NotasPage />} />
              <Route path="/home/minhas-notas/adicionar-nota" element={<AdicionarNotaPage />} />
              <Route path="/home/minhas-notas/editar-nota/:id" element={<AdicionarNotaPage />} />
              <Route path="/home/tags" element={<TagsPage />} />
              <Route path="/home/usuarios" element={<UsuariosPage />} />
            </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
