package br.com.synapsis.synapsis.favorito;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoritoRepository extends JpaRepository<FavoritoEntity, Long> {
    List<FavoritoEntity> findByUsuarioId(Long usuarioId);
    boolean existsByUsuarioIdAndConteudoId(Long usuarioId, Long conteudoId);

    Optional<FavoritoEntity> findByConteudoId(Long conteudoId);
}
