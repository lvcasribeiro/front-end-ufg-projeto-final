package br.com.synapsis.synapsis.conteudo;

import br.com.synapsis.synapsis.categoria.CategoriaEntity;
import br.com.synapsis.synapsis.categoria.CategoriaRepository;
import br.com.synapsis.synapsis.conteudo.dto.ConteudoRequestDTO;
import br.com.synapsis.synapsis.conteudo.dto.ConteudoResponseDTO;
import br.com.synapsis.synapsis.shared.enums.StatusConteudoEnum;
import br.com.synapsis.synapsis.shared.exceptions.NotFoundException;
import br.com.synapsis.synapsis.tag.TagEntity;
import br.com.synapsis.synapsis.tag.TagRepository;
import br.com.synapsis.synapsis.users.UserEntity;
import br.com.synapsis.synapsis.users.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConteudoService {

    private final ConteudoRepository repository;
    private final ConteudoMapper mapper;
    private final UserRepository userRepository;
    private final CategoriaRepository categoriaRepository;
    private final TagRepository tagRepository;

    @Transactional
    public ConteudoEntity criar(ConteudoRequestDTO dto, Long userId) {

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Usuário com ID " + userId + " não encontrado."));

        ConteudoEntity conteudoEntity = ConteudoMapper.INSTANCE.toEntity(dto);
        conteudoEntity.setUsuario(user);

        // --- categoria ---
        if (dto.categoriaId() != null) {
            CategoriaEntity categoria = categoriaRepository.findById(dto.categoriaId())
                    .orElseThrow(() -> new NotFoundException(
                            "Categoria com ID " + dto.categoriaId() + " não encontrada."
                    ));

            if (!categoria.getCriadoPor().getId().equals(userId)) {
                throw new AccessDeniedException("Você não pode usar uma categoria criada por outro usuário.");
            }

            conteudoEntity.setCategoria(categoria);
        } else {
            conteudoEntity.setCategoria(null);
        }

        // --- tags ---
        if (dto.tagsIds() != null && !dto.tagsIds().isEmpty()) {
            List<TagEntity> tags = tagRepository.findAllById(dto.tagsIds());

            // valida se alguma tag não existe
            if (tags.size() != dto.tagsIds().size()) {
                throw new NotFoundException("Uma ou mais tags não foram encontradas.");
            }

            boolean algumaNaoPertence = tags.stream()
                    .anyMatch(tag -> !tag.getCriadoPor().getId().equals(userId));

            if (algumaNaoPertence) {
                throw new AccessDeniedException("Você não pode usar tags criadas por outros usuários.");
            }

            conteudoEntity.setTags(new HashSet<>(tags));
        } else {
            conteudoEntity.setTags(new HashSet<>());
        }

        return repository.save(conteudoEntity);
    }


    public Page<ConteudoResponseDTO> listarTodos(
            Pageable pageable,
            Long userId,
            String titulo,
            String tag,
            StatusConteudoEnum status
    ) {
        Specification<ConteudoEntity> spec =
                ConteudoSpecifications.buildSpecification(titulo, tag, status, userId);

        return repository.findAll(spec, pageable)
                .map(mapper::toResponse);
    }

    public ConteudoResponseDTO buscarPorId(Long id) {
        var entity = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Conteúdo não encontrado"));
        return mapper.toResponse(entity);
    }

    @Transactional
    public ConteudoResponseDTO atualizar(Long id, ConteudoRequestDTO dto, Long userId) {

        // Busca o conteúdo do usuário logado
        ConteudoEntity entity = repository.findByIdAndUsuarioId(id, userId)
                .orElseThrow(() -> new EntityNotFoundException("Conteúdo não encontrado"));

        entity.setTitulo(dto.titulo());
        entity.setCorpo(dto.corpo());
        entity.setCor(dto.cor());
        entity.setStatus(dto.status());

        if (dto.categoriaId() != null) {
            CategoriaEntity categoria = categoriaRepository.findById(dto.categoriaId())
                    .orElseThrow(() -> new NotFoundException(
                            "Categoria com ID " + dto.categoriaId() + " não encontrada."
                    ));

            if (!categoria.getCriadoPor().getId().equals(userId)) {
                throw new AccessDeniedException("Você não pode usar uma categoria criada por outro usuário.");
            }

            entity.setCategoria(categoria);
        } else {
            entity.setCategoria(null);
        }

        if (dto.tagsIds() != null && !dto.tagsIds().isEmpty()) {
            List<TagEntity> tags = tagRepository.findAllById(dto.tagsIds());


            if (tags.size() != dto.tagsIds().size()) {
                throw new NotFoundException("Uma ou mais tags não foram encontradas.");
            }

            boolean algumaNaoPertence = tags.stream()
                    .anyMatch(tag -> !tag.getCriadoPor().getId().equals(userId));

            if (algumaNaoPertence) {
                throw new AccessDeniedException("Você não pode usar tags criadas por outros usuários.");
            }

            entity.setTags(new HashSet<>(tags));
        } else {
            entity.setTags(new HashSet<>());
        }

        return mapper.toResponse(repository.save(entity));
    }



    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
