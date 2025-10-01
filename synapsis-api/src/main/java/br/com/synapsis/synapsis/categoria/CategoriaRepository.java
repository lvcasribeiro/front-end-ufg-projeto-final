package br.com.synapsis.synapsis.categoria;

import aj.org.objectweb.asm.commons.Remapper;
import br.com.synapsis.synapsis.tag.TagEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<CategoriaEntity, Long> {
    Page<CategoriaEntity> findByCriadoPor_Id(Long userId, Pageable pageable);

    Optional<CategoriaEntity> findByIdAndCriadoPor_Id(Long id, Long userId);
}