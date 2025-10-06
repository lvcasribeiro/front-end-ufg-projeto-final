import React, { useEffect, useState, useMemo } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import type { User } from "../../components/apis/user/types/User";
import { useSalvarUsuario } from "../../components/apis/user/hooks/useSalvarUsuario";
import { useApiClient } from "../../hooks/useApiClient";
import UserForm from "../usuarios/_components/UserForm";
import useBuscarUsuario from "../../components/apis/user/hooks/useBuscarUser";
import { useAuth } from "../../_components/Auth/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PerfilPage() {
  const api = useApiClient();
  const { logout } = useAuth();
  const { atualizar } = useSalvarUsuario();
  const { usuario } = useBuscarUsuario();
  const [initialData, setInitialData] = useState<Partial<User> | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarPerfil() {
      try {
        setIsLoading(true);
        if (!usuario?.id) {
          toast.error("Não foi possível identificar o usuário logado.");
          return;
        }
        const { data } = await api.get(`/user/${usuario.id}`);
        setInitialData(data);
      } catch (error) {
        toast.error("Erro ao carregar dados do perfil.");
      } finally {
        setIsLoading(false);
      }
    }
    carregarPerfil();
  }, [api, usuario]);

  const formatarData = useMemo(
    () => (dataStr?: string | Date) => {
      if (!dataStr) return "-";
      const date = new Date(dataStr);
      return isNaN(date.getTime()) ? "-" : date.toLocaleDateString("pt-BR");
    },
    [],
  );

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const onSubmit = (data: User) => {
    if (!usuario?.id) return;

    atualizar.mutate(
      { ...data, id: usuario.id },
      {
        onSuccess: () => {
          toast.success("Perfil atualizado com sucesso!");
          setInitialData(data);
          setEditMode(false);
        },
        onError: () => toast.error("Erro ao atualizar perfil!"),
      },
    );
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="form">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-2">Carregando seu perfil...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!initialData) {
    return (
      <Layout>
        <div className="form">
          <div className="alert alert-danger text-center" role="alert">
            Não foi possível carregar os dados do perfil.
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="form">
        {editMode ? (
          <UserForm
            initialData={initialData}
            title="Editar Perfil"
            submitText="Salvar Alterações"
            isEdit={true}
            onSubmit={onSubmit}
            onCancel={handleCancelEdit}
          />
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="form-title mb-0">Meu Perfil</h2>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEdit}
              >
                ✏️ Editar
              </button>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Nome</label>
                <div className="form-input-plain">
                  {initialData.name || "-"}
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>
                <div className="form-input-plain">
                  {initialData.email || "-"}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Apelido</label>
                <div className="form-input-plain">
                  {initialData.apelido || "-"}
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <label className="form-label">Data de Nascimento</label>
                <div className="form-input-plain">
                  {formatarData(initialData.dataNascimento)}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-start mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
