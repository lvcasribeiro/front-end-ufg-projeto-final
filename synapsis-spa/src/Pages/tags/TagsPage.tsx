import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useBuscarTags from "./hooks/useBuscarTags";
import useDeletarTag from "./hooks/useDeletarTag";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

type SearchForm = { nome: string };

export default function TagsPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { register, handleSubmit } = useForm<SearchForm>();
  const { tags, isLoadingTags, loadTags, meta } = useBuscarTags(
    {
      page,
      size: 10,
      nome: search,
    },
  );
  const { deletarTag } = useDeletarTag();

  const onSubmit = (data: SearchForm) => {
    setSearch(data.nome);
    setPage(1);
    loadTags();
  };

  const handleExcluir = async (id: number) => {
    await confirmAlert({
            title: 'Confirmar Exclusão',
            message: 'Você tem certeza que deseja excluir esta tag?',
            buttons: [
                {
                        label: 'Sim',
                        onClick: async () => {
                            try {
                                await deletarTag({id});
                                await loadTags();                         
                                toast.success("Tag excluída com sucesso!");
                            } catch (error) {
                                console.error("Erro ao excluir a tag:", error);
                                toast.error("Não foi possível excluir a tag.");
                            }
                        }
                    },
                {
                label: 'Não',
                }
            ]
        }); 
    };

  return (
    <Layout>
      <div className="form">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Tags</h2>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/home/tags/adicionar-tag")}
          >
            Adicionar Tag
          </button>
        </div>

        <form className="mb-4 d-flex gap-2" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nome..."
            {...register("nome")}
          />
          <button type="submit" className="btn btn-secondary">
            Buscar
          </button>
        </form>

        <div className="table-responsive">
          {isLoadingTags ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" />
              <p className="mt-2">Carregando tags...</p>
            </div>
          ) : tags && tags.length > 0 ? (
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nome</th>
                  <th scope="col" className="text-center">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {tags.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.nome}</td>
                    <td className="text-center">
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() =>
                            navigate(`/home/tags/editar-tag/${u.id}`)
                          }
                        >
                          ✏️ Editar
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleExcluir(u.id)}
                        >
                          🗑️ Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="alert alert-warning text-center" role="alert">
              Nenhum usuário encontrado.
            </div>
          )}
        </div>

        {meta && meta.totalPages > 1 && (
          <nav className="mt-4" aria-label="Navegação de páginas">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage((prev) => prev - 1)}
                  disabled={page === 1}
                >
                  Anterior
                </button>
              </li>

              {Array.from({ length: meta.totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${page === i + 1 ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  page === meta.totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={page === meta.totalPages}
                >
                  Próxima
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>

      
    </Layout>
  );
}
