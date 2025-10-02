package br.com.synapsis.synapsis.tag.dto;

import br.com.synapsis.synapsis.users.dto.UserDTO;

import java.time.LocalDateTime;

public record TagResponseDTO(
        Long id,
        String nome,
        LocalDateTime criadoEm,
        UserDTO criadoPor
) {}
