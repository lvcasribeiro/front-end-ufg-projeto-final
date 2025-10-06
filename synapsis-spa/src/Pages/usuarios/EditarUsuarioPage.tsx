import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import type { User } from "../../components/apis/user/types/User";
import { useSalvarUsuario } from "../../components/apis/user/hooks/useSalvarUsuario";
import { useApiClient } from "../../hooks/useApiClient";
import UserForm from "./_components/UserForm";

export default function EditarUsuarioPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<Partial<User> | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const { atualizar } = useSalvarUsuario();
  const api = useApiClient();

  useEffect(() => {
    async function carregarUsuario() {
      if (!id) {
        toast.error("ID de usuário inválido.");
        navigate("/home/usuarios");
        return;
      }
      try {
        setIsLoading(true);
        const { data } = await api.get(`/user/${id}`);
        setInitialData(data);
      } catch (error) {
        toast.error("Erro ao carregar dados do usuário.");
        navigate("/home/usuarios");
      } finally {
        setIsLoading(false);
      }
    }
    carregarUsuario();
  }, [id, api, navigate]);

  const onSubmit = (data: User) => {
    if (!id) return;
    atualizar.mutate(
      { ...data, id: parseInt(id) },
      {
        onSuccess: () => {
          toast.success("Usuário atualizado com sucesso!");
          navigate("/home/usuarios");
        },
        onError: () => toast.error("Erro ao atualizar usuário!"),
      },
    );
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Carregando dados do usuário...</p>
        </div>
      </Layout>
    );
  }

  if (!initialData) {
    return (
      <Layout>
        <div className="alert alert-danger text-center" role="alert">
          Usuário não encontrado.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <UserForm
        initialData={initialData}
        title="Editar Usuário"
        submitText="Salvar"
        isEdit={true}
        onSubmit={onSubmit}
        onCancel={() => navigate("/home/usuarios")}
      />
    </Layout>
  );
}
