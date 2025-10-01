package br.com.synapsis.synapsis.conteudo;

import br.com.synapsis.synapsis.categoria.CategoriaEntity;
import br.com.synapsis.synapsis.categoria.CategoriaMapper;
import br.com.synapsis.synapsis.categoria.dto.CategoriaResponseDTO;
import br.com.synapsis.synapsis.conteudo.dto.ConteudoRequestDTO;
import br.com.synapsis.synapsis.conteudo.dto.ConteudoResponseDTO;
import br.com.synapsis.synapsis.conteudo.dto.ConteudoShowDTO;
import br.com.synapsis.synapsis.tag.TagEntity;
import br.com.synapsis.synapsis.tag.TagMapper;
import br.com.synapsis.synapsis.tag.dto.TagResponseDTO;
import br.com.synapsis.synapsis.users.UserEntity;
import br.com.synapsis.synapsis.users.UserMapper;
import br.com.synapsis.synapsis.users.dto.UserDTO;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ConteudoMapper {

    ConteudoMapper INSTANCE = Mappers.getMapper(ConteudoMapper.class);

    @Mapping(target = "categoria.id", source = "categoriaId")
    ConteudoEntity toEntity(ConteudoRequestDTO dto);

    @Mapping(target = "categoria", expression = "java(toCategoriaResponse(entity.getCategoria()))")
    ConteudoResponseDTO toResponse(ConteudoEntity entity);

    @Mapping(target = "categoria", expression = "java(toCategoriaResponse(entity.getCategoria()))")
    @Mapping(target = "tags", expression = "java(toTagResponseSet(entity.getTags()))")
    ConteudoShowDTO toShow(ConteudoEntity entity);

    // 👇 Métodos auxiliares que não dependem de outros mappers
    default CategoriaResponseDTO toCategoriaResponse(CategoriaEntity categoria) {
        if (categoria == null) return null;
        return new CategoriaResponseDTO(
                categoria.getId(),
                categoria.getNome(),
                categoria.getDescricao(),
                categoria.getCriadoEm(),
                categoria.getCriadoPor() != null ? UserMapper.INSTANCE.toDTO(categoria.getCriadoPor()) : null
        );
    }

    default Set<TagResponseDTO> toTagResponseSet(Set<TagEntity> tags) {
        if (tags == null) return Set.of();
        return tags.stream()
                .map(t -> new TagResponseDTO(
                        t.getId(),
                        t.getNome(),
                        t.getCriadoEm(),
                        t.getCriadoPor() != null ? UserMapper.INSTANCE.toDTO(t.getCriadoPor()) : null
                ))
                .collect(Collectors.toSet());
    }
}