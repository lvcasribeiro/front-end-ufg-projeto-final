package br.com.synapsis.synapsis.categoria.dto;

import br.com.synapsis.synapsis.users.dto.UserDTO;

import java.time.LocalDateTime;

public record CategoriaResponseDTO(
        Long id,
        String nome,
        String descricao,
        LocalDateTime criadoEm,
        UserDTO criadoPor
) {}



