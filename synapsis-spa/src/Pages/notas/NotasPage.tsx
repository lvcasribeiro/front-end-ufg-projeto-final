import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import "./NotasPage.css";
import { useNavigate } from "react-router-dom";
import useBuscarNotas from "./hooks/useBuscarNotas";
import type { Notas } from "../../components/apis/notas-requests/types/notas";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa6";
import useDeletarNota from "./hooks/useDeletarNotas";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import useBuscarTags from "../tags/hooks/useBuscarTags";
import useFavoritarNota from "./hooks/useFavoritarNota";
import useDesfavoritarNota from "./hooks/useDesfavoritarNota";
import useBuscarFavoritos from "./hooks/useBuscarFavoritos";

export default function NotasPage() {
    const navigate = useNavigate();
    const { tags, isLoadingTags } = useBuscarTags({page: 1, size: 12, nome: ""});
    const { favoritos, loadFavoritos } = useBuscarFavoritos(); 
    const [selectedTag, setSelectedTag] = useState<string>("");
    const { isLoadingNotas, notas, loadNotas } = useBuscarNotas({
        page: 1, 
        size: 12,        
        titulo: "", 
        tag: selectedTag, 
        status: "", 
    });
    const { deletarNota } = useDeletarNota();
    const { favoritarNota } = useFavoritarNota();
    const { desfavoritarNota } = useDesfavoritarNota();   
    const [favoritedIds, setFavoritedIds] = useState(new Set<number>());
    const [favoriteIdMap, setFavoriteIdMap] = useState(new Map<number, number>());

    useEffect(() => {
        if (favoritos) {
            const newFavoritedIds = new Set<number>();
            const newFavoriteIdMap = new Map<number, number>();
            console.log({favoritos});
            favoritos?.forEach(fav => {
                newFavoritedIds.add(fav.conteudoId);
                newFavoriteIdMap.set(fav.conteudoId, fav.id); // Mapeia notaId -> favoritoId
            });
            setFavoritedIds(newFavoritedIds);
            setFavoriteIdMap(newFavoriteIdMap);
        }
    }, [favoritos]); // Roda sempre que 'favoritos' for atualizado

    console.log({favoritos});

    const deletarNotaFunction = async (id: number) => {
      await confirmAlert({
        title: 'Confirmar Exclusão',
        message: 'Você tem certeza que deseja excluir esta nota?',
        buttons: [
            {
                    label: 'Sim',
                    onClick: async () => {
                        try {
                            await deletarNota({id});
                            await loadNotas();                         
                            toast.success("Nota excluída com sucesso!");
                        } catch (error) {
                            console.error("Erro ao deletar a nota:", error);
                            toast.error("Não foi possível excluir a nota.");
                        }
                    }
                },
            {
            label: 'Não',
            }
        ]
    }); 
    };

    const favoritarNotaFunction = async (notaId: number) => {
        favoritarNota({ conteudoId: notaId }, {
            onSuccess() {
                toast.success("Nota favoritada com sucesso!");
                loadFavoritos(); 
            },
            onError(error) {
                console.log("erro", error);
                toast.error("Erro, não foi possível favoritar a nota!");
            },
        });
    };

    const desfavoritarNotaFunction = async (notaId: number) => {
        const favoritoId = favoriteIdMap.get(notaId);
        if (!favoritoId) {
            toast.error("Não foi possível encontrar o favorito para remover.");
            return;
        }

        desfavoritarNota({ id: favoritoId }, {
            onSuccess() {
                toast.success("Nota desfavoritada com sucesso!");
                loadFavoritos(); 
            },
            onError(error) {
                console.log("erro", error);
                toast.error("Erro, não foi possível desfavoritar a nota!");
            },
        });
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
                {notas.map((nota: Notas) => {
                    const isFavorited = favoritedIds.has(nota.id);
                    return (
                        <div
                            key={nota.id}
                            className="nota-card"
                            style={{ backgroundColor: nota.cor || '#FFFFFF' }}
                        >
                            <button 
                                className="action-button favorite-button" 
                                title={isFavorited ? "Desfavoritar Nota" : "Favoritar Nota"}
                                onClick={() => isFavorited ? desfavoritarNotaFunction(nota.id) : favoritarNotaFunction(nota.id)}
                            >
                                {isFavorited ? <FcLike /> : <FaRegHeart />}
                            </button>

                            <h3 className="nota-titulo">{nota.titulo}</h3>
                            <p className="nota-corpo">{nota.corpo}</p>

                            <div className="nota-actions">
                                <button className="action-button" title="Editar Nota" onClick={() => navigate(`/home/minhas-notas/editar-nota/${nota.id}`)}>
                                    <FaPencilAlt />
                                </button>                            
                                <button className="action-button" title="Excluir Nota" onClick={() => deletarNotaFunction(nota.id)}>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <Layout>
            <div className="form">
                <div className="header-container">
                    <h2 className="form-title">Minhas Notas</h2>
                    <div className="header-actions">
                    <select
                        className="filter-select"
                        disabled={isLoadingTags}
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                    >
                        <option value="">Todas as Notas</option>
                        {tags?.map(tag => (
                            <option key={tag.id} value={tag.nome}>
                                {tag.nome}
                            </option>
                        ))}
                    </select>
                    
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