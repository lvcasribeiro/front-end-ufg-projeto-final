export interface Favoritos {
    id: number;
    usuario_id: number;
    conteudoId: number;
    criado_em: Date;
}

export type PostFavoritoParams = {
    conteudoId: number;
}