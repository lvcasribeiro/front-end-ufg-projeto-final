package br.com.synapsis.synapsis.tag;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public class TagSpecifications {

    public static Specification<TagEntity> buildSpecification(
            String nome,
            Long userId
    ) {
        return (root, query, cb) -> {
            var predicates = new java.util.ArrayList<jakarta.persistence.criteria.Predicate>();


            predicates.add(cb.equal(root.get("criadoPor").get("id"), userId));


            if (StringUtils.hasText(nome)) {
                predicates.add(
                        cb.like(
                                cb.lower(root.get("nome")),
                                "%" + nome.toLowerCase() + "%"
                        )
                );
            }

            return cb.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };
    }
}