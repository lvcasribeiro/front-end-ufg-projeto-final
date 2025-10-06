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
    <div>
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
              style={{
                backgroundColor: nota.conteudo.cor || "#FFFFFF",
              }}
            >
              <h3 className="nota-titulo">{nota.conteudo.titulo}</h3>
              <p className="nota-corpo">{nota.conteudo.corpo}</p>

              <div className="nota-actions mt-3">
                <div className="nota-tags mt-2">
                  {nota.conteudo.tags?.length > 0 ? (
                    nota.conteudo.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="badge bg-light text-dark me-2"
                      >
                        #{tag.nome}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted"></span>
                  )}
                </div>
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
