import Logo from "../../assets/images/logo-synapsis.png";
import "./Header.css";
import { useAuth } from "../../_components/Auth/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const autenticado = useAuth();

  return (
    <header className="site-header">
      <div className="navbar">
        <div className="navbar-left">
          <img src={Logo} alt="SYNAPSIS logo" className="img-logo" />
          <span className="logo-text">SYNAPSIS</span>
        </div>

        <div className="header-right">
          <button className="dropdown-btn" onClick={() => navigate("/home/perfil")}>
            Olá, Victor
          </button>
        </div>
      </div>
    </header>
  );
}