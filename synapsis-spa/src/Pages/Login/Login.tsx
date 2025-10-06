import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../_components/Auth/AuthContext/AuthContext";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import BackgroundImage from "../../assets/images/background.jpg";
import Logo from "../../assets/images/logo-synapsis.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login, errorMessage } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, senha);
    if (localStorage.getItem("tokenSynapsis")) {
      navigate("/home");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="login-container">
        <div
          className="page-bg"
          style={{ backgroundImage: `url(${BackgroundImage})` }}
          aria-hidden="true"
        />

        <div className="left-section">
          <div className="hero-container">
            <div className="brand-inline">
              <img src={Logo} alt="Synapsis Logo" className="brand-logo" />
              <span className="brand-name">SYNAPSIS</span>
            </div>
            <h1 className="hero-text">Conecte Ideias</h1>
          </div>
        </div>

        <div className="right-section">
          <div className="form-container">
            <h2 className="titulo-login">Acesse sua conta</h2>
            <input
              type="email"
              id="email"
              className="input-field"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              id="senha"
              className="input-field"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <button type="submit" className="login-button">
              Entrar
            </button>
            <Link to={"./criar-conta"} className="criar-conta">
              Não tem conta? crie agora!
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
