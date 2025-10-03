// src/components/menu/Menu.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

export default function Menu() {
  return (
    <aside className="menu">
      <nav className="menu-nav">
        <Link to="/home" className="menu-item">
          Home  
        </Link>
        <Link to="/home/minhas-notas" className="menu-item">
          Minhas Notas
        </Link>
        <Link to="/home/tags" className="menu-item">
          Tags
        </Link>
        <Link to="/home/usuarios" className="menu-item">
          Usuários
        </Link>
      </nav>
    </aside>
  );
}
