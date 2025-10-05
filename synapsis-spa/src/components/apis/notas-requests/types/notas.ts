export interface Notas {
    id: number;
    titulo: string;
    corpo: string;
    cor?: string;
    categoriaId?: number;
    tagsIds?: number;
    usuarioId?: number;
    status?: string;
    publicado_em: Date;
    criado_em: Date;
    atualizado_em: Date;
}