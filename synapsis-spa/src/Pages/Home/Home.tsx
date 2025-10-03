import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="home-card">
        <h1>Home Page</h1>
        <p>🚀 Projeto iniciado com Vite + React</p>
        <button onClick={() => navigate("/home/adicionar-nota")}>
          Adicionar Nota
        </button>
      </div>
    </Layout>
  );
}
