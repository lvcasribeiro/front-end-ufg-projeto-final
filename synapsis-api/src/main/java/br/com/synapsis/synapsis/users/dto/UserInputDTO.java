package br.com.synapsis.synapsis.users.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record UserInputDTO(
        Long id,
        @NotNull(message = "O campo nome é obrigatório")
        String name,
        @NotNull(message = "O campo email é obrigatório")
        String email,
        String password,
        String apelido,
        LocalDate dataNascimento
) {
}
