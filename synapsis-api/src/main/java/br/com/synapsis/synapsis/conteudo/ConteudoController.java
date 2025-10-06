package br.com.synapsis.synapsis.conteudo;


import br.com.synapsis.synapsis.auth.AuthService;
import br.com.synapsis.synapsis.conteudo.dto.ConteudoRequestDTO;
import br.com.synapsis.synapsis.conteudo.dto.ConteudoResponseDTO;
import br.com.synapsis.synapsis.shared.dto.MetaResponse;
import br.com.synapsis.synapsis.shared.enums.StatusConteudoEnum;
import br.com.synapsis.synapsis.shared.response.PagedResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/conteudos")
@RequiredArgsConstructor
public class ConteudoController {

    private final ConteudoService service;
    private final AuthService authService;
    private final ConteudoMapper conteudoMapper;

    @PostMapping
    public ResponseEntity<ConteudoResponseDTO> criar(@RequestBody ConteudoRequestDTO dto) {
        Long userId = authService.getAuthenticatedUserId();
        ConteudoEntity entity = service.criar(dto, userId);
        ConteudoResponseDTO conteudo = conteudoMapper.toResponse(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(conteudo);
    }

    @GetMapping
    public ResponseEntity<PagedResponse<ConteudoResponseDTO>> listar(
            @RequestParam(required = false) String titulo,
            @RequestParam(required = false) String tag,
            @RequestParam(required = false) StatusConteudoEnum status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Long userId = authService.getAuthenticatedUserId();
        Pageable pageable = PageRequest.of(page - 1, size);

        Page<ConteudoResponseDTO> conteudoPage = service.listarTodos(pageable, userId, titulo, tag, status);

        PagedResponse<ConteudoResponseDTO> response = new PagedResponse<>(
                conteudoPage.getContent(),
                new MetaResponse(
                        (int) conteudoPage.getTotalElements(),
                        conteudoPage.getTotalPages(),
                        conteudoPage.getNumber() + 1,
                        conteudoPage.getSize()
                )
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConteudoResponseDTO> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ConteudoResponseDTO> atualizar(@PathVariable Long id, @RequestBody ConteudoRequestDTO dto) {
        Long userId = authService.getAuthenticatedUserId();
        return ResponseEntity.ok(service.atualizar(id, dto, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}