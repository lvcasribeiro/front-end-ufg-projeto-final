import React from "react";
import "./AdicionarNotaPage.css";
import Layout from "../../components/layout/Layout";


export default function AdicionarNotaPage() {
    return (
        <Layout>
            <form className="nota-page">
                <div>
                    <h2 className="h2">Adicionar Nota</h2>
                </div>
                <div>
                    <fieldset className="fieldset">
                        <legend className="legend">Título</legend>
                        <input type="text" className="input-style" />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="legend">Conteúdo</legend>
                        <input type="text" className="input-style-conteudo" /> 
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="legend">Tags</legend>
                        <select className="input-style" name="teste" id="teste"></select>
                    </fieldset>
                </div>
                <div className="salvar">
                    <button type="submit" className="salvar-button">Salvar</button>
                </div>
            </form>
        </Layout>
    );
}