import { useForm } from "react-hook-form";
import "./CriarContaPage.css";
import useSalvarUser from "./hooks/useSalvarUser";
import type { User } from "../../components/apis/user/types/User";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackgroundImage from "../../assets/images/background.jpg";
import Logo from "../../assets/images/logo-synapsis.png";

export default function CriarContaPage() {
  const methods = useForm<User>();
  const { salvarUser, isSalvandoUser } = useSalvarUser();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    salvarUser(data, {
      async onSuccess() {
        toast.success("Conta criada com sucesso!");
        navigate(`../`);
      },
      onError() {
        toast.error("Erro, não foi possível criar a conta!");
      },
    });
  };

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <div className="login-container">
        <div
          className="page-bg"
          style={{ backgroundImage: `url(${BackgroundImage})` }}
          aria-hidden="true"
        />

        <div className="left-section">
          <div className="hero-container">
            <div className="brand-inline">
              <img src={Logo} alt="Synapsis Logo" className="brand-logo" />
              <span className="brand-name">SYNAPSIS</span>
            </div>
            <h1 className="hero-text">Conecte Ideias</h1>
          </div>
        </div>

        <div className="right-section">
          <div className="form-container">
            <h2 className="titulo-login">Preencha os campos</h2>
            <input
              type="text"
              max={255}
              {...methods.register("name", {
                required: "Nome Completo é obrigatório",
              })}
              placeholder="Nome Completo"
              className="input-field"
            />
            <input
              type="text"
              max={255}
              {...methods.register("apelido")}
              placeholder="Como você quer ser chamado?"
              className="input-field"
            />
            <input
              type="date"
              {...methods.register("data_nascimento")}
              placeholder="Data de Nascimento"
              className="input-field"
            />
            <input
              type="text"
              max={255}
              {...methods.register("email", {
                required: "E-mail é obrigatório",
              })}
              placeholder="E-mail"
              className="input-field"
            />
            <input
              type="password"
              max={255}
              {...methods.register("password", {
                required: "Senha é obrigatória",
              })}
              placeholder="Senha"
              className="input-field"
            />
            <button
              type="submit"
              disabled={isSalvandoUser}
              className="login-button"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
