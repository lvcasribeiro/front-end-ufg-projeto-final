package br.com.synapsis.synapsis.conteudo.dto;

import br.com.synapsis.synapsis.categoria.dto.CategoriaResponseDTO;
import br.com.synapsis.synapsis.shared.enums.StatusConteudoEnum;
import br.com.synapsis.synapsis.tag.dto.TagResponseDTO;

import java.time.LocalDateTime;
import java.util.Set;

public record ConteudoShowDTO(
        Long id,
        String titulo,
        String corpo,
        String cor,
        StatusConteudoEnum status,
        LocalDateTime publicadoEm,
        CategoriaResponseDTO categoria,
        Set<TagResponseDTO> tags
) {}
