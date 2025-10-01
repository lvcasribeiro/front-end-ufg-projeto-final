package br.com.synapsis.synapsis.categoria;

import br.com.synapsis.synapsis.auth.AuthService;
import br.com.synapsis.synapsis.categoria.dto.CategoriaRequestDTO;
import br.com.synapsis.synapsis.categoria.dto.CategoriaResponseDTO;
import br.com.synapsis.synapsis.shared.dto.MetaResponse;
import br.com.synapsis.synapsis.shared.response.PagedResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categorias")
@RequiredArgsConstructor
public class CategoriaController {

    private final CategoriaService service;
    private final AuthService authService;

    @PostMapping
    public ResponseEntity<CategoriaResponseDTO> criar(@RequestBody CategoriaRequestDTO dto) {
        Long userId = authService.getAuthenticatedUserId();
        return ResponseEntity.ok(service.criar(dto, userId));
    }

    @GetMapping
    public ResponseEntity<PagedResponse<CategoriaResponseDTO>> listar(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Long userId = authService.getAuthenticatedUserId();
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<CategoriaResponseDTO> categoriaPage = service.listarTodos(pageable, userId);

        PagedResponse<CategoriaResponseDTO> response = new PagedResponse<>(
                categoriaPage.getContent(),
                new MetaResponse(
                        (int) categoriaPage.getTotalElements(),
                        categoriaPage.getTotalPages(),
                        categoriaPage.getNumber() + 1,
                        categoriaPage.getSize()
                )
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaResponseDTO> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaResponseDTO> atualizar(@PathVariable Long id, @RequestBody CategoriaRequestDTO dto) {
        Long userId = authService.getAuthenticatedUserId();
        return ResponseEntity.ok(service.atualizar(id, dto,userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
