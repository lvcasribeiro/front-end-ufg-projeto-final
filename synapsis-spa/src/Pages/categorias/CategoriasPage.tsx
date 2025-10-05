import React from "react";
import Layout from "../../components/layout/Layout";
import "./CategoriasPage.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

export default function CategoriasPage() {
    const navigate = useNavigate();

    return (
        <Layout>
                <div className="form">
                    <h2 className="form-title">Categorias</h2>

                    {/* Botões de Ação */}
                    <div className="form-actions">
                        <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={() => navigate("./adicionar-categoria")}
                        >Adicionar Categoria</button>
                    </div>
                </div>
        </Layout>
    );
}