import React from "react";
import Logo from "../../assets/images/logo-synapsis.png";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      {/* Coluna Esquerda */}
      <div className="left-section">
        <div className="hero-container">
            <img src={Logo} alt="Synapsis Symbol" className="image-center" />
            <h1 className="hero-text">Conecte Ideias</h1>
        </div>
      </div>

      {/* Coluna Direita */}
      <div className="right-section">
        <div className="form-container">
          <h2 className="form-title">Acesse sua conta</h2>
          <input
            type="text"
            placeholder="E-mail"
            className="input-field"
          />
          <input
            type="password"
            placeholder="Senha"
            className="input-field"
          />
          <button onClick={() => navigate("/home")} className="login-button">Entrar</button>
          <Link to={"./criar-conta"} className="criar-conta">Não tem conta? crie agora!</Link>
        </div>
      </div>
    </div>
  );
}
