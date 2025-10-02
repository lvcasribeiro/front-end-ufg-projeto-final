package br.com.synapsis.synapsis.tag.dto;

import br.com.synapsis.synapsis.users.dto.UserDTO;

public record TagShowDTO(
        Long id,
        String nome,
        UserDTO criadoPor
) {}
