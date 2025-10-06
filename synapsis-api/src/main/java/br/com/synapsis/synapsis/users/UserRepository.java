package br.com.synapsis.synapsis.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long>, JpaSpecificationExecutor<UserEntity> {

    boolean existsByEmail(String email);

    Optional<UserEntity> findByEmail(String email);

    boolean existsByEmailAndIdNot(String email, Long id);
}
