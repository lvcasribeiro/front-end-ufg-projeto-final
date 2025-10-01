package br.com.synapsis.synapsis.favorito.dto;

import br.com.synapsis.synapsis.conteudo.dto.ConteudoShowDTO;
import br.com.synapsis.synapsis.users.dto.UserDTO;

import java.time.LocalDateTime;

public record FavoritoResponseDTO(
        Long id,
        UserDTO usuario,
        ConteudoShowDTO conteudo,
        LocalDateTime criadoEm
) {}
