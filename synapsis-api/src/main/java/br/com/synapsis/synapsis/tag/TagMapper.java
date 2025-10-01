package br.com.synapsis.synapsis.tag;

import br.com.synapsis.synapsis.tag.dto.TagRequestDTO;
import br.com.synapsis.synapsis.tag.dto.TagResponseDTO;
import br.com.synapsis.synapsis.tag.dto.TagShowDTO;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface TagMapper {

    TagEntity toEntity(TagRequestDTO dto);

    @Mapping(target = "criadoPor", source = "criadoPor")
    TagResponseDTO toResponse(TagEntity entity);

    @Mapping(target = "criadoPor", source = "criadoPor")
    TagShowDTO toShow(TagEntity entity);
}
