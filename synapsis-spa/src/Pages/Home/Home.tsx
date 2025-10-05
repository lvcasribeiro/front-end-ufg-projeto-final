import React from "react";
import Layout from "../../components/layout/Layout";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

export default function Home() {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="form">
                <h3 className="titles">Meus favoritos</h3>

                
            </div>

            <div className="form">
                <h3 className="titles">Categorias</h3>

                
            </div>
        </Layout>
    );
}