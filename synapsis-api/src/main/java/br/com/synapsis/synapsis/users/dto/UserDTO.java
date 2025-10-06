package br.com.synapsis.synapsis.users.dto;

import java.time.LocalDate;

public record UserDTO(
        Long id,
        String name,
        String email,
        String apelido,
        LocalDate dataNascimento
) {
}
