-- =======================
-- TABELA: categorias
-- =======================
CREATE TABLE categorias (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =======================
-- TABELA: conteudos
-- =======================
CREATE TABLE conteudos (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    corpo TEXT NOT NULL,
    cor VARCHAR(7) DEFAULT '#3498db',
    categoria_id BIGINT REFERENCES categorias(id) ON DELETE SET NULL,
    usuario_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) CHECK (status IN ('RASCUNHO', 'PUBLICADO', 'ARQUIVADO')) DEFAULT 'RASCUNHO',
    publicado_em TIMESTAMP NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhorar busca
CREATE INDEX idx_conteudos_status ON conteudos(status);
CREATE INDEX idx_conteudos_categoria ON conteudos(categoria_id);
CREATE INDEX idx_conteudos_usuario ON conteudos(usuario_id);

-- =======================
-- TABELA: tags
-- =======================
CREATE TABLE tags (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =======================
-- TABELA: conteudo_tag (N:N)
-- =======================
CREATE TABLE conteudo_tag (
    conteudo_id BIGINT REFERENCES conteudos(id) ON DELETE CASCADE,
    tag_id BIGINT REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (conteudo_id, tag_id)
);

-- Índices para melhorar performance de filtros
CREATE INDEX idx_conteudo_tag_conteudo ON conteudo_tag(conteudo_id);
CREATE INDEX idx_conteudo_tag_tag ON conteudo_tag(tag_id);