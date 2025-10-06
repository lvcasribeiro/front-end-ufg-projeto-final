package br.com.synapsis.synapsis.tag;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<TagEntity, Long>, JpaSpecificationExecutor<TagEntity> {
    Optional<TagEntity> findByNomeAndCriadoPor_Id(String nome, Long userId);

    Page<TagEntity> findByCriadoPor_Id(Long usuarioId, Pageable pageable);

    Optional<TagEntity> findByIdAndCriadoPor_Id(Long id, Long userId);
}
