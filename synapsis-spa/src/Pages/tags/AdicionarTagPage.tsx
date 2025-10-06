import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import type { Tags } from "../../components/apis/tags-requests/types/tags";
import useSalvarTag from "./hooks/useSalvarTag";
import useBuscarTagById from "./hooks/useBuscarTagById";



export default function AdicionarTagPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = !!id;

    const methods = useForm<Tags>();

    const { salvarTags, isSalvandoTags } = useSalvarTag();
    
    const { tag, isLoadingTag } = useBuscarTagById({ id: Number(id) });

    useEffect(() => {
        if (tag) {
            const formData = {
                ...tag,
            };
            methods.reset(formData);
        }
    }, [tag, methods]);

    const onSubmit = (data: any) => {
        const payload = isEditMode ? { ...data, id: Number(id) } : data;

        salvarTags(payload, {
            onSuccess() {
                const message = isEditMode ? "Tag atualizada com sucesso!" : "Tag criada com sucesso!";
                toast.success(message);
                navigate("/home/tags");
            },
            onError() {
                const message = isEditMode ? "Erro ao atualizar a Tag!" : "Erro ao criar a Tag!";
                toast.error(message);
            },
        });
    };

    if (isLoadingTag) {
        return <Layout><p>Carregando Tag...</p></Layout>;
    }

    return (
        <Layout>
            <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
                <h2 className="form-title">{isEditMode ? "Editar Tag" : "Adicionar Tag"}</h2>

                {/* Seus campos de formulário continuam iguais */}
                <div className="form-group">
                    <label htmlFor="titulo" className="form-label">Nome</label>
                    <input type="text" className="form-input" {...methods.register("nome", { required: true })} />
                </div>   

                <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/home/tags")}>Cancelar</button>
             
                    <button type="submit" className="btn btn-primary" disabled={isSalvandoTags}>
                        {isSalvandoTags ? "Salvando..." : "Salvar"}
                    </button>
                </div>
            </form>
        </Layout>
    );
}