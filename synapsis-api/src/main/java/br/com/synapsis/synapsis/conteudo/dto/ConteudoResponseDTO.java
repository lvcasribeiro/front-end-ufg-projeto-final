package br.com.synapsis.synapsis.conteudo.dto;

import br.com.synapsis.synapsis.categoria.dto.CategoriaResponseDTO;
import br.com.synapsis.synapsis.shared.enums.StatusConteudoEnum;
import br.com.synapsis.synapsis.tag.dto.TagResponseDTO;
import br.com.synapsis.synapsis.users.dto.UserDTO;

import java.time.LocalDateTime;
import java.util.Set;

public record ConteudoResponseDTO(
        Long id,
        String titulo,
        String corpo,
        String cor,
        Boolean isFavorito,
        StatusConteudoEnum status,
        LocalDateTime publicadoEm,
        LocalDateTime criadoEm,
        LocalDateTime atualizadoEm,
        CategoriaResponseDTO categoria,
        UserDTO usuario,
        Set<TagResponseDTO> tags
) {}
