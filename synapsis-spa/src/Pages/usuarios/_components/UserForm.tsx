import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { User } from "../../../components/apis/user/types/User";

interface UserFormProps {
  initialData?: Partial<User>;
  onSubmit: (data: User) => void;
  title: string;
  submitText: string;
  isEdit?: boolean;
  onCancel?: () => void;
  className?: string;
}

export default function UserForm({
  initialData,
  onSubmit,
  title,
  submitText,
  isEdit = false,
  onCancel,
  className = "form",
}: UserFormProps) {
  const navigate = useNavigate();
  const methods = useForm<User>({
    defaultValues: initialData,
    mode: "onChange",
  });

  useEffect(() => {
    if (initialData) {
      methods.reset(initialData);
    }
  }, [initialData, methods]);

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate("/home/usuarios");
    }
  };

  return (
    <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
      <h2 className="form-title mb-4">{title}</h2>

      <div className="form-group mb-3">
        <label className="form-label">Nome *</label>
        <input
          type="text"
          className="form-control"
          placeholder="Digite o nome completo"
          {...methods.register("name", {
            required: "Nome é obrigatório",
            minLength: {
              value: 2,
              message: "Nome deve ter pelo menos 2 caracteres",
            },
          })}
        />
        {methods.formState.errors.name && (
          <small className="text-danger">
            {methods.formState.errors.name.message}
          </small>
        )}
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Email *</label>
        <input
          type="email"
          className="form-control"
          placeholder="Digite o email"
          {...methods.register("email", {
            required: "Email é obrigatório",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email inválido",
            },
          })}
        />
        {methods.formState.errors.email && (
          <small className="text-danger">
            {methods.formState.errors.email.message}
          </small>
        )}
      </div>

      <div className="form-group mb-3">
        <label className="form-label">
          Senha {isEdit ? "(opcional)" : "*"}
        </label>
        <input
          type="password"
          className="form-control"
          placeholder={
            isEdit ? "Digite a nova senha (opcional)" : "Crie uma senha"
          }
          {...methods.register("password", {
            required: !isEdit ? "Senha é obrigatória" : false,
            minLength: {
              value: 6,
              message: "Senha deve ter pelo menos 6 caracteres",
            },
          })}
        />
        {methods.formState.errors.password && (
          <small className="text-danger">
            {methods.formState.errors.password.message}
          </small>
        )}
        {isEdit && (
          <small className="text-muted">
            Se não quiser alterar a senha, deixe este campo em branco.
          </small>
        )}
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Apelido</label>
        <input
          type="text"
          className="form-control"
          placeholder="Digite o apelido (opcional)"
          {...methods.register("apelido")}
        />
      </div>

      <div className="form-group mb-4">
        <label className="form-label">Data de Nascimento</label>
        <input
          type="date"
          className="form-control"
          {...methods.register("dataNascimento", {
            validate: (value) =>
              !value || !isNaN(Date.parse(String(value))) || "Data inválida",
          })}
        />
        {methods.formState.errors.dataNascimento && (
          <small className="text-danger">
            {methods.formState.errors.dataNascimento.message}
          </small>
        )}
      </div>

      <div className="form-actions d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={methods.formState.isSubmitting}
        >
          {methods.formState.isSubmitting ? "Salvando..." : submitText}
        </button>
      </div>
    </form>
  );
}
