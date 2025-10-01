package br.com.synapsis.synapsis.categoria;

import br.com.synapsis.synapsis.categoria.dto.CategoriaRequestDTO;
import br.com.synapsis.synapsis.categoria.dto.CategoriaResponseDTO;
import br.com.synapsis.synapsis.users.UserEntity;
import br.com.synapsis.synapsis.users.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriaService {

    private final CategoriaRepository repository;
    private final CategoriaMapper mapper;
    private final UserRepository userRepository;

    public CategoriaResponseDTO criar(CategoriaRequestDTO dto,  Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        CategoriaEntity entity = mapper.toEntity(dto);
        entity.setCriadoPor(user);
        return mapper.toResponse(repository.save(entity));
    }

    public Page<CategoriaResponseDTO> listarTodos(Pageable pageable, Long userId) {
        return repository.findByCriadoPor_Id(userId,pageable)
                .map(mapper::toResponse);
    }

    public CategoriaResponseDTO buscarPorId(Long id) {
        var entity = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada"));
        return mapper.toResponse(entity);
    }

    public CategoriaResponseDTO atualizar(Long id, CategoriaRequestDTO dto, Long userId) {
        var entity = repository.findByIdAndCriadoPor_Id(id, userId).orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada"));
        entity.setNome(dto.nome());
        entity.setDescricao(dto.descricao());
        return mapper.toResponse(repository.save(entity));
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
