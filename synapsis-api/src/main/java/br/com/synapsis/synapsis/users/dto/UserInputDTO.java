package br.com.synapsis.synapsis.users.dto;

import jakarta.validation.constraints.NotNull;

public record UserInputDTO(
        Long id,
        @NotNull(message = "O campo nome é obrigatório")
        String name,
        @NotNull(message = "O campo email é obrigatório")
        String email,
        String password
) {
}
