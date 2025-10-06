import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { User } from "../../components/apis/user/types/User";
import { useSalvarUsuario } from "../../components/apis/user/hooks/useSalvarUsuario";
import UserForm from "./_components/UserForm";

export default function CriarUsuarioPage() {
  const navigate = useNavigate();
  const { criar } = useSalvarUsuario();

  const onSubmit = (data: User) => {
    criar.mutate(data, {
      onSuccess: () => {
        toast.success("Usuário criado com sucesso!");
        navigate("/home/usuarios");
      },
      onError: () => toast.error("Erro ao criar usuário!"),
    });
  };

  return (
    <Layout>
      <UserForm
        title="Criar Usuário"
        submitText="Salvar"
        onSubmit={onSubmit}
        onCancel={() => navigate("/home/usuarios")}
      />
    </Layout>
  );
}
