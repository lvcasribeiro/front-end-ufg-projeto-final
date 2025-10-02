ALTER TABLE tags
ADD COLUMN criado_por BIGINT,
ADD CONSTRAINT fk_tags_users FOREIGN KEY (criado_por) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE categorias
ADD COLUMN criado_por BIGINT,
ADD CONSTRAINT fk_categorias_users FOREIGN KEY (criado_por) REFERENCES users(id) ON DELETE SET NULL;