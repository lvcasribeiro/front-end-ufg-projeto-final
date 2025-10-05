import Logo from "../../assets/images/logo-synapsis.png";
import "./Header.css";
import { useAuth } from "../../_components/Auth/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

type HeaderProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function Header({ isMenuOpen, toggleMenu }: HeaderProps) {
  const navigate = useNavigate();
  const autenticado = useAuth();

  return (
    <header className="site-header">
      <div className="navbar">
        <div className="navbar-left">
          <button 
            className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
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