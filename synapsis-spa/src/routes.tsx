import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CriarContaPage from "./Pages/criar-conta/CriarContaPage";

import { AuthProvider } from "./_components/Auth/AuthContext/AuthContext";
import PrivateRoute from "./_components/Auth/PrivateRoute/PrivateRoute";
import Login from "./Pages/login/Login";
import AdicionarNotaPage from "./Pages/adicionar-nota/AdicionarNotaPage";
import PerfilPage from "./Pages/perfil/PerfilPage";
import NotasPage from "./Pages/notas/NotasPage";
import TagsPage from "./Pages/tags/TagsPage";
import UsuariosPage from "./Pages/usuarios/UsuariosPage";
import CategoriasPage from "./Pages/categorias/CategoriasPage";
import AdicionarCategoriaPage from "./Pages/adicionar-categoria/AdicionarCategoriaPage";
import Home from "./Pages/Home/Home";
import CriarUsuarioPage from "./Pages/usuarios/CriarUsuarioPage";
import EditarUsuarioPage from "./Pages/usuarios/EditarUsuarioPage";
import NotasArquivadas from "./Pages/notas-arquivadas/NotasArquivadas";

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
            <Route path="/home/arquivados" element={<NotasArquivadas />} />
            <Route
              path="/home//minhas-notas/adicionar-nota"
              element={<AdicionarNotaPage />}
            />
            <Route path="/home/categorias" element={<CategoriasPage />} />
            <Route
              path="/home/categorias/adicionar-categoria"
              element={<AdicionarCategoriaPage />}
            />
            <Route path="/home/tags" element={<TagsPage />} />
            <Route path="/home/usuarios" element={<UsuariosPage />} />
            <Route path="/home/usuarios" element={<UsuariosPage />} />
            <Route path="/home/usuarios/criar" element={<CriarUsuarioPage />} />
            <Route
              path="/home/usuarios/editar/:id"
              element={<EditarUsuarioPage />}
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
