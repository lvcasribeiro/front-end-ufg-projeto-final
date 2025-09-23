package br.com.synapsis.synapsis.shared.response;

import br.com.synapsis.synapsis.shared.dto.MetaResponse;

import java.util.List;

public record PagedResponse<T>(
        List<T> data,
        MetaResponse meta
) {}
