import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";

type MenuProps = {
  isMenuOpen: boolean;
  onClose: () => void;
};

export default function Menu({ isMenuOpen, onClose }: MenuProps) {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? "menu-item active" : "menu-item";
  };

  return (
    <>
      <div
        className={`menu-overlay ${isMenuOpen ? "open" : ""}`}
        onClick={onClose}
      ></div>
      {/* A classe 'open' é aplicada baseada na prop isMenuOpen */}
      <aside className={`menu ${isMenuOpen ? "open" : ""}`}>
        <nav className="menu-nav">
          <NavLink to="/home" className={getNavLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/home/minhas-notas" className={getNavLinkClass}>
            Minhas Notas
          </NavLink>
          <NavLink to="/home/categorias" className={getNavLinkClass}>
            Categorias
          </NavLink>
          <NavLink to="/home/tags" className={getNavLinkClass}>
            Tags
          </NavLink>
          <NavLink to="/home/arquivados" className={getNavLinkClass}>
            Arquivados
          </NavLink>
          <NavLink to="/home/usuarios" className={getNavLinkClass}>
            Usuários
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
