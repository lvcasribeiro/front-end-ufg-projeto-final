package br.com.synapsis.synapsis.categoria.dto;

import br.com.synapsis.synapsis.conteudo.dto.ConteudoResponseDTO;
import br.com.synapsis.synapsis.users.dto.UserDTO;

import java.util.List;

public record CategoriaShowDTO(
        Long id,
        String nome,
        String descricao,
        List<ConteudoResponseDTO> conteudos,
        UserDTO criadoPor
) {}
