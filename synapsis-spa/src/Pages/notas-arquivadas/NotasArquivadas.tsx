import { useNavigate } from "react-router-dom";
import useBuscarNotasArquivadas from "./hooks/useBuscarNotasArquivadas";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Layout from "../../components/layout/Layout";
import type { Notas } from "../../components/apis/notas-requests/types/notas";

export default function NotasArquivadas() {
  const navigate = useNavigate();

  const { isLoadingNotasArquivadas, notasArquivadas } =
    useBuscarNotasArquivadas({
      page: 1,
      perPage: 12,
    });

  const renderContent = () => {
    if (isLoadingNotasArquivadas) {
      return <p className="info-text">Carregando notas...</p>;
    }

    if (!notasArquivadas || notasArquivadas.length === 0) {
      return (
        <p className="info-text">
          Nenhuma nota encontrada. Que tal adicionar uma?
        </p>
      );
    }

    return (
      <div className="notas-grid">
        {notasArquivadas.map((nota: Notas) => (
          <div
            key={nota.id}
            className="nota-card"
            // Aplica a cor de fundo, usando branco como padrão
            style={{ backgroundColor: nota.cor || "#FFFFFF" }}
          >
            <h3 className="nota-titulo">{nota.titulo}</h3>
            <p className="nota-corpo">{nota.corpo}</p>

            <div className="nota-actions">
              <button className="action-button" title="Editar Nota">
                <FaPencilAlt />
              </button>
              <button
                className="action-button"
                title="Excluir Nota"
                onClick={() => {}}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="form">
        <div className="header-container">
          <h2 className="form-title">Notas Arquivadas</h2>
          {/* <div className="form-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("./adicionar-nota")}
            >
              Adicionar Nota
            </button>
          </div> */}
        </div>

        <hr className="separator" />

        {renderContent()}
      </div>
    </Layout>
  );
}
