import { FaPencilAlt, FaTrash } from "react-icons/fa";
import useBuscarFavoritos from "../hooks/useBuscarFavoritos";
import type { NotasFavoritas } from "../../../components/apis/notas-favoritas/types/NotasFavoritas";

export default function FavoritosPage() {
  const {
    notasFavoritas,
    isLoadingNotasFavoritas,
    errorLoadingNotasFavoritas,
  } = useBuscarFavoritos();

  console.log(notasFavoritas);

  if (isLoadingNotasFavoritas) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  if (errorLoadingNotasFavoritas) {
    return (
      <div className="alert alert-danger mt-4">
        Erro ao carregar notas favoritas.
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {notasFavoritas?.length === 0 ? (
        <div className="alert alert-info">
          Você ainda não possui notas favoritas.
        </div>
      ) : (
        <div className="notas-grid">
          {notasFavoritas?.map((nota: NotasFavoritas) => (
            <div
              key={nota.id}
              className="nota-card"
              // Aplica a cor de fundo, usando branco como padrão
              style={{ backgroundColor: nota.conteudo.cor || "#FFFFFF" }}
            >
              <h3 className="nota-titulo">{nota.conteudo.titulo}</h3>
              <p className="nota-corpo">{nota.conteudo.corpo}</p>

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
      )}
    </div>
  );
}
