package br.com.synapsis.synapsis.categoria;

import br.com.synapsis.synapsis.categoria.dto.CategoriaRequestDTO;
import br.com.synapsis.synapsis.categoria.dto.CategoriaResponseDTO;
import br.com.synapsis.synapsis.categoria.dto.CategoriaShowDTO;
import br.com.synapsis.synapsis.conteudo.ConteudoEntity;
import br.com.synapsis.synapsis.conteudo.ConteudoMapper;
import br.com.synapsis.synapsis.conteudo.dto.ConteudoResponseDTO;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface CategoriaMapper {

    CategoriaEntity toEntity(CategoriaRequestDTO dto);

    @Mapping(target = "criadoPor", source = "criadoPor")
    CategoriaResponseDTO toResponse(CategoriaEntity entity);

    @Mapping(target = "conteudos", expression = "java(toConteudoResponseList(entity.getConteudos()))")
    @Mapping(target = "criadoPor", source = "criadoPor")
    CategoriaShowDTO toShow(CategoriaEntity entity);

    default List<ConteudoResponseDTO> toConteudoResponseList(List<ConteudoEntity> conteudos) {
        if (conteudos == null) return List.of();

        return conteudos.stream().map(c ->
                new ConteudoResponseDTO(
                        c.getId(),
                        c.getTitulo(),
                        c.getCorpo(),
                        c.getCor(),
                        c.getStatus(),
                        c.getPublicadoEm(),
                        c.getCriadoEm(),
                        c.getAtualizadoEm(),
                        null, // não mapeia categoria aqui
                        null, // não mapeia usuário aqui
                        null  // não mapeia tags aqui
                )
        ).collect(Collectors.toList());
    }
}