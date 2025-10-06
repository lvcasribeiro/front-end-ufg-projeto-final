import React from "react";
import "./AdicionarNotaPage.css"; // O CSS será atualizado no próximo passo
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import type { Notas } from "../../components/notas-api/types/notas";
import useSalvarNota from "./hooks/useSalvarNota";

// --- NOVO: Array com as cores disponíveis ---
const coresDisponiveis = [
    { nome: "Branco", hex: "#FFFFFF" },
    { nome: "Vermelho", hex: "#F47174" }, // Tons mais suaves
    { nome: "Laranja", hex: "#FFC974" },
    { nome: "Amarelo", hex: "#FFF275" },
    { nome: "Verde", hex: "#8DDB80" },
    { nome: "Azul", hex: "#77A4F8" },
];

export default function AdicionarNotaPage() {
    const navigate = useNavigate();
    const methods = useForm<Notas>({
        defaultValues: {
            cor: "#FFFFFF" 
        }
    });
    const { salvarNota } = useSalvarNota();

    const onSubmit = (data: any) => {
        console.log({data});
        salvarNota(data, {
          async onSuccess() {
            toast.success("Nota criada com sucesso!");
            navigate("/home/minhas-notas");
          },
          onError() {
            console.log("erro");
            toast.error("Erro, não foi possível criar a nota!");
          },
        });
      };

    return (
        <Layout>
            <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
                <h2 className="form-title">Adicionar Nota</h2>

                {/* Campo Título */}
                <div className="form-group">
                    <label htmlFor="titulo" className="form-label">Título</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Dê um título para sua nota..."
                        maxLength={255}
                        {...methods.register("titulo", {
                            required: "Título é obrigatório",
                        })}
                    />
                </div>

                {/* Campo Conteúdo */}
                <div className="form-group">
                    <label htmlFor="conteudo" className="form-label">Conteúdo</label>
                    <textarea
                        className="form-input form-textarea"
                        placeholder="Escreva sua nota aqui..."
                        {...methods.register("corpo", {
                            required: "Conteúdo é obrigatório",
                        })}
                    />
                </div>

                {/* --- NOVO: Seletor de Cores Visual --- */}
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

                {/* Botões de Ação */}
                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/home/minhas-notas")}
                    >
                        Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">Salvar</button>
                </div>
            </form>
        </Layout>
    );
}