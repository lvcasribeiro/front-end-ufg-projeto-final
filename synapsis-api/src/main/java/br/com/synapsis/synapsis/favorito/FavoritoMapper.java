package br.com.synapsis.synapsis.favorito;

import br.com.synapsis.synapsis.conteudo.ConteudoMapper;
import br.com.synapsis.synapsis.favorito.dto.FavoritoRequestDTO;
import br.com.synapsis.synapsis.favorito.dto.FavoritoResponseDTO;
import br.com.synapsis.synapsis.users.UserMapper;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {UserMapper.class, ConteudoMapper.class})
public interface FavoritoMapper {

    @Mapping(target = "conteudo.id", source = "conteudoId")
    FavoritoEntity toEntity(FavoritoRequestDTO dto);

    FavoritoResponseDTO toResponse(FavoritoEntity entity);
}
