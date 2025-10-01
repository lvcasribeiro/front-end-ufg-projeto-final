package br.com.synapsis.synapsis.conteudo.dto;

import br.com.synapsis.synapsis.shared.enums.StatusConteudoEnum;

import java.util.Set;

public record ConteudoRequestDTO(
        String titulo,
        String corpo,
        String cor,
        Long categoriaId,
        StatusConteudoEnum status,
        Set<Long> tagsIds
) {}
