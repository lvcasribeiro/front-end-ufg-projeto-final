package br.com.synapsis.synapsis.conteudo;

import br.com.synapsis.synapsis.shared.enums.StatusConteudoEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConteudoRepository extends JpaRepository<ConteudoEntity, Long>, JpaSpecificationExecutor<ConteudoEntity> {
    List<ConteudoEntity> findByStatus(StatusConteudoEnum status);
    List<ConteudoEntity> findByCategoriaId(Long categoriaId);

    Optional<ConteudoEntity> findByIdAndUsuarioId(Long id, Long userId);

    Page<ConteudoEntity> findByUsuarioId(Long usuarioId, Pageable pageable);

    Page<ConteudoEntity> findByUsuarioIdAndStatus(Long usuarioId, StatusConteudoEnum status, Pageable pageable);
}
