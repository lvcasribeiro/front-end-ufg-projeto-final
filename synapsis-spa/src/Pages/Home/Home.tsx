import Layout from "../../components/layout/Layout";
import "./Home.css";
import FavoritosPage from "./_components/FavoritosPage";

export default function Home() {
  return (
    <Layout>
      <div className="form">
        <h3 className="titles">Meus favoritos</h3>

        <FavoritosPage />
      </div>
    </Layout>
  );
}
