import React from "react";
import Layout from "../../components/layout/Layout";
import "./TagsPage.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import type { Tags } from "../../components/apis/tags-requests/types/tags";
import useSalvarTag from "./hooks/useSalvarTag";
import useBuscarTags from "./hooks/useBuscarTags";

export default function TagsPage() {
    const navigate = useNavigate();
    const methods = useForm<Tags>();
    const { salvarTags } = useSalvarTag();
    const { tags, isLoadingTags, loadTags } = useBuscarTags({
        page: 1,
        size: 12,
    });

    const onSubmit = (data: Tags) => {
    
        salvarTags(data, {
        async onSuccess() {
            toast.success("Tag criada com sucesso!");
        // loadTags();
        },
        onError() {    
            toast.error("Erro, não foi possível criar a tag!"); 
        },
        });
    };

    return (
        <Layout>
                <div className="form">
                    <h2 className="form-title">Tags</h2>

                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <label htmlFor="titulo" className="form-label">Nome</label>
                    <div className="add-tag-group">                        
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="Dê um nome para sua tag..."
                            max={255}
                            {...methods.register("nome", {
                                required: "Nome é obrigatório",
                            })}
                        />
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            >Adicionar Tag
                        </button>
                    </div>
                    </form>

                    <div>
                        
                    </div>        
                        
                </div>
        </Layout>
    );
}