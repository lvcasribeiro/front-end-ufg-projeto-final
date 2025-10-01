-- =======================
-- TABELA: favoritos
-- =======================
CREATE TABLE favoritos (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    conteudo_id BIGINT NOT NULL REFERENCES conteudos(id) ON DELETE CASCADE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Garante que um usuário não pode favoritar o mesmo conteúdo múltiplas vezes
    UNIQUE(usuario_id, conteudo_id)
);

-- Índices para performance
CREATE INDEX idx_favoritos_usuario ON favoritos(usuario_id);
CREATE INDEX idx_favoritos_conteudo ON favoritos(conteudo_id);
CREATE INDEX idx_favoritos_criado_em ON favoritos(criado_em);