import React from "react";
import Layout from "../../components/layout/Layout";
import "./AdicionarCategoriaPage.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import type { Categorias } from "../../components/apis/categorias-requests/types/categorias";
import useSalvarCategoria from "../adicionar-categoria/hooks/useSalvarCategoria";

export default function AdicionarCategoriaPage() {
    const navigate = useNavigate();
    const methods = useForm<Categorias>();
    const { salvarCategoria, isSalvandoCategoria } = useSalvarCategoria();

    const onSubmit = (data: any) => {
    
        salvarCategoria(data, {
        async onSuccess() {
            toast.success("Cadeira criada com sucesso!");
            navigate(`../`);
        },
        onError() {    
            toast.error("Erro, não foi possível criar a categoria!"); 
        },
        });
    };

    return (
        <Layout>            
            <div className="form">
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <h2 className="form-title">Adicionar Categoria</h2>
                    <div className="form-group">
                        <label htmlFor="titulo" className="form-label">Nome</label>
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="Dê um nome para sua categoria..."
                            max={255}
                            {...methods.register("nome", {
                                required: "Nome é obrigatório",
                            })}
                        />
                    </div>

                    {/* Campo Conteúdo */}
                    <div className="form-group">
                        <label htmlFor="conteudo" className="form-label">Descrição</label>
                        <textarea 
                            className="form-input form-textarea"
                            placeholder="Escreva a descrição aqui..."
                            {...methods.register("descricao")}
                        />
                    </div>

                    {/* Botões de Ação */}
                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={() => navigate("/home/categorias")}
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">Salvar</button>
                    </div>
                </form>    
            </div>            
        </Layout>
    );
}