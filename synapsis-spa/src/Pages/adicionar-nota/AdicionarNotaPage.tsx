import React, { useState } from "react";
import "./AdicionarNotaPage.css";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import type { Notas } from "../../components/notas-api/types/notas";
import useSalvarNota from "./hooks/useSalvarNota";

export default function AdicionarNotaPage() {
    const navigate = useNavigate();
    const methods = useForm<Notas>();
    const { salvarNota, isSalvandoNota } = useSalvarNota(); 
    
    // Estados para controlar os valores dos campos do formulário
    const [titulo, setTitulo] = useState("");
    const [conteudo, setConteudo] = useState("");
    const [tag, setTag] = useState("");

    const onSubmit = (data: any) => {
        data.categoriaId = 1;
        data.tagsIds = 1;
        data.status = "PUBLICADO";
        data.usuarioId = 6;
        
        salvarNota(data, {
          async onSuccess() {
            toast.success("Nota criada com sucesso!");
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
                        max={255}
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
                            required: "Título é obrigatório",
                        })}
                    />
                </div>
                
                {/* Campo Tags */}
                <div className="form-group">
                    <label htmlFor="tags" className="form-label">Tags</label>
                    <select 
                        className="form-input"
                        {...methods.register("tagsIds")} 
                    >
                        <option value={undefined}>Selecione uma tag</option>
                        <option value="trabalho">Trabalho</option>
                        <option value="pessoal">Pessoal</option>
                        <option value="estudos">Estudos</option>
                    </select>

                    <label htmlFor="tags" className="form-label">Cor</label>
                    <select 
                        className="form-input" 
                        {...methods.register("cor")}
                    >
                        <option value="#blue">azul</option>
                        <option value="#yellow">amarelo</option>
                        <option value="#orange">laranja</option>
                        <option value="#red">vermelho</option>
                        <option value="#green">verde</option>
                    </select>
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