import { useForm } from "react-hook-form";
import Logo from "../../assets/images/logo-synapsis.png";
import "./CriarContaPage.css";
import useSalvarUser from "./hooks/useSalvarUser";
import type { User } from "../../components/user/types/User";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function CriarContaPage() {
  const methods = useForm<User>();
  const { salvarUser, isSalvandoUser } = useSalvarUser(); 
  const navigate = useNavigate();
  
  const onSubmit = (data: any) => {
    console.log("submit", data);
    
    salvarUser(data, {
      async onSuccess() {
        toast.success("Conta criada com sucesso!");
        console.log("criado");
        navigate(`./`);
      },
      onError() {        
        try {
           toast.error("Erro, não foi possível criar a conta!"); 
        } catch (error) {
            console.log(error);            
        }
      },
    });
  };

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
    <div className="login-container">
      <div className="left-section">
        <div className="hero-container">
            <img src={Logo} alt="Synapsis Symbol" className="image-center" />
            <h1 className="hero-text">Conecte Ideias</h1>
        </div>
      </div>

      <div className="right-section">
        <div className="form-container">
          <h2 className="form-title">Preencha os campos</h2>
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
            placeholder="Como você quer ser chamado?"
            className="input-field"
          />
          <input
            type="date"
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
          <button type="submit" disabled={isSalvandoUser} className="login-button">Salvar</button>
        </div>
      </div>
    </div>
    </form>
  );
}
