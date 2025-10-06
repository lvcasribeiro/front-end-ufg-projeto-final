import React, { useEffect } from "react";
import "./AdicionarNotaPage.css";
import Layout from "../../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { Notas } from "../../components/apis/notas-requests/types/notas";
import useSalvarNota from "./hooks/useSalvarNota";
import useBuscarTags from "../tags/hooks/useBuscarTags";
import useBuscarNotaById from "./hooks/useBuscarNotaById";

const coresDisponiveis = [
  { nome: "Branco", hex: "#FFFFFF" },
  { nome: "Vermelho", hex: "#F47174" },
  { nome: "Laranja", hex: "#FFC974" },
  { nome: "Amarelo", hex: "#FFF275" },
  { nome: "Verde", hex: "#8DDB80" },
  { nome: "Azul", hex: "#77A4F8" },
];

export default function AdicionarNotaPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const methods = useForm<Notas>();
  const { tags, isLoadingTags } = useBuscarTags({
    page: 1,
    size: 100,
    nome: "",
  });

  const { salvarNota, isSalvandoNota } = useSalvarNota();

  const { nota, isLoadingNota } = useBuscarNotaById({ id: Number(id) });

  useEffect(() => {
    if (nota) {
      const formData = {
        ...nota,
      };
      methods.reset(formData);
    }
  }, [nota, methods]);

  const onSubmit = (data: any) => {
    // data.status = "PUBLICADO";
    data.tagsIds = data.tagsIds ? [data.tagsIds] : [];

    const payload = isEditMode ? { ...data, id: Number(id) } : data;

    salvarNota(payload, {
      onSuccess() {
        const message = isEditMode
          ? "Nota atualizada com sucesso!"
          : "Nota criada com sucesso!";
        toast.success(message);
        navigate("/home/minhas-notas");
      },
      onError() {
        const message = isEditMode
          ? "Erro ao atualizar a nota!"
          : "Erro ao criar a nota!";
        toast.error(message);
      },
    });
  };

  if (isLoadingNota) {
    return (
      <Layout>
        <p>Carregando nota...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <h2 className="form-title">
          {isEditMode ? "Editar Nota" : "Adicionar Nota"}
        </h2>

        {/* Seus campos de formulário continuam iguais */}
        <div className="form-group">
          <label htmlFor="titulo" className="form-label">
            Título
          </label>
          <input
            type="text"
            className="form-input"
            {...methods.register("titulo", { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="conteudo" className="form-label">
            Conteúdo
          </label>
          <textarea
            className="form-input form-textarea"
            {...methods.register("corpo", { required: true })}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Cor</label>
            <div className="color-selector">
              {coresDisponiveis.map((cor) => (
                <label key={cor.hex} className="color-option">
                  <input
                    type="radio"
                    value={cor.hex}
                    className="color-input-radio"
                    {...methods.register("cor")}
                  />
                  <span
                    className="color-swatch"
                    style={{ backgroundColor: cor.hex }}
                    title={cor.nome}
                  />
                </label>
              ))}
            </div>
          </div>
          <div className="form-group form-group--tag">
            <label className="form-label">Tag</label>
            <select
              className="form-input"
              disabled={isLoadingTags}
              {...methods.register("tagsIds")}
            >
              <option value="">Nenhuma tag</option>
              {tags?.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group form-group--status">
            <label className="form-label">Status</label>
            <select
              className="form-input"
              {...methods.register("status", { required: true })}
              defaultValue={nota?.status || "PUBLICADO"}
            >
              <option value="PUBLICADO">PUBLICADO</option>
              <option value="ARQUIVADO">ARQUIVADO</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/home/minhas-notas")}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSalvandoNota}
          >
            {isSalvandoNota ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </Layout>
  );
}
