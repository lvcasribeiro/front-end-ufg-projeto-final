package br.com.synapsis.synapsis.conteudo;

import br.com.synapsis.synapsis.categoria.CategoriaEntity;
import br.com.synapsis.synapsis.shared.enums.StatusConteudoEnum;
import br.com.synapsis.synapsis.favorito.FavoritoEntity;
import br.com.synapsis.synapsis.tag.TagEntity;
import br.com.synapsis.synapsis.users.UserEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "conteudos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConteudoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String titulo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String corpo;

    @Column(length = 7)
    private String cor = "#3498db";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id", nullable = true)
    private CategoriaEntity categoria;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private UserEntity usuario;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StatusConteudoEnum status = StatusConteudoEnum.RASCUNHO;

    @Column(name = "publicado_em")
    private LocalDateTime publicadoEm;

    @CreationTimestamp
    @Column(name = "criado_em", updatable = false)
    private LocalDateTime criadoEm;

    @UpdateTimestamp
    @Column(name = "atualizado_em")
    private LocalDateTime atualizadoEm;

    @ManyToMany
    @JoinTable(
            name = "conteudo_tag",
            joinColumns = @JoinColumn(name = "conteudo_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<TagEntity> tags = new HashSet<>();

    @OneToMany(mappedBy = "conteudo", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<FavoritoEntity> favoritos = new HashSet<>();
}