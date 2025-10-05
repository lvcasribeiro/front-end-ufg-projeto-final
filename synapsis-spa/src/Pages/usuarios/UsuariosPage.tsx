import React from "react";
import Layout from "../../components/layout/Layout";
import "./UsuariosPage.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

export default function UsuariosPage() {
    const navigate = useNavigate();

    return (
        <Layout>
                <div className="form">
                    <h2 className="form-title">Usuários</h2>

                </div>
        </Layout>
    );
}