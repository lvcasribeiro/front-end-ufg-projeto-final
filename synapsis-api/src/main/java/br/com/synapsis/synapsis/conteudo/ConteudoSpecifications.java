package br.com.synapsis.synapsis.conteudo;

import br.com.synapsis.synapsis.shared.enums.StatusConteudoEnum;
import br.com.synapsis.synapsis.tag.TagEntity;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import jakarta.persistence.criteria.Join;

public class ConteudoSpecifications {

    public static Specification<ConteudoEntity> buildSpecification(
            String titulo,
            String tag,
            StatusConteudoEnum status,
            Long userId
    ) {
        return (root, query, cb) -> {
            var predicates = new java.util.ArrayList<jakarta.persistence.criteria.Predicate>();

            predicates.add(cb.equal(root.get("usuario").get("id"), userId));

            if (StringUtils.hasText(titulo)) {
                predicates.add(
                        cb.like(
                                cb.lower(root.get("titulo")),
                                "%" + titulo.toLowerCase() + "%"
                        )
                );
            }

            if (StringUtils.hasText(tag)) {
                Join<ConteudoEntity, TagEntity> tagsJoin = root.join("tags");
                predicates.add(
                        cb.like(
                                cb.lower(tagsJoin.get("nome")),
                                "%" + tag.toLowerCase() + "%"
                        )
                );
                // Evita duplicados quando tem join
                query.distinct(true);
            }

            // 📌 Filtro por status
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }

            return cb.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };
    }
}