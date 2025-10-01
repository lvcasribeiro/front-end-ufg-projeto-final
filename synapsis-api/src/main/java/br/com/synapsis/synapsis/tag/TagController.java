package br.com.synapsis.synapsis.tag;

import br.com.synapsis.synapsis.auth.AuthService;
import br.com.synapsis.synapsis.shared.dto.MetaResponse;
import br.com.synapsis.synapsis.shared.response.PagedResponse;
import br.com.synapsis.synapsis.tag.dto.TagRequestDTO;
import br.com.synapsis.synapsis.tag.dto.TagResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;
    private final AuthService authService;

    @PostMapping
    public ResponseEntity<TagResponseDTO> criar(@RequestBody @Valid TagRequestDTO dto) {
        Long userId = authService.getAuthenticatedUserId();
        TagResponseDTO response = tagService.criar(dto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TagResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(tagService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<PagedResponse<TagResponseDTO>> listar(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Long userId = authService.getAuthenticatedUserId();
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<TagResponseDTO> tagPage = tagService.listarTodos(pageable, userId);

        PagedResponse<TagResponseDTO> response = new PagedResponse<>(
                tagPage.getContent(),
                new MetaResponse(
                        (int) tagPage.getTotalElements(),
                        tagPage.getTotalPages(),
                        tagPage.getNumber() + 1,
                        tagPage.getSize()
                )
        );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TagResponseDTO> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid TagRequestDTO dto
    ) {
        Long userId = authService.getAuthenticatedUserId();
        return ResponseEntity.ok(tagService.atualizar(id, dto, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        tagService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}