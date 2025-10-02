package br.com.synapsis.synapsis.favorito;

import br.com.synapsis.synapsis.conteudo.ConteudoEntity;
import br.com.synapsis.synapsis.conteudo.ConteudoRepository;
import br.com.synapsis.synapsis.favorito.dto.FavoritoRequestDTO;
import br.com.synapsis.synapsis.favorito.dto.FavoritoResponseDTO;
import br.com.synapsis.synapsis.shared.exceptions.NotFoundException;
import br.com.synapsis.synapsis.users.UserEntity;
import br.com.synapsis.synapsis.users.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoritoService {

    private final FavoritoRepository favoritoRepository;
    private final UserRepository userRepository;
    private final ConteudoRepository conteudoRepository;
    private final FavoritoMapper favoritoMapper;

    @Transactional
    public FavoritoResponseDTO criar(FavoritoRequestDTO dto, Long usuarioId) {

        if (favoritoRepository.existsByUsuarioIdAndConteudoId(usuarioId, dto.conteudoId())) {
            throw new IllegalArgumentException("Este conteúdo já está favoritado por este usuário.");
        }

        UserEntity usuario = userRepository.findById(usuarioId)
                .orElseThrow(() -> new NotFoundException("Usuário com ID " + usuarioId + " não encontrado."));

        ConteudoEntity conteudo = conteudoRepository.findById(dto.conteudoId())
                .orElseThrow(() -> new NotFoundException("Conteúdo com ID " + dto.conteudoId() + " não encontrado."));

        if (!conteudo.getUsuario().getId().equals(usuarioId)) {
            throw new AccessDeniedException("Você só pode favoritar conteúdos que você mesmo criou.");
        }

        FavoritoEntity favorito = FavoritoEntity.builder()
                .usuario(usuario)
                .conteudo(conteudo)
                .build();

        FavoritoEntity saved = favoritoRepository.save(favorito);
        return favoritoMapper.toResponse(saved);
    }


    public FavoritoResponseDTO buscarPorId(Long id) {
        FavoritoEntity favorito = favoritoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Favorito com ID " + id + " não encontrado."));
        return favoritoMapper.toResponse(favorito);
    }

    public List<FavoritoResponseDTO> listarPorUsuario(Long usuarioId) {
        return favoritoRepository.findByUsuarioId(usuarioId).stream()
                .map(favoritoMapper::toResponse)
                .toList();
    }

    @Transactional
    public void deletar(Long id) {
        if (!favoritoRepository.existsById(id)) {
            throw new NotFoundException("Favorito com ID " + id + " não encontrado.");
        }
        favoritoRepository.deleteById(id);
    }
}
