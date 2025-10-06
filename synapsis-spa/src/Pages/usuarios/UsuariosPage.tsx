import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useBuscarUsuarios from "../../components/apis/user/hooks/useBuscarUsuarios";
import { useExcluirUsuario } from "../../components/apis/user/hooks/useExcluirUsuario";

type SearchForm = { name: string };

export default function UsuariosPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { register, handleSubmit } = useForm<SearchForm>();

  const { usuarios, meta, isLoadingUsuarios, loadUsuarios } = useBuscarUsuarios(
    {
      page,
      perPage: 10,
      name: search,
    },
  );

  const { mutate: excluirUsuario } = useExcluirUsuario();

  const onSubmit = (data: SearchForm) => {
    setSearch(data.name);
    setPage(1);
    loadUsuarios();
  };

  const handleExcluir = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      excluirUsuario(id, {
        onSuccess: () => {
          toast.success("Usuário excluído com sucesso!");
          loadUsuarios();
        },
        onError: () => toast.error("Erro ao excluir usuário!"),
      });
    }
  };

  return (
    <Layout>
      <div className="form">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Usuários</h2>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/home/usuarios/criar")}
          >
            + Novo Usuário
          </button>
        </div>

        <form className="mb-4 d-flex gap-2" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nome..."
            {...register("name")}
          />
          <button type="submit" className="btn btn-secondary">
            Buscar
          </button>
        </form>

        <div className="table-responsive">
          {isLoadingUsuarios ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" />
              <p className="mt-2">Carregando usuários...</p>
            </div>
          ) : usuarios && usuarios.length > 0 ? (
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Email</th>
                  <th scope="col">Apelido</th>
                  <th scope="col" className="text-center">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.apelido || "-"}</td>
                    <td className="text-center">
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() =>
                            navigate(`/home/usuarios/editar/${u.id}`)
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
