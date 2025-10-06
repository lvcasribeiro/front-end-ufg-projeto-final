import React from "react";
import Layout from "../../components/layout/Layout";
import "./NotasPage.css";
import { useNavigate } from "react-router-dom";
import useBuscarNotas from "./hooks/useBuscarNotas";
import type { Notas } from "../../components/apis/notas-requests/types/notas"; // Importando o tipo

export default function NotasPage() {
    const navigate = useNavigate();

    const {
        isLoadingNotas,
        errorLoadingNotas,
        notas,
        meta,
        // loadNotas, // Descomente se precisar de um botão para recarregar
    } = useBuscarNotas({
        page: 1,
        perPage: 12, // Ajustado para o máximo de 12 por página
    });

    // Função para renderizar o conteúdo principal da página
    const renderContent = () => {
        if (isLoadingNotas) {
            return <p className="info-text">Carregando notas...</p>;
        }

        if (errorLoadingNotas) {
            return <p className="info-text error-text">{errorLoadingNotas}</p>;
        }

        if (!notas || notas.length === 0) {
            return <p className="info-text">Nenhuma nota encontrada. Que tal adicionar uma?</p>;
        }

        return (
            <div className="notas-grid">
                {notas.map((nota: Notas) => (
                    <div key={nota.id} className="nota-card">
                        <h3 className="nota-titulo">{nota.titulo}</h3>
                        <p className="nota-corpo">{nota.corpo}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <Layout>
            <div className="form">
                <div className="header-container">
                    <h2 className="form-title">Minhas Notas</h2>
                    <div className="form-actions">
                        <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={() => navigate("./adicionar-nota")}
                        >Adicionar Nota</button>
                    </div>
                </div>

                <hr className="separator" />
                
                {renderContent()}

                {/* Aqui você pode adicionar a lógica de paginação usando os dados do 'meta' */}
            </div>
        </Layout>
    );
}