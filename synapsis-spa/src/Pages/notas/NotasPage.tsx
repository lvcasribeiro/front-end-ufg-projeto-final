import React from "react";
import Layout from "../../components/layout/Layout";
import "./NotasPage.css";
import { useNavigate } from "react-router-dom";
import useBuscarNotas from "./hooks/useBuscarNotas";
import type { Notas } from "../../components/apis/notas-requests/types/notas";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import useDeletarNota from "./hooks/useDeletarNotas";

export default function NotasPage() {
    const navigate = useNavigate();

    const { isLoadingNotas, notas, } = useBuscarNotas({page: 1, perPage: 12, });

    const { deletarNota } = useDeletarNota();

    const deletarNotaFunction = async (id: number) => {
      const result = teste;

        if (result.isConfirmed) {
        deletarNota(
            { id },
            {
            async onSuccess() {
                await SweetAlertSucess({
                title: "Sucesso",
                text: "O Status Andamento de Processo foi excluído com sucesso.",
                });
                loadStatusAndamentosProcessos();
            },
            onError(error) {
                SweetAlertError({
                title: "Erro",
                text: getFriendlyErrorMessage(error, "Houve um erro ao excluir o Status Andamento de Processo."),
                });
            },
            }
        );
        }
    };

    const renderContent = () => {
        if (isLoadingNotas) {
            return <p className="info-text">Carregando notas...</p>;
        }

        if (!notas || notas.length === 0) {
            return <p className="info-text">Nenhuma nota encontrada. Que tal adicionar uma?</p>;
        }

        return (
            <div className="notas-grid">
                {notas.map((nota: Notas) => (
                    <div
                        key={nota.id}
                        className="nota-card"
                        // Aplica a cor de fundo, usando branco como padrão
                        style={{ backgroundColor: nota.cor || '#FFFFFF' }}
                    >
                        <h3 className="nota-titulo">{nota.titulo}</h3>
                        <p className="nota-corpo">{nota.corpo}</p>

                        <div className="nota-actions">
                            <button className="action-button" title="Editar Nota">
                                <FaPencilAlt />
                            </button>
                            <button className="action-button" title="Excluir Nota" onClick={deletarNotaFunction()}>
                                <FaTrash />
                            </button>
                        </div>
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
            </div>
        </Layout>
    );
}