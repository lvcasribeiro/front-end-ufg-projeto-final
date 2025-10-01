package br.com.synapsis.synapsis.tag;

import br.com.synapsis.synapsis.tag.dto.TagRequestDTO;
import br.com.synapsis.synapsis.tag.dto.TagResponseDTO;
import br.com.synapsis.synapsis.users.UserEntity;
import br.com.synapsis.synapsis.users.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;
    private final TagMapper tagMapper;
    private final UserRepository userRepository;

    @Transactional
    public TagResponseDTO criar(TagRequestDTO dto, Long userId) {

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        tagRepository.findByNomeAndCriadoPor_Id(dto.nome(), userId)
                .ifPresent(tag -> {
                    throw new IllegalArgumentException("Tag com nome '" + dto.nome() + "' já existe.");
                });

        TagEntity tagEntity = tagMapper.toEntity(dto);
        tagEntity.setCriadoPor(user);

        TagEntity saved = tagRepository.save(tagEntity);
        return tagMapper.toResponse(saved);
    }


    public TagResponseDTO buscarPorId(Long id) {
        TagEntity tag = tagRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tag com ID " + id + " não encontrada."));
        return tagMapper.toResponse(tag);
    }

    public Page<TagResponseDTO> listarTodos(Pageable pageable, Long userId) {
        return tagRepository.findByCriadoPor_Id(userId,pageable)
                .map(tagMapper::toResponse);
    }

    @Transactional
    public TagResponseDTO atualizar(Long id, TagRequestDTO dto, Long userId) {
        TagEntity tag = tagRepository.findByIdAndCriadoPor_Id(id, userId)
                .orElseThrow(() -> new EntityNotFoundException("Tag com ID " + id + " não encontrada."));

        tagRepository.findByNomeAndCriadoPor_Id(dto.nome(), userId)
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(existing -> {
                    throw new IllegalArgumentException("Já existe outra tag com nome '" + dto.nome() + "'.");
                });

        tag.setNome(dto.nome());
        return tagMapper.toResponse(tagRepository.save(tag));
    }

    @Transactional
    public void deletar(Long id) {
        if (!tagRepository.existsById(id)) {
            throw new EntityNotFoundException("Tag com ID " + id + " não encontrada.");
        }
        tagRepository.deleteById(id);
    }
}
