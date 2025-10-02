package br.com.synapsis.synapsis.favorito;

import br.com.synapsis.synapsis.auth.AuthService;
import br.com.synapsis.synapsis.favorito.dto.FavoritoRequestDTO;
import br.com.synapsis.synapsis.favorito.dto.FavoritoResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/favoritos")
@RequiredArgsConstructor
public class FavoritoController {

    private final FavoritoService favoritoService;
    private final AuthService authService;

    @PostMapping
    public ResponseEntity<FavoritoResponseDTO> criar(@RequestBody @Valid FavoritoRequestDTO dto) {
        Long userId = authService.getAuthenticatedUserId();
        FavoritoResponseDTO response = favoritoService.criar(dto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FavoritoResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(favoritoService.buscarPorId(id));
    }

    @GetMapping("/usuario")
    public ResponseEntity<List<FavoritoResponseDTO>> listarPorUsuario() {
        Long userId = authService.getAuthenticatedUserId();
        return ResponseEntity.ok(favoritoService.listarPorUsuario(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        favoritoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}